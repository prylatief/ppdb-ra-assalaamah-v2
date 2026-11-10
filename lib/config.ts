// lib/config.ts – sumber tunggal konfigurasi dan definisi form
// JANGAN MENGUBAH API_URL, ADMIN_WA, atau protokol fetch (harus text/plain)

export const CONFIG = {
  API_URL:
    "https://script.google.com/macros/s/AKfycbwY1UQBgwPxlf97Sfh-m3bkzzBe3fNNIVV7NI1ZK4g-AhdU9F4z54bUrmL17mbLzcld/exec",
  ADMIN_WA: "082177335389",
  ADMIN_WA_DISPLAY: "0821-7733-5389",
  INFO_WA_ALT: "08118507077",
  INFO_WA_ALT_DISPLAY: "0811-8507-077",
} as const;

export const DRAFT_KEY = "ra_assalaamah_ppdb_2027_draft";

// ---- Opsi pilihan ----
export const AGAMA = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"] as const;
export const PENDIDIKAN: [string, string][] = [
  ["SMA / SMK / MA", "SMA / SMK / MA"],
  ["D1 / D2 / D3", "Diploma (D1 / D2 / D3)"],
  ["S1 / D4", "Sarjana (S1 / D4)"],
  ["S2 / S3", "Pascasarjana (S2 / S3)"],
  ["SMP / MTs", "SMP / MTs"],
  ["SD / MI", "SD / MI"],
];

export type FieldType = "text" | "select" | "date" | "number" | "tel" | "textarea" | "digits";

export interface FieldDef {
  no: string;
  label: string;
  key: string;
  type: FieldType;
  span?: "full";
  ph?: string;
  blank?: string;
  options?: (string | [string, string])[];
  def?: string;
  min?: number;
  step?: string;
  copyFromChild?: boolean;
}

export interface StepDef {
  tab: string;
  range: string;
  icon: string;
  cols: 2 | 3;
  title: string;
  sub: string;
  fields: FieldDef[];
}

function parentStep(c: {
  tab: string; range: string; icon: string; who: string; suffix: string; n: number;
  title: string; penghasilanDef: string; alive: string;
  placeholders: { nama: string; tempat: string; nik: string; kerja: string; wa: string };
}): StepDef {
  const { suffix: s, n } = c;
  const penghasilan: string[] = [
    "< Rp 2.000.000",
    "Rp 2.000.000 - Rp 4.000.000",
    "Rp 4.000.000 - Rp 6.000.000",
    "> Rp 6.000.000",
    s === "Ibu" ? "Tidak Berpenghasilan / IRT" : "Tidak Berpenghasilan",
  ];
  const who = s === "Ibu" ? "Ibu Kandung" : "Ayah Kandung";
  return {
    tab: c.tab, range: c.range, icon: c.icon, cols: 2,
    title: c.title, sub: `Pertanyaan Nomor ${n} s/d ${n + 9}`,
    fields: [
      { no: String(n), label: `Nama Lengkap ${who}`, key: `nama${s}`, type: "text", span: "full", ph: c.placeholders.nama },
      { no: `${n + 1}a`, label: `Tempat Lahir ${s}`, key: `tempatLahir${s}`, type: "text", ph: c.placeholders.tempat },
      { no: `${n + 1}b`, label: `Tanggal Lahir ${s}`, key: `tglLahir${s}`, type: "date" },
      { no: String(n + 2), label: `Nomor KTP (NIK) ${s}`, key: `nik${s}`, type: "digits", ph: c.placeholders.nik },
      { no: String(n + 3), label: `Agama ${s}`, key: `agama${s}`, type: "select", options: [...AGAMA], def: "Islam" },
      { no: String(n + 4), label: `Pendidikan Terakhir ${s}`, key: `pendidikan${s}`, type: "select", options: PENDIDIKAN },
      { no: String(n + 5), label: `Pekerjaan ${s}`, key: `pekerjaan${s}`, type: "text", ph: c.placeholders.kerja },
      { no: String(n + 6), label: `Penghasilan Perbulan ${s}`, key: `penghasilan${s}`, type: "select", options: penghasilan, def: c.penghasilanDef, span: "full" },
      { no: String(n + 7), label: `Alamat Rumah Lengkap ${s}`, key: `alamat${s}`, type: "textarea", span: "full", copyFromChild: true, ph: `Alamat lengkap tempat tinggal ${s}` },
      { no: String(n + 8), label: `Nomor HP / WhatsApp (WA) ${s}`, key: `wa${s}`, type: "tel", ph: c.placeholders.wa },
      { no: String(n + 9), label: `Kondisi ${s === "Ibu" ? "Ibu Kandung" : "Ayah"} Saat Ini`, key: `kondisi${s}`, type: "select", options: ["Masih Hidup", `Meninggal Dunia (${c.alive})`], def: "Masih Hidup" },
    ],
  };
}

