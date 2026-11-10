"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoImg from "@/components/LogoImg";
import BiayaTable from "@/components/BiayaTable";
import PpdbForm from "@/components/PpdbForm";
import { CONFIG, formatWAForLink } from "@/lib/config";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function WALink({ raw, shown }: { raw: string; shown: string }) {
  return (
    <a
      href={`https://wa.me/${formatWAForLink(raw)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold hover:underline"
      style={{ color: "#146c38" }}
    >
      {shown}
    </a>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 no-print" style={{ background: "linear-gradient(to right, #0a3b1e, #146c38, #1b7a43)" }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-amber-400">
            <LogoImg size={48} className="w-full h-full object-contain" priority />
          </div>
          <div>
            <span className="inline-block bg-amber-400 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider" style={{ color: "#0a3b1e" }}>
              PPDB Online 2027 / 2028
            </span>
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug text-white">
              RAUDHATUL ATHFAL ASSALAAMAH
            </h1>
            <p className="text-xs" style={{ color: "#d6f5e3" }}>Formulir Pendaftaran Calon Peserta Didik Baru</p>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section style={{ background: "linear-gradient(135deg, #0a3b1e 0%, #146c38 50%, #1b7a43 100%)" }} className="relative overflow-hidden py-16 px-4">
        {/* dekorasi lingkaran */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: "#d6f5e3" }} />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10" style={{ background: "#d6f5e3" }} />

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-5"
          >
            <div className="w-28 h-28 rounded-full bg-white p-2 shadow-xl ring-4 ring-amber-400 flex items-center justify-center overflow-hidden">
              <LogoImg size={96} className="w-full h-full object-contain" priority />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-extrabold leading-tight"
          >
            Selamat Datang di PPDB
            <br />
            <span className="text-amber-300">RA Assalaamah</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-3 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "#d6f5e3" }}
          >
            Penerimaan Peserta Didik Baru Tahun Ajaran 2027/2028.
            <br className="hidden md:block" />
            Daftarkan putra-putri Anda sekarang, mudah dan aman dari HP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="#formulir"
              className="inline-flex items-center justify-center gap-2 font-extrabold text-sm px-7 py-3.5 rounded-xl min-h-[48px] transition shadow-lg"
              style={{ background: "#f59e0b", color: "#0a3b1e" }}
            >
              ✍️ Daftar Sekarang
            </a>
            <a
              href="#biaya"
              className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl min-h-[48px] border-2 border-white/40 text-white transition hover:bg-white/10"
            >
              💰 Lihat Biaya
            </a>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-8">

        {/* ===== CIRI KHAS ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
        >
          <div className="section-head">
            <h2 className="font-bold text-base">Keunggulan RA Assalaamah</h2>
            <span className="text-2xl" aria-hidden="true">⭐</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
            {[
              { icon: "📖", title: "Tilawati & Tahfidz", desc: "Hafalan Juz 30 dengan metode tilawati yang terstruktur" },
              { icon: "🤲", title: "Ibadah Harian", desc: "Pembiasaan shalat, doa, dan adab Islami sejak dini" },
              { icon: "🌍", title: "Bilingual", desc: "Pengenalan bahasa Arab dan bahasa Inggris sejak usia dini" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl p-4 border border-slate-100" style={{ background: "#eefbf3" }}>
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-bold text-sm" style={{ color: "#0f532b" }}>{title}</p>
                <p className="text-xs text-slate-600 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== PROFIL (Visi, Misi, Kontak) ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
          id="profil"
        >
          <div className="section-head">
            <h2 className="font-bold text-base">Tentang RA Assalaamah</h2>
            <span className="text-2xl" aria-hidden="true">🕌</span>
          </div>
          <div className="p-5 space-y-4 text-sm">
            {/* Visi */}
            <div className="rounded-xl p-4 text-center border" style={{ background: "#eefbf3", borderColor: "rgba(27,122,67,.2)" }}>
              <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "#0f532b" }}>Visi</p>
              <p className="font-bold mt-1" style={{ color: "#0a3b1e" }}>
                "Mempersiapkan Generasi yang Beriman, Berilmu, Berakhlak, dan Beramal Salihah"
              </p>
            </div>

            {/* Misi */}
            <details className="group">
              <summary className="cursor-pointer font-bold text-sm py-1" style={{ color: "#0f532b" }}>
                Misi (7 butir) <span className="text-xs font-normal text-slate-400">ketuk untuk membuka</span>
              </summary>
              <ol className="list-decimal pl-5 mt-2 space-y-1.5 text-slate-700">
                <li>Membina anak sejak dini dalam mengenal Allah Swt. dan meneladani Rasulullah saw. berdasarkan Al-Qur'an dan hadis sesuai pemahaman para ulama salafussalih;</li>
                <li>Mengenalkan dan membiasakan nilai-nilai Islami dalam kehidupan sehari-hari;</li>
                <li>Menghargai dan menggali potensi kecerdasan majemuk setiap anak melalui kegiatan bermain yang beragam;</li>
                <li>Menciptakan taman bermain dan belajar yang kondusif, aktif, kreatif, dan menyenangkan melalui pembelajaran yang berkesadaran, bermakna, dan menggembirakan;</li>
                <li>Mempersiapkan kecakapan hidup (life skills) dan kemandirian anak sebagai bekal memasuki jenjang pendidikan berikutnya;</li>
                <li>Mengintegrasikan tujuh nilai Panca Cinta dalam pembelajaran, pembiasaan, dan budaya madrasah; dan</li>
                <li>Membangun kemitraan yang harmonis dengan orang tua, yayasan, dan masyarakat sebagai satu kesatuan catur pusat pendidikan.</li>
              </ol>
            </details>

            {/* Alamat & kontak */}
            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Alamat</p>
                <p className="mt-1 text-slate-700">
                  Jl. Raya Rawa Kuning No. 29, RT.001/RW.002, Kelurahan Pulo Gebang, Kecamatan Cakung, Kota Jakarta Timur, DKI Jakarta 13950
                </p>
                <a
                  href="https://share.google/HJimLV7hhcQQgotnY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1.5 text-xs font-bold hover:underline"
                  style={{ color: "#146c38" }}
                >
                  📍 Lihat lokasi di peta
                </a>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Kontak & Layanan</p>
                <ul className="mt-1 space-y-0.5 text-slate-700">
                  <li>
                    WhatsApp:{" "}
                    <WALink raw={CONFIG.INFO_WA_ALT} shown={CONFIG.INFO_WA_ALT_DISPLAY} />
                    {" "}/{" "}
                    <WALink raw={CONFIG.ADMIN_WA} shown={CONFIG.ADMIN_WA_DISPLAY} />
                  </li>
                  <li>Email: raassalamah2017@gmail.com</li>
                  <li>
                    Instagram:{" "}
                    <a href="https://www.instagram.com/ra_assalaamah" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: "#146c38" }}>@ra_assalaamah</a>
                    {" · "}TikTok:{" "}
                    <a href="https://www.tiktok.com/@ra_assalaamah" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: "#146c38" }}>@ra_assalaamah</a>
                  </li>
                  <li>Belajar: pagi, Senin s.d. Jumat (Kelompok A usia 4–5 tahun, Kelompok B usia 5–6 tahun)</li>
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Ciri Khas</p>
              <p className="mt-1 text-slate-700">Tilawati dan tahfidz Juz 30, pembiasaan ibadah harian, pengenalan bahasa Arab dan bahasa Inggris.</p>
            </div>
          </div>
        </motion.section>

        {/* ===== ALUR PENDAFTARAN ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
          id="alur"
        >
          <div className="section-head">
            <h2 className="font-bold text-base">Alur Pendaftaran</h2>
            <span className="text-2xl" aria-hidden="true">📋</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-sm">
              {[
                { step: "1", icon: "✍️", title: "Isi Formulir", desc: "Lengkapi 39 data online dari HP" },
                { step: "2", icon: "📲", title: "Konfirmasi WA", desc: "Kirim bukti ke WA panitia" },
                { step: "3", icon: "📄", title: "Serahkan Berkas", desc: "Bawa dokumen ke sekolah setelah mengisi" },
                { step: "4", icon: "🎓", title: "Bayar & Seragam", desc: "50% administrasi, ambil seragam" },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="relative">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl font-extrabold shadow-md mb-2" style={{ background: "#146c38" }}>
                    {icon}
                  </div>
                  <p className="font-bold text-sm" style={{ color: "#0f532b" }}>{title}</p>
                  <p className="text-xs text-slate-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== BIAYA ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
          id="biaya"
        >
          <div className="section-head">
            <div>
              <h2 className="font-bold text-base">Rincian Biaya Pendaftaran</h2>
              <p className="text-xs" style={{ color: "#d6f5e3" }}>Tahun Ajaran 2027-2028</p>
            </div>
            <span className="text-2xl" aria-hidden="true">💰</span>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <BiayaTable />
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
              <li>Biaya pendaftaran <strong>Rp200.000</strong>.</li>
              <li>
                Pengembalian formulir pendaftaran disertai:
                <ul className="list-[lower-alpha] pl-5 mt-1 space-y-0.5">
                  <li>Fotokopi Akta Kelahiran</li>
                  <li>Fotokopi Kartu Keluarga</li>
                  <li>Pas foto ukuran 3x4 sebanyak 3 lembar</li>
                  <li>Fotokopi KTP Orang Tua</li>
                </ul>
                Akta Kelahiran dan Kartu Keluarga yang sudah diupload di formulir ini tidak perlu difotokopi lagi.
                Pengembalian formulir paling lambat seminggu setelah pengambilan.
              </li>
              <li>Pendaftaran gelombang 1: Oktober 2026 – Januari 2027.</li>
              <li>Pendaftaran gelombang 2: Februari – April 2027.</li>
              <li>Setelah mengembalikan persyaratan pendaftaran, membayar administrasi sebanyak 50% dan mengambil seragam.</li>
              <li>Tes psikotes dasar akan dilaksanakan setelah masuk sekolah.</li>
              <li>
                Informasi lebih lanjut dapat menghubungi Nuril Maurida (
                <WALink raw={CONFIG.INFO_WA_ALT} shown={CONFIG.INFO_WA_ALT_DISPLAY} />
                {" "}/{" "}
                <WALink raw={CONFIG.ADMIN_WA} shown={CONFIG.ADMIN_WA_DISPLAY} />
                ).
              </li>
            </ol>
            <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <strong>NB:</strong> Biaya tersebut di luar kegiatan kedinasan (Manasik, Aksera, dan Akhirussanah).
            </p>
          </div>
        </motion.section>

        {/* ===== JADWAL GELOMBANG ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
          id="jadwal"
        >
          <div className="section-head">
            <h2 className="font-bold text-base">Jadwal Penerimaan</h2>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { title: "Gelombang 1", periode: "Oktober 2026 – Januari 2027", color: "#0f532b", bg: "#eefbf3" },
              { title: "Gelombang 2", periode: "Februari – April 2027", color: "#92400e", bg: "#fffbeb" },
            ].map(({ title, periode, color, bg }) => (
              <div key={title} className="rounded-xl p-5 border" style={{ background: bg, borderColor: color + "33" }}>
                <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color }}>
                  {title}
                </p>
                <p className="font-bold text-base mt-1" style={{ color }}>{periode}</p>
                <p className="text-xs text-slate-500 mt-1">Daftarkan segera — kuota terbatas</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===== FAQ ===== */}
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="section-card"
          id="faq"
        >
          <div className="section-head">
            <h2 className="font-bold text-base">Pertanyaan Umum (FAQ)</h2>
            <span className="text-2xl" aria-hidden="true">❓</span>
          </div>
          <div className="p-5 divide-y divide-slate-100 text-sm">
            {[
              { q: "Berapa usia minimal masuk RA?", a: "Kelompok A untuk usia 4–5 tahun, Kelompok B untuk usia 5–6 tahun." },
              { q: "Apakah bisa mendaftar dari luar Jakarta?", a: "Bisa. Isi formulir online ini dari mana saja, lalu hubungi panitia untuk konfirmasi." },
              { q: "Dokumen apa saja yang perlu disiapkan?", a: "Akta Kelahiran, Kartu Keluarga, pas foto 3×4 (3 lembar), dan KTP orang tua." },
              { q: "Apakah ada tes masuk?", a: "Tes psikotes dasar ringan akan dilaksanakan setelah anak masuk sekolah, bukan sebagai syarat penerimaan." },
              { q: "Bagaimana cara membayar?", a: "Setelah mengembalikan berkas persyaratan, bayar 50% administrasi dan ambil seragam di kantor sekolah." },
            ].map(({ q, a }) => (
              <details key={q} className="group py-3">
                <summary className="cursor-pointer font-semibold text-slate-800 list-none flex justify-between items-center">
                  {q}
                  <span className="text-slate-400 ml-2 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-slate-600 text-xs">{a}</p>
              </details>
            ))}
          </div>
        </motion.section>

        {/* ===== FORMULIR ===== */}
        <section id="formulir">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="mb-5 text-center">
              <h2 className="text-xl font-extrabold" style={{ color: "#0a3b1e" }}>Formulir Pendaftaran Online</h2>
              <p className="text-sm text-slate-600 mt-1">Isi dengan data sesuai Kartu Keluarga dan Akta Kelahiran</p>
            </div>
            <PpdbForm />
          </motion.div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-10 text-center text-xs text-slate-500 no-print">
        <p>
          © 2027 <strong>Raudhatul Athfal (RA) Assalaamah</strong> · PPDB Tahun Ajaran 2027/2028 ·
          WhatsApp Panitia: <strong>{CONFIG.ADMIN_WA_DISPLAY}</strong>
        </p>
        <p className="mt-1">
          <Link href="/admin" className="hover:underline" style={{ color: "#146c38" }}>
            Halaman Admin ↗
          </Link>
        </p>
      </footer>

      {/* ===== Tombol Daftar mengambang di HP ===== */}
      <div className="fixed bottom-5 right-4 z-30 no-print sm:hidden">
        <a
          href="#formulir"
          className="flex items-center gap-2 font-extrabold text-sm px-5 py-3.5 rounded-full shadow-xl"
          style={{ background: "#146c38", color: "#fff" }}
          aria-label="Daftar Sekarang"
        >
          ✍️ Daftar
        </a>
      </div>
    </>
  );
}
