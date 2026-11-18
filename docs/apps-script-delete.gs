/**
 * Tambahkan aksi "delete" ke Google Apps Script PPDB.
 *
 * Cara pakai:
 * 1. Buka script.google.com, proyek PPDB yang dipakai API_URL.
 * 2. Di dalam doPost(e), pada percabangan aksi (tempat "list" ditangani),
 *    tambahkan:   if (body.action === "delete") return handleDelete_(body);
 *    Sesuaikan 'body' dengan nama variabel hasil JSON.parse(e.postData.contents).
 * 3. Tempel fungsi di bawah, sesuaikan checkPassword_ dengan cara script Anda
 *    memeriksa password pada aksi "list" (pakai fungsi yang SAMA).
 * 4. Deploy > Kelola deployment > Edit > Versi baru > Deploy.
 *    URL /exec tetap sama, jadi API_URL tidak perlu diubah.
 *
 * Asumsi: nama tab "PPDB" dan No. Registrasi ada di kolom A.
 * Ubah SHEET_NAME / REG_COL bila berbeda.
 */
var SHEET_NAME = "PPDB";
var REG_COL = 1;

function handleDelete_(body) {
  if (!checkPassword_(body.password)) {
    return json_({ ok: false, code: "AUTH", message: "Password salah." });
  }
  var reg = String(body.regNumber || "").trim();
  if (!reg) return json_({ ok: false, message: "No. registrasi kosong." });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    var last = sheet.getLastRow();
    if (last < 2) return json_({ ok: false, message: "Data tidak ditemukan." });
    var regs = sheet.getRange(2, REG_COL, last - 1, 1).getValues();
    for (var i = regs.length - 1; i >= 0; i--) {
      if (String(regs[i][0]).trim() === reg) {
        sheet.deleteRow(i + 2);
        return json_({ ok: true });
      }
    }
    return json_({ ok: false, message: "Data tidak ditemukan (mungkin sudah dihapus)." });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