export const FORM_STEPS: StepDef[] = [
  {
    tab: "Data Anak", range: "No. 1-13", icon: "👧👦", cols: 2,
    title: "Bagian 1: Identitas Calon Peserta Didik (Anak)", sub: "Pertanyaan Nomor 1 s/d 13",
    fields: [
      { no: "1", label: "Nama Lengkap Anak", key: "namaLengkap", type: "text", span: "full", ph: "Contoh: Muhammad Alfatih Pratama" },
      { no: "2", label: "Nama Panggilan", key: "namaPanggilan", type: "text", ph: "Contoh: Fatih" },
      { no: "3", label: "Jenis Kelamin", key: "jenisKelamin", type: "select", blank: "-- Pilih Jenis Kelamin --", options: ["Laki-laki", "Perempuan"] },
      { no: "4a", label: "Tempat Lahir Anak", key: "tempatLahirAnak", type: "text", ph: "Contoh: Jakarta" },
      { no: "4b", label: "Tanggal Lahir Anak", key: "tglLahirAnak", type: "date" },
      { no: "5", label: "Nomor Kartu Keluarga (No. KK)", key: "noKK", type: "digits", ph: "16 digit angka sesuai KK" },
      { no: "6", label: "Nomor NIK Anak", key: "nikAnak", type: "digits", ph: "16 digit angka NIK Anak" },
      { no: "7", label: "Agama", key: "agamaAnak", type: "select", options: [...AGAMA], def: "Islam" },
      { no: "8", label: "Anak Ke-", key: "anakKe", type: "number", min: 1, ph: "Contoh: 1" },
      { no: "9", label: "Jumlah Saudara Kandung", key: "jmlSaudara", type: "number", min: 0, ph: "Contoh: 2" },
      { no: "10", label: "Alamat Lengkap Tempat Tinggal Anak", key: "alamatAnak", type: "textarea", span: "full", ph: "Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten" },
      { no: "11", label: "Tinggal Bersama", key: "tinggalBersama", type: "select", options: ["Orang Tua Kandung", "Wali / Kerabat", "Kakek / Nenek", "Lainnya"] },
      { no: "12", label: "Jarak Tempat Tinggal ke Sekolah", key: "jarakSekolah", type: "select", options: [["< 1 Km", "Kurang dari 1 Km"], "1 - 3 Km", "3 - 5 Km", ["> 5 Km", "Lebih dari 5 Km"]] },
      { no: "13", label: "Ke Sekolah Menggunakan (Transportasi)", key: "transportasi", type: "select", span: "full", options: ["Jalan Kaki", ["Sepeda Motor (Antar Jemput Ortu)", "Sepeda Motor (Antar Jemput Orang Tua)"], "Mobil Pribadi", "Jemputan Sekolah / Ojek", "Sepeda", "Angkutan Umum"] },
    ],
  },
  {
    tab: "Fisik & Seragam", range: "No. 14-19", icon: "🩺👕", cols: 3,
    title: "Bagian 2: Data Kesehatan, Fisik & Ukuran Baju Anak", sub: "Pertanyaan Nomor 14 s/d 19",
    fields: [
      { no: "14", label: "Golongan Darah", key: "golDarah", type: "select", options: [["Belum Tahu", "Belum Tahu / Belum Cek"], "A", "B", "AB", "O"] },
      { no: "15", label: "Tinggi Badan (cm)", key: "tinggiBadan", type: "number", min: 1, ph: "Contoh: 105" },
      { no: "16", label: "Berat Badan (kg)", key: "beratBadan", type: "number", min: 1, step: "0.1", ph: "Contoh: 17" },
      { no: "17", label: "Kelainan Jasmani / Kebutuhan Khusus", key: "kelainanJasmani", type: "text", span: "full", def: "Tidak Ada" },
      { no: "18", label: "Penyakit Yang Pernah Diderita / Riwayat Alergi", key: "riwayatPenyakit", type: "text", span: "full", def: "Tidak Ada" },
      { no: "19", label: "Ukuran Baju dan Celana Seragam Anak", key: "ukuranSeragam", type: "select", span: "full", blank: "-- Pilih Ukuran Baju & Celana Anak --",
        options: [
          ["S (LD ~34cm / PJ Celana ~56cm)", "Ukuran S (Kecil - LD ~34cm / PJ Celana ~56cm)"],
          ["M (LD ~36cm / PJ Celana ~60cm)", "Ukuran M (Sedang - LD ~36cm / PJ Celana ~60cm)"],
          ["L (LD ~38cm / PJ Celana ~64cm)", "Ukuran L (Besar - LD ~38cm / PJ Celana ~64cm)"],
          ["XL (LD ~40cm / PJ Celana ~68cm)", "Ukuran XL (Ekstra - LD ~40cm / PJ Celana ~68cm)"],
          ["XXL (LD ~43cm / PJ Celana ~72cm)", "Ukuran XXL (Jumbo - LD ~43cm / PJ Celana ~72cm)"],
        ] },
    ],
  },
  parentStep({
    tab: "Data Ayah Kandung", range: "No. 20-29", icon: "👨", who: "Ayah", suffix: "Ayah", n: 20,
    title: "Bagian 3: Identitas Ayah Kandung", penghasilanDef: "Rp 2.000.000 - Rp 4.000.000", alive: "Almarhum",
    placeholders: { nama: "Nama lengkap Ayah sesuai KTP/KK", tempat: "Contoh: Bandung", nik: "16 digit NIK KTP Ayah", kerja: "Contoh: Karyawan Swasta / Wiraswasta", wa: "Contoh: 081234567890" },
  }),
  parentStep({
    tab: "Data Ibu Kandung", range: "No. 30-39", icon: "🧕", who: "Ibu Kandung", suffix: "Ibu", n: 30,
    title: "Bagian 4: Identitas Ibu Kandung", penghasilanDef: "Tidak Berpenghasilan / IRT", alive: "Almarhumah",
    placeholders: { nama: "Nama lengkap Ibu kandung sesuai KTP/KK", tempat: "Contoh: Bogor", nik: "16 digit NIK KTP Ibu", kerja: "Contoh: Ibu Rumah Tangga / Guru", wa: "Contoh: 081398765432" },
  }),
];

