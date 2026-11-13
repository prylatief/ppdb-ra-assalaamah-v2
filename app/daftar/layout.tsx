import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran Siswa Baru TA 2027/2028 – RA Assalaamah",
  description:
    "Isi formulir online PPDB RA Assalaamah Tahun Ajaran 2027/2028. Lengkapi 39 data calon peserta didik sesuai Kartu Keluarga (KK) dan Akta Kelahiran.",
};

export default function DaftarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
