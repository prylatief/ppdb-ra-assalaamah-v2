/**
 * PPDB RA Assalaamah 2027/2028 - Google Apps Script (backend)
 *
 * SETUP (sekali saja):
 * 1. Buka Google Sheet pendaftaran > Extensions > Apps Script. Hapus isi lama, tempel file ini.
 * 2. Project Settings (ikon roda gigi) > Script Properties > Add property:
 *      nama  : ADMIN_PASSWORD
 *      nilai : password panitia (pilih yang panjang, jangan dibagikan ke wali santri)
 *    Password TIDAK ditulis di kode ini dan tidak ada di halaman web.
 * 3. Deploy > Manage deployments > pensil (Edit) pada deployment yang ada > Version: New version > Deploy.
 *    Deployment: Execute as "Me", Who has access "Anyone". URL /exec tetap sama.
 *    (Kalau membuat deployment BARU, URL berubah: ganti CONFIG.API_URL di lib/config.ts.)
 * 4. Setiap kali file ini diedit, ulangi langkah 3.
 *
 * Endpoint (semua POST, body JSON, Content-Type text/plain):
 *   {action:'submit', data:{...}}                  publik: simpan pendaftaran, balas nomor registrasi
 *   {action:'list', password:'...'}                admin: balas seluruh data (butuh ADMIN_PASSWORD)
 *   {action:'delete', password:'...', regNumber}   admin: hapus satu baris pendaftar (permanen)
 */

const SHEET_NAME = 'PPDB';
const REG_PREFIX = 'RA-2627-';
const TZ = 'Asia/Jakarta';

// Urutan kolom di sheet (setelah regNumber dan createdAt).
const KEYS = [
  'namaLengkap', 'namaPanggilan', 'jenisKelamin', 'tempatLahirAnak', 'tglLahirAnak', 'noKK', 'nikAnak',
  'agamaAnak', 'anakKe', 'jmlSaudara', 'alamatAnak', 'tinggalBersama', 'jarakSekolah', 'transportasi',
  'golDarah', 'tinggiBadan', 'beratBadan', 'kelainanJasmani', 'riwayatPenyakit', 'ukuranSeragam',
  'namaAyah', 'tempatLahirAyah', 'tglLahirAyah', 'nikAyah', 'agamaAyah', 'pendidikanAyah', 'pekerjaanAyah',
  'penghasilanAyah', 'alamatAyah', 'waAyah', 'kondisiAyah',
  'namaIbu', 'tempatLahirIbu', 'tglLahirIbu', 'nikIbu', 'agamaIbu', 'pendidikanIbu', 'pekerjaanIbu',
  'penghasilanIbu', 'alamatIbu', 'waIbu', 'kondisiIbu',
];
const HEADER = ['regNumber', 'createdAt'].concat(KEYS);

const DIGITS16 = ['noKK', 'nikAnak', 'nikAyah', 'nikIbu'];
const DATES = ['tglLahirAnak', 'tglLahirAyah', 'tglLahirIbu'];
const NUMBERS = ['anakKe', 'jmlSaudara', 'tinggiBadan', 'beratBadan'];
const PHONES = ['waAyah', 'waIbu'];

function doGet() {
  // Cek kesehatan saja. TIDAK pernah mengembalikan data pendaftar.
  return json_({ ok: true, service: 'PPDB RA Assalaamah' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, code: 'BAD_REQUEST', message: 'Data tidak terbaca.' });
  }
  try {
    if (body.action === 'submit') return json_(handleSubmit_(body.data));
    if (body.action === 'list') return json_(handleList_(body.password));
    if (body.action === 'delete') return json_(handleDelete_(body.password, body.regNumber));
    return json_({ ok: false, code: 'BAD_ACTION', message: 'Aksi tidak dikenal.' });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return json_({ ok: false, code: 'SERVER', message: 'Terjadi gangguan di server. Silakan coba lagi sebentar lagi.' });
  }
}