export interface FieldGroup {
  letter: string;
  title: string;
  waTitle: string;
  who: string;
  fields: { no: number; label: string; key: string; bold?: boolean; mono?: boolean; text?: boolean; unit?: string }[];
}

export const FIELD_GROUPS: FieldGroup[] = [
  {
    letter: "A", title: "Identitas Calon Peserta Didik (1 - 13)", waTitle: "DATA CALON PESERTA DIDIK", who: "",
    fields: [
      { no: 1, label: "Nama Lengkap Anak", key: "namaLengkap", bold: true },
      { no: 2, label: "Nama Panggilan", key: "namaPanggilan" },
      { no: 3, label: "Jenis Kelamin", key: "jenisKelamin" },
      { no: 4, label: "Tempat, Tgl Lahir", key: "ttlAnak" },
      { no: 5, label: "No. Kartu Keluarga", key: "noKK", mono: true, text: true },
      { no: 6, label: "No. NIK Anak", key: "nikAnak", mono: true, text: true },
      { no: 7, label: "Agama", key: "agamaAnak" },
      { no: 8, label: "Anak Ke-", key: "anakKe" },
      { no: 9, label: "Jumlah Saudara Kandung", key: "jmlSaudara" },
      { no: 10, label: "Alamat Lengkap Anak", key: "alamatAnak" },
      { no: 11, label: "Tinggal Bersama", key: "tinggalBersama" },
      { no: 12, label: "Jarak ke Sekolah", key: "jarakSekolah" },
      { no: 13, label: "Transportasi ke Sekolah", key: "transportasi" },
    ],
  },
  {
    letter: "B", title: "Data Fisik, Kesehatan & Seragam (14 - 19)", waTitle: "DATA KESEHATAN & SERAGAM", who: "",
    fields: [
      { no: 14, label: "Golongan Darah", key: "golDarah" },
      { no: 15, label: "Tinggi Badan", key: "tinggiBadan", unit: " cm" },
      { no: 16, label: "Berat Badan", key: "beratBadan", unit: " kg" },
      { no: 17, label: "Kelainan Jasmani", key: "kelainanJasmani" },
      { no: 18, label: "Penyakit Pernah Diderita", key: "riwayatPenyakit" },
      { no: 19, label: "Ukuran Baju & Celana", key: "ukuranSeragam", bold: true },
    ],
  },
  {
    letter: "C", title: "Identitas Ayah Kandung (20 - 29)", waTitle: "DATA AYAH KANDUNG", who: "Ayah",
    fields: [
      { no: 20, label: "Nama Lengkap", key: "namaAyah", bold: true },
      { no: 21, label: "Tempat, Tgl Lahir", key: "ttlAyah" },
      { no: 22, label: "No. KTP (NIK)", key: "nikAyah", mono: true, text: true },
      { no: 23, label: "Agama", key: "agamaAyah" },
      { no: 24, label: "Pendidikan Terakhir", key: "pendidikanAyah" },
      { no: 25, label: "Pekerjaan", key: "pekerjaanAyah" },
      { no: 26, label: "Penghasilan Per Bulan", key: "penghasilanAyah" },
      { no: 27, label: "Alamat Lengkap", key: "alamatAyah" },
      { no: 28, label: "No. HP / WA", key: "waAyah", bold: true, text: true },
      { no: 29, label: "Kondisi", key: "kondisiAyah" },
    ],
  },
  {
    letter: "D", title: "Identitas Ibu Kandung (30 - 39)", waTitle: "DATA IBU KANDUNG", who: "Ibu",
    fields: [
      { no: 30, label: "Nama Lengkap", key: "namaIbu", bold: true },
      { no: 31, label: "Tempat, Tgl Lahir", key: "ttlIbu" },
      { no: 32, label: "No. KTP (NIK)", key: "nikIbu", mono: true, text: true },
      { no: 33, label: "Agama", key: "agamaIbu" },
      { no: 34, label: "Pendidikan Terakhir", key: "pendidikanIbu" },
      { no: 35, label: "Pekerjaan", key: "pekerjaanIbu" },
      { no: 36, label: "Penghasilan Per Bulan", key: "penghasilanIbu" },
      { no: 37, label: "Alamat Lengkap", key: "alamatIbu" },
      { no: 38, label: "No. HP / WA", key: "waIbu", bold: true, text: true },
      { no: 39, label: "Kondisi", key: "kondisiIbu" },
    ],
  },
];

// ---- Biaya ----
export const KEGIATAN_SAMA: [string, number][] = [
  ["Kalender Pendidikan", 50000],
  ["Wisata Ilmiah", 250000],
  ["Evaluasi Semester 1 dan 2", 250000],
  ["Menu sehat dan UKS", 250000],
  ["Ekskul", 500000],
  ["Rapor dan foto", 250000],
];

export interface BiayaKelas {
  kegiatan: [string, number][];
  rows: [string, number | "kegiatan"][];
}

export const BIAYA: Record<"A" | "B", BiayaKelas> = {
  A: {
    kegiatan: [...KEGIATAN_SAMA, ["MPLS", 150000], ["Tes Dasar", 250000]],
    rows: [["Pendaftaran", 200000], ["Perlengkapan", 1500000], ["SPP Juli 2027", 350000], ["Kegiatan 1 tahun", "kegiatan"], ["Seragam", 1045000], ["Buku Paket", 800000], ["Komite", 50000]],
  },
  B: {
    kegiatan: [...KEGIATAN_SAMA, ["Dokumen Siswa Akhir", 350000], ["MPLS", 150000]],
    rows: [["Pendaftaran", 200000], ["Perlengkapan", 1500000], ["SPP Juli 2027", 350000], ["Kegiatan 1 tahun", "kegiatan"], ["Seragam", 1045000], ["Buku Paket", 1000000], ["Komite", 50000]],
  },
};