/* ------------------------------ submit ------------------------------ */
function handleSubmit_(data) {
  if (!data || typeof data !== 'object') return fail_('BAD_REQUEST', 'Data tidak terbaca.');

  // Jebakan bot: kolom tersembunyi terisi. Balas seolah sukses, tapi tidak disimpan.
  if (data.hp_check) return { ok: true, regNumber: REG_PREFIX + '0000', createdAt: now_() };

  const clean = {};
  for (const k of KEYS) {
    const v = data[k] === undefined || data[k] === null ? '' : String(data[k]).trim();
    if (!v) return fail_('INVALID', 'Ada kolom wajib yang kosong. Periksa kembali semua bagian formulir.');
    if (v.length > 500) return fail_('INVALID', 'Ada isian yang terlalu panjang.');
    clean[k] = v;
  }
  for (const k of DIGITS16) if (!/^\d{16}$/.test(clean[k])) return fail_('INVALID', 'No. KK dan NIK harus tepat 16 digit angka.');
  for (const k of DATES) if (!/^\d{4}-\d{2}-\d{2}$/.test(clean[k])) return fail_('INVALID', 'Format tanggal lahir tidak valid.');
  for (const k of NUMBERS) if (!/^\d+(\.\d+)?$/.test(clean[k])) return fail_('INVALID', 'Isian angka (anak ke, saudara, tinggi, berat) tidak valid.');
  for (const k of PHONES) if (!/^[0-9+\-\s]{8,20}$/.test(clean[k])) return fail_('INVALID', 'Nomor HP/WA tidak valid.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // cegah dua pendaftar mendapat nomor yang sama
  try {
    const sheet = getSheet_();
    const last = sheet.getLastRow();

    // Anak yang sama (NIK sama) tidak boleh terdaftar dua kali.
    if (last > 1) {
      const nikCol = HEADER.indexOf('nikAnak') + 1;
      const niks = sheet.getRange(2, nikCol, last - 1, 1).getValues();
      if (niks.some((r) => String(r[0]) === clean.nikAnak)) {
        return fail_('DUPLICATE', 'NIK anak ini sudah terdaftar. Jika Anda merasa belum mendaftar atau perlu koreksi data, hubungi panitia lewat WhatsApp.');
      }
    }

    let max = 0;
    if (last > 1) {
      sheet.getRange(2, 1, last - 1, 1).getValues().forEach((r) => {
        const n = parseInt(String(r[0]).replace(/\D/g, '').slice(-4), 10);
        if (isFinite(n) && n > max) max = n;
      });
    }
    const regNumber = REG_PREFIX + String(max + 1).padStart(4, '0');
    const createdAt = now_();

    const row = [regNumber, createdAt].concat(KEYS.map((k) => clean[k]));
    const range = sheet.getRange(last + 1, 1, 1, HEADER.length);
    range.setNumberFormat('@'); // semua teks: NIK/KK/tanggal tidak diubah Sheets
    range.setValues([row]);
    return { ok: true, regNumber: regNumber, createdAt: createdAt };
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------ list (admin) ------------------------------ */
function handleList_(password) {
  const denied = checkAdmin_(password);
  if (denied) return denied;

  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return { ok: true, data: [] };

  const values = sheet.getRange(2, 1, last - 1, HEADER.length).getValues();
  const data = values.map((r) => {
    const o = {};
    HEADER.forEach((h, i) => {
      const v = r[i];
      o[h] = v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v);
    });
    return o;
  });
  data.reverse(); // terbaru di atas
  return { ok: true, data: data };
}

/* ------------------------------ delete (admin) ------------------------------ */
function handleDelete_(password, regNumber) {
  const denied = checkAdmin_(password);
  if (denied) return denied;

  const reg = String(regNumber || '').trim();
  if (!reg) return fail_('BAD_REQUEST', 'No. registrasi kosong.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // jangan bentrok dengan pendaftaran yang sedang masuk
  try {
    const sheet = getSheet_();
    const last = sheet.getLastRow();
    if (last < 2) return fail_('NOT_FOUND', 'Data tidak ditemukan.');

    const regCol = HEADER.indexOf('regNumber') + 1;
    const regs = sheet.getRange(2, regCol, last - 1, 1).getValues();
    for (let i = regs.length - 1; i >= 0; i--) {
      if (String(regs[i][0]).trim() === reg) {
        sheet.deleteRow(i + 2);
        return { ok: true };
      }
    }
    return fail_('NOT_FOUND', 'Data tidak ditemukan (mungkin sudah dihapus).');
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------ util ------------------------------ */
// Mengembalikan objek error bila password salah/belum diatur, atau null bila valid.
function checkAdmin_(password) {
  const real = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!real) return fail_('NOT_CONFIGURED', 'ADMIN_PASSWORD belum diisi di Script Properties.');
  if (!safeEqual_(String(password || ''), real)) {
    Utilities.sleep(1500); // perlambat tebak-tebakan password
    return fail_('AUTH', 'Password salah.');
  }
  return null;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    const h = sheet.getRange(1, 1, 1, HEADER.length);
    h.setNumberFormat('@');
    h.setValues([HEADER]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function now_() { return Utilities.formatDate(new Date(), TZ, 'dd MMM yyyy HH:mm'); }
function fail_(code, message) { return { ok: false, code: code, message: message }; }
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