// ---- Helpers ----
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c)
  );
}

export function formatDateID(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return iso || "";
  return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export function formatWAForLink(raw: string): string {
  let clean = String(raw || CONFIG.ADMIN_WA).replace(/\D/g, "");
  if (clean.startsWith("0")) clean = "62" + clean.slice(1);
  return clean;
}

export type RegistrationData = Record<string, string> & {
  regNumber?: string;
  createdAt?: string;
  ttlAnak?: string;
  ttlAyah?: string;
  ttlIbu?: string;
};

export function withDerivedFields(d: RegistrationData): RegistrationData {
  return {
    ...d,
    ttlAnak: `${d.tempatLahirAnak ?? ""}, ${formatDateID(d.tglLahirAnak ?? "")}`,
    ttlAyah: `${d.tempatLahirAyah ?? ""}, ${formatDateID(d.tglLahirAyah ?? "")}`,
    ttlIbu: `${d.tempatLahirIbu ?? ""}, ${formatDateID(d.tglLahirIbu ?? "")}`,
  };
}

export function fieldValue(d: RegistrationData, field: { key: string; unit?: string }): string {
  const v = d[field.key];
  return v === undefined || v === null || v === "" ? "-" : `${v}${field.unit || ""}`;
}

// "&" memotong pesan di WhatsApp (dibaca sebagai pemisah parameter), jadi diganti "dan".
export function buildWhatsAppMessage(d: RegistrationData): string {
  const header = [
    "*FORMULIR PPDB RA ASSALAAMAH 2027/2028*",
    `No. Registrasi: *${d.regNumber}*`,
    `Waktu Daftar: ${d.createdAt}`,
  ].join("\n");
  const body = FIELD_GROUPS.map((g) => {
    const lines = g.fields.map((fl) => {
      const val = fieldValue(d, fl);
      return `${fl.no}. ${fl.label}: ${fl.bold ? `*${val}*` : val}`;
    });
    return `*${g.letter}. ${g.waTitle}*\n${lines.join("\n")}`;
  }).join("\n\n");
  return `${header}\n\n${body}`.replace(/&/g, "dan");
}

export function biayaTotal(k: "A" | "B"): number {
  const b = BIAYA[k];
  return b.rows.reduce((s, [, v]) => s + (v === "kegiatan" ? b.kegiatan.reduce((x, [, n]) => x + n, 0) : v), 0);
}

export function rp(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export const PLACEHOLDER_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="94" fill="#ffffff" stroke="#146c38" stroke-width="6"/>
    <circle cx="100" cy="100" r="76" fill="none" stroke="#146c38" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="100" y="82" text-anchor="middle" fill="#146c38" font-family="Arial, sans-serif" font-size="14" font-weight="bold">RAUDHATUL ATHFAL</text>
    <text x="100" y="108" text-anchor="middle" fill="#146c38" font-family="Arial, sans-serif" font-size="18" font-weight="bold">ASSALAAMAH</text>
  </svg>`)}`;
