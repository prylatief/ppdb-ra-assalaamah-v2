"use client";
import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Users,
  ChevronDown,
  Star,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SmartPhoto from "@/components/SmartPhoto";
import BiayaTable from "@/components/BiayaTable";
import PpdbForm from "@/components/PpdbForm";
import { ArcAccordion, type AccordionItem } from "@/components/arc/ArcAccordion";
import { ArcStepper, type StepItem } from "@/components/arc/ArcStepper";
import { CONFIG, formatWAForLink } from "@/lib/config";
import { motionTokens } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function WALink({ raw, shown }: { raw: string; shown: string }) {
  return (
    <a
      href={`https://wa.me/${formatWAForLink(raw)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
    >
      {shown}
    </a>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  // 1. FAQ Items untuk ArcAccordion
  const faqItems: AccordionItem[] = [
    {
      id: "faq-usia",
      title: "Berapa usia anak yang diterima di RA Assalaamah?",
      content:
        "Kelompok A untuk usia 4 s/d 5 tahun, dan Kelompok B untuk usia 5 s/d 6 tahun pada tahun ajaran berjalan (per Juli 2027).",
    },
    {
      id: "faq-jadwal",
      title: "Kapan jadwal pendaftaran dibuka?",
      content:
        "Gelombang 1 dibuka Oktober 2026 hingga Januari 2027. Gelombang 2 dibuka Februari hingga April 2027. Disarankan mendaftar di gelombang 1 karena kuota kelas terbatas.",
    },
    {
      id: "faq-dokumen",
      title: "Dokumen apa saja yang wajib disiapkan?",
      content:
        "Fotokopi Akta Kelahiran, Fotokopi Kartu Keluarga (KK), Pas foto 3x4 (3 lembar), dan Fotokopi KTP Orang Tua. Dokumen Akta dan KK yang sudah diupload di formulir ini tidak perlu difotokopi lagi.",
    },
    {
      id: "faq-tes",
      title: "Apakah ada tes seleksi masuk untuk calon anak?",
      content:
        "Tidak ada tes penentu gugur/lulus. Kami hanya menyelenggarakan tes psikotes dasar ringan setelah anak resmi masuk sekolah, bertujuan memetakan gaya belajar dan keunikan masing-masing ananda.",
    },
    {
      id: "faq-bayar",
      title: "Bagaimana sistem pembayarannya?",
      content:
        "Setelah mengisi formulir online dan mengembalikan berkas persyaratan ke sekolah, orang tua membayar administrasi sebanyak 50% sekaligus mengambil seragam anak di kantor madrasah.",
    },
  ];

  // 2. Visi Misi Items untuk ArcAccordion
  const visiMisiItems: AccordionItem[] = [
    {
      id: "visi-misi-ksp",
      title: "📜 Visi & 7 Misi RA Assalaamah (Dokumen KSP 2026/2027)",
      content: (
        <div className="space-y-4 pt-2">
          <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
            <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Visi Madrasah:</p>
            <p className="font-extrabold text-emerald-950 mt-1 text-sm sm:text-base italic">
              &ldquo;Mempersiapkan Generasi yang Beriman, Berilmu, Berakhlak, dan Beramal Salihah&rdquo;
            </p>
          </div>
          <div>
            <p className="font-bold text-blue-900 mb-2 text-xs uppercase tracking-wider">Misi Madrasah (7 Butir):</p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li>Membina anak sejak dini dalam mengenal Allah Swt. dan meneladani Rasulullah saw. berdasarkan Al-Qur&apos;an dan hadis sesuai pemahaman para ulama salafussalih;</li>
              <li>Mengenalkan dan membiasakan nilai-nilai Islami dalam kehidupan sehari-hari;</li>
              <li>Menghargai dan menggali potensi kecerdasan majemuk setiap anak melalui kegiatan bermain yang beragam;</li>
              <li>Menciptakan taman bermain dan belajar yang kondusif, aktif, kreatif, dan menyenangkan melalui pembelajaran yang berkesadaran, bermakna, dan menggembirakan;</li>
              <li>Mempersiapkan kecakapan hidup (life skills) dan kemandirian anak sebagai bekal memasuki jenjang pendidikan berikutnya;</li>
              <li>Mengintegrasikan tujuh nilai Panca Cinta dalam pembelajaran, pembiasaan, dan budaya madrasah; dan</li>
              <li>Membangun kemitraan yang harmonis dengan orang tua, yayasan, dan masyarakat sebagai satu kesatuan catur pusat pendidikan.</li>
            </ol>
          </div>
        </div>
      ),
    },
  ];

  // 3. Step Items untuk ArcStepper
  const alurSteps: StepItem[] = [
    {
      id: 1,
      sublabel: "Langkah 1",
      label: "Isi Formulir Online",
      description: "Lengkapi 39 data calon murid sesuai Kartu Keluarga (KK) dan Akta Kelahiran pada formulir di bawah.",
    },
    {
      id: 2,
      sublabel: "Langkah 2",
      label: "Konfirmasi WhatsApp",
      description: "Setelah kirim, sistem otomatis menerbitkan Nomor Registrasi & tombol kirim bukti pendaftaran ke WA panitia.",
    },
    {
      id: 3,
      sublabel: "Langkah 3",
      label: "Serahkan Berkas",
      description: "Serahkan fotokopi KK, Akta, KTP ortu, dan 3 lembar pas foto 3x4 ke kantor RA Assalaamah.",
    },
    {
      id: 4,
      sublabel: "Langkah 4",
      label: "Bayar 50% & Seragam",
      description: "Membayar administrasi minimal 50%, ambil seragam anak, dan siap menyambut tahun ajaran baru!",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-amber-200 selection:text-slate-900 overflow-x-hidden w-full">
      {/* 1. STICKY NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION (Royal Navy Blue Theme) */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden pt-10 pb-28 lg:pt-16 lg:pb-36">
        {/* Subtle geometric & doodle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#38bdf8 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />
        {/* Glow circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Soft Emerald Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs border border-emerald-300/60">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Pendaftaran Siswa Baru Tahun Ajaran 2027/2028</span>
              </div>

              {/* Bold Headline with Sunny Yellow Highlight */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
                Membina Generasi Cerdas, Ceria &amp;{" "}
                <span className="text-amber-400 underline decoration-amber-400/80 decoration-wavy decoration-2 sm:decoration-4">
                  Berakhlak Mulia
                </span>
              </h1>

              {/* Light Blue Subheadline */}
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Raudhatul Athfal (RA) Assalaamah Cakung, Jakarta Timur. Pendidikan usia dini berlandaskan Al-Qur&apos;an, metode Tilawati, tahfidz Juz 30, dan pembiasaan adab Islami yang menggembirakan.
              </p>

              {/* Buttons with Arc UI Micro-Springs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  transition={motionTokens.spring.snappy}
                  href="#formulir"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base px-8 py-4 rounded-full shadow-lg transition-all"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Daftar Sekarang</span>
                </motion.a>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  transition={motionTokens.spring.snappy}
                  href="#biaya"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-base px-7 py-4 rounded-full transition-all"
                >
                  <span>💰 Rincian Biaya &amp; Alur</span>
                </motion.a>
              </div>

              {/* Mini Social Trust */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Metode Tilawati Resmi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Guru Berpengalaman</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ruang Ber-AC</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Photo & Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0"
            >
              {/* Photo Container with Yellow Accent */}
              <div className="relative w-72 sm:w-88 lg:w-full max-w-md mx-auto">
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 via-emerald-400 to-blue-400 rounded-3xl blur-md opacity-40 animate-pulse" />
                
                <div className="relative rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden bg-slate-900 aspect-4/5">
                  <SmartPhoto
                    baseName="hero-student"
                    alt="Siswa RA Assalaamah Ceria & Berakhlak"
                    aspect="w-full h-full"
                  />
                </div>

                {/* Floating Card 1: Emerald Green Badge (Tilawati) */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  transition={motionTokens.spring.snappy}
                  className="absolute -bottom-5 left-0 sm:-left-6 bg-emerald-600 text-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-2.5 sm:gap-3 border-2 border-white backdrop-blur-sm z-20 max-w-[85%] sm:max-w-none"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg sm:text-xl shrink-0">
                    📖
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">Ciri Khas</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">Tilawati &amp; Tahfidz Juz 30</p>
                  </div>
                </motion.div>

                {/* Floating Card 2: White/Amber Badge (Akreditasi) */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  transition={motionTokens.spring.snappy}
                  className="absolute -top-4 right-0 sm:-right-6 bg-white text-slate-900 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-2.5 sm:gap-3 border border-amber-200 z-20 max-w-[85%] sm:max-w-none"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Izin Resmi Kemenag</p>
                    <p className="text-xs sm:text-sm font-extrabold text-blue-950 leading-tight">Terakreditasi Baik</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. OVERLAPPING 4-COLUMN STATS BAR */}
      <section className="-mt-14 relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* Stat 1: Soft Blue */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            transition={motionTokens.spring.snappy}
            className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-100 sm:border-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="text-base sm:text-2xl font-extrabold text-blue-900 leading-tight">4 – 6 Th</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight">Kelompok A &amp; B</p>
            </div>
          </motion.div>

          {/* Stat 2: Soft Green */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            transition={motionTokens.spring.snappy}
            className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-100 sm:border-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="text-base sm:text-2xl font-extrabold text-emerald-800 leading-tight">Tilawati</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight">Tahfidz Juz 30</p>
            </div>
          </motion.div>

          {/* Stat 3: Soft Yellow */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            transition={motionTokens.spring.snappy}
            className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-100 sm:border-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="text-base sm:text-2xl font-extrabold text-amber-900 leading-tight">5 Hari</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight">Senin – Jumat Pagi</p>
            </div>
          </motion.div>

          {/* Stat 4: Soft Green */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            transition={motionTokens.spring.snappy}
            className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-100 sm:border-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="text-base sm:text-2xl font-extrabold text-emerald-800 leading-tight">2 Gelombang</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5 leading-tight">Okt 2026 – Apr 2027</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. SAMBUTAN & KEUNGGULAN (Asymmetric Bento Grid) */}
      <section id="keunggulan" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: 2x2 Photo Grid with Rounded-2xl corners & Decorative Yellow Dots */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            {/* Decorative yellow dot pattern */}
            <div
              className="hidden sm:block absolute -top-6 -left-6 w-32 h-32 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#f59e0b 2px, transparent 2px)`,
                backgroundSize: "16px 16px",
              }}
            />
            <div
              className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#059669 2px, transparent 2px)`,
                backgroundSize: "16px 16px",
              }}
            />

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-md border-2 border-emerald-100">
                <SmartPhoto baseName="activity-1" alt="Belajar Mengaji Tilawati" aspect="aspect-square" />
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-md border-2 border-amber-100 mt-6">
                <SmartPhoto baseName="activity-2" alt="Praktek Sholat & Ibadah" aspect="aspect-square" />
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-md border-2 border-blue-100 -mt-6">
                <SmartPhoto baseName="activity-3" alt="Eksplorasi Sains & Kreasi" aspect="aspect-square" />
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-md border-2 border-emerald-100">
                <SmartPhoto baseName="activity-4" alt="Bermain Motorik & Ketangkasan" aspect="aspect-square" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Emerald Green section label */}
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              Kenapa Memilih Kami
            </span>

            {/* Navy Blue Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight">
              Pondasi Iman, Karakter, dan Kemandirian Anak Sejak Usia Emas
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Masa usia dini (golden age) adalah waktu terbaik menanamkan kecintaan pada Al-Qur&apos;an dan adab mulia. Di RA Assalaamah, setiap anak didampingi pendidik penuh kasih dalam lingkungan belajar yang aman, bersih, kondusif, dan menyenangkan.
            </p>

            {/* 4 Feature Points with Green Check Icons */}
            <div className="space-y-4 pt-2">
              {[
                {
                  title: "Tilawati & Tahfidz Juz 30 Bertahap",
                  desc: "Metode membaca Al-Qur'an dengan lagu tilawati yang mudah dipahami dan hafalan surat pendek berulang.",
                },
                {
                  title: "Pembiasaan Ibadah Harian & Adab Islami",
                  desc: "Latihan wudhu, sholat dhuha berjamaah, hafalan doa harian, adab makan, dan akhlak kepada orang tua.",
                },
                {
                  title: "Stimulasi Kecerdasan Majemuk & Sains",
                  desc: "Kegiatan bermain peran, sentra balok, sentra seni kreasi, motorik halus, dan eksperimen sains sederhana.",
                },
                {
                  title: "Pengenalan Bahasa Arab & Bahasa Inggris",
                  desc: "Mengenal kosakata sehari-hari melalui lagu anak dan percakapan ringan sejak dini.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ArcAccordion Visi & Misi (Dokumen KSP) */}
            <div className="pt-2">
              <ArcAccordion items={visiMisiItems} variant="separated" />
            </div>

          </motion.div>

        </div>
      </section>

      {/* 5. PROGRAM UNGGULAN (3-Column Color-Coded Cards dengan Arc UI Spring Hover) */}
      <section id="program" className="bg-slate-50/80 py-20 lg:py-28 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-blue-100 text-blue-900 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              Program Pendidikan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Kurikulum Holistik Ramah Anak
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kombinasi kurikulum Kemenag dan kurikulum khas madrasah yang menyeimbangkan kecerdasan intelektual, emosional, spiritual, dan fisik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Tahfidz & Tilawati (Emerald Green Accent) */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={motionTokens.spring.smooth}
              className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-7 border-t-4 border-emerald-500 flex flex-col justify-between border-x border-b border-slate-200/70"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl shadow-xs">
                  📖
                </div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  Pondasi Al-Qur&apos;an
                </span>
                <h3 className="text-xl font-bold text-slate-900">Tahfidz &amp; Tilawati</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bimbingan membaca Al-Qur&apos;an metode Tilawati dengan lagu khas, hafalan surat-surat pendek Juz 30, doa sehari-hari, serta hadis-hadis pilihan anak saleh.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hafalan Juz 30 Bertahap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Metode Tilawati &amp; Murottal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Doa Harian &amp; Hadis Adab</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-700">
                Kelompok A &amp; B · Tiap Hari
              </div>
            </motion.div>

            {/* Card 2: Sentra & Sains Anak (Royal Blue Accent) */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={motionTokens.spring.smooth}
              className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-7 border-t-4 border-blue-600 flex flex-col justify-between border-x border-b border-slate-200/70"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl shadow-xs">
                  🧪
                </div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  Sentra &amp; Kreativitas
                </span>
                <h3 className="text-xl font-bold text-slate-900">Sentra Sains &amp; Kreasi</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ruang eksplorasi motorik, seni melukis, sentra balok arsitek cilik, dan eksperimen sains dasar yang melatih logika, imajinasi, serta kerja sama tim.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Sentra Bermain Peran &amp; Balok</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Eksperimen Sains Cilik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Motorik Halus &amp; Kasar</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-blue-700">
                Kecerdasan Majemuk Anak
              </div>
            </motion.div>

            {/* Card 3: Ekstrakurikuler & Pembiasaan (Amber Yellow Accent) */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={motionTokens.spring.smooth}
              className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-7 border-t-4 border-amber-500 flex flex-col justify-between border-x border-b border-slate-200/70"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shadow-xs">
                  🏕️
                </div>
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  Karakter &amp; Ekskul
                </span>
                <h3 className="text-xl font-bold text-slate-900">Ekskul &amp; Kemandirian</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Melatih keberanian dan kemandirian melalui kegiatan ekstrakurikuler, latihan manasik haji cilik, wisata edukasi ilmiah, pentas seni, dan hari makan sehat.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Praktik Manasik Haji Cilik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Wisata Ilmiah &amp; Outbound</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Menu Sehat &amp; Pemeriksaan UKS</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-amber-700">
                Pengalaman Belajar Nyata
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 6. RINCIAN BIAYA & JADWAL GELOMBANG */}
      <section id="biaya" className="py-20 lg:py-28 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
            Investasi Pendidikan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            Rincian Biaya &amp; Jadwal Pendaftaran
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Biaya transparan Tahun Ajaran 2027/2028. Rincian mencakup pendaftaran, perlengkapan, seragam, buku paket, dan kegiatan setahun.
          </p>
        </div>

        {/* Jadwal 2 Gelombang */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            className="rounded-2xl p-4 sm:p-6 border-2 border-emerald-500/40 bg-emerald-50/60 shadow-xs flex items-start gap-3.5 sm:gap-4"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-xs">
              1️⃣
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                Pendaftaran Gelombang 1
              </span>
              <p className="text-base sm:text-lg font-extrabold text-emerald-950 mt-0.5 leading-snug">
                Oktober 2026 – Januari 2027
              </p>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                Disarankan mendaftar lebih awal karena kuota kelas terbatas.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            className="rounded-2xl p-4 sm:p-6 border-2 border-amber-500/40 bg-amber-50/60 shadow-xs flex items-start gap-3.5 sm:gap-4"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-xs">
              2️⃣
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                Pendaftaran Gelombang 2
              </span>
              <p className="text-base sm:text-lg font-extrabold text-amber-950 mt-0.5 leading-snug">
                Februari – April 2027
              </p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Akan ditutup sewaktu-waktu jika kapasitas rombel telah terpenuhi.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Biaya Card */}
        <div className="section-card p-4 sm:p-8 space-y-6">
          <BiayaTable />

          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2.5">
            <p className="font-bold text-blue-900 text-sm">Ketentuan Pendaftaran:</p>
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
              <li>Biaya pendaftaran <strong>Rp200.000</strong>.</li>
              <li>
                Pengembalian formulir pendaftaran disertai:
                <ul className="list-[lower-alpha] pl-5 mt-1 space-y-0.5 text-xs text-slate-600">
                  <li>Fotokopi Akta Kelahiran</li>
                  <li>Fotokopi Kartu Keluarga</li>
                  <li>Pas foto ukuran 3x4 sebanyak 3 lembar</li>
                  <li>Fotokopi KTP Orang Tua</li>
                </ul>
                <span className="text-xs italic text-slate-500 mt-1 block">
                  * Akta Kelahiran dan Kartu Keluarga yang sudah diupload di formulir ini tidak perlu difotokopi lagi. Pengembalian formulir paling lambat seminggu setelah pengambilan/pengisian.
                </span>
              </li>
              <li>Pendaftaran gelombang 1: Oktober 2026 – Januari 2027; gelombang 2: Februari – April 2027.</li>
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
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
              <strong>NB:</strong> Biaya tersebut di luar kegiatan kedinasan (Manasik, Aksera, dan Akhirussanah).
            </p>
          </div>
        </div>
      </section>

      {/* 7. FASILITAS & GALERI KEGIATAN (Masonry/Bento Grid) */}
      <section id="galeri" className="bg-slate-50/80 py-20 lg:py-28 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-amber-100 text-amber-900 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              Suasana &amp; Sarana
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Galeri Kegiatan &amp; Fasilitas Belajar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Lingkungan madrasah yang bersih, asri, nyaman, dan mendukung kegiatan eksplorasi motorik serta spiritual anak setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Photo 1 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={motionTokens.spring.snappy}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200 aspect-4/3 cursor-pointer"
            >
              <SmartPhoto baseName="gallery-1" alt="Ruang Kelas Nyaman Ber-AC" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Fasilitas</span>
                <p className="text-base font-bold">Ruang Kelas Nyaman &amp; Ber-AC</p>
                <p className="text-xs text-slate-200 mt-0.5">Suasana belajar kondusif dan bersih</p>
              </div>
            </motion.div>

            {/* Photo 2 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={motionTokens.spring.snappy}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200 aspect-4/3 cursor-pointer"
            >
              <SmartPhoto baseName="gallery-2" alt="Area Bermain Outdoor Aman" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Outdoor</span>
                <p className="text-base font-bold">Area Bermain &amp; Ketangkasan</p>
                <p className="text-xs text-slate-200 mt-0.5">Taman ramah anak berpagar aman</p>
              </div>
            </motion.div>

            {/* Photo 3 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={motionTokens.spring.snappy}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200 aspect-4/3 cursor-pointer"
            >
              <SmartPhoto baseName="gallery-3" alt="Pojok Baca & Perpustakaan" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Literasi</span>
                <p className="text-base font-bold">Pojok Baca &amp; Cerita Islami</p>
                <p className="text-xs text-slate-200 mt-0.5">Buku bergambar adab &amp; kisah nabi</p>
              </div>
            </motion.div>

            {/* Photo 4 */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={motionTokens.spring.snappy}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200 aspect-4/3 cursor-pointer"
            >
              <SmartPhoto baseName="gallery-4" alt="Praktik Ibadah & Manasik" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Kegiatan</span>
                <p className="text-base font-bold">Praktik Ibadah &amp; Manasik</p>
                <p className="text-xs text-slate-200 mt-0.5">Mengenal rukun Islam sejak dini</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 8. ALUR PENDAFTARAN PPDB (ArcStepper) */}
      <section id="alur" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
            Tata Cara Pendaftaran
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            4 Langkah Mudah Mendaftar di HP
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Proses cepat, praktis, dan dapat diisi santai dari rumah bersama keluarga.
          </p>
        </div>

        {/* ArcStepper Component */}
        <ArcStepper steps={alurSteps} currentStep={1} />
      </section>

      {/* 9. FORMULIR PENDAFTARAN (PPDB ONLINE) */}
      <section id="formulir" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-10">
            <span className="inline-block bg-amber-100 text-amber-900 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
              Formulir Pendaftaran Siswa Baru
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Pendaftaran Online TA 2027/2028
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Silakan isi 39 kolom data berikut dengan teliti. Data otomatis tersimpan di perangkat ini (aman bila keluar sejenak).
            </p>
          </div>

          {/* Component Formulir PPDB 39 Field */}
          <PpdbForm />

        </div>
      </section>

      {/* 10. TANYA JAWAB (ArcAccordion FAQ) */}
      <section id="faq" className="py-20 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
            Bantuan Wali Murid
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm">
            Jawaban lengkap seputar pendaftaran, berkas, dan ketentuan RA Assalaamah.
          </p>
        </div>

        {/* ArcAccordion Component untuk FAQ */}
        <ArcAccordion items={faqItems} defaultOpen="faq-usia" variant="separated" />
      </section>

      {/* 11. PRE-FOOTER CTA BANNER */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-gradient-to-r from-emerald-600 via-blue-800 to-blue-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          
          <div className="space-y-3 max-w-xl">
            <span className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Konsultasi &amp; Tanya Jawab
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Masih Ada Pertanyaan Seputar PPDB?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Tim panitia siap membantu Ayah &amp; Bunda melalui WhatsApp resmi panitia PPDB. Konsultasikan usia anak, program kelas, dan tata cara pendaftaran.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={motionTokens.spring.snappy}
              href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20bertanya%20mengenai%20pendaftaran`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat WhatsApp Panitia</span>
            </motion.a>
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={motionTokens.spring.snappy}
              href="#formulir"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition"
            >
              <span>Langsung Daftar →</span>
            </motion.a>
          </div>

        </div>
      </section>

      {/* 12. FOOTER (Clean bg-blue-950) */}
      <footer className="bg-blue-950 text-slate-300 pt-16 pb-12 border-t border-blue-900/50 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/60">
            
            {/* Col 1: School Identity */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-ra.jpg" alt="Logo RA Assalaamah" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">RAUDHATUL ATHFAL ASSALAAMAH</h3>
                  <p className="text-xs text-emerald-400 font-semibold">Taman Belajar Islami &amp; Berkarakter</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Lembaga pendidikan anak usia dini berciri khas Islam yang menyelenggarakan bimbingan Tilawati Al-Qur&apos;an, hafalan Juz 30, serta pembiasaan ibadah dan adab sejak dini.
              </p>
              <div className="pt-1 flex items-center gap-3 text-xs text-slate-400">
                <span>Instagram: <a href="https://www.instagram.com/ra_assalaamah" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">@ra_assalaamah</a></span>
                <span>·</span>
                <span>TikTok: <a href="https://www.tiktok.com/@ra_assalaamah" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">@ra_assalaamah</a></span>
              </div>
            </div>

            {/* Col 2: Alamat */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-sm font-bold text-white uppercase tracking-wider">Lokasi Madrasah</p>
              <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Jl. Raya Rawa Kuning No. 29, RT.001/RW.002, Kelurahan Pulo Gebang, Kecamatan Cakung, Kota Jakarta Timur, DKI Jakarta 13950
                </span>
              </div>
              <a
                href="https://share.google/HJimLV7hhcQQgotnY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline pt-1"
              >
                📍 Buka Peta Google Maps →
              </a>
            </div>

            {/* Col 3: Layanan & Jam */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-sm font-bold text-white uppercase tracking-wider">Kontak &amp; Layanan</p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp 1: <strong>{CONFIG.ADMIN_WA_DISPLAY}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp 2: <strong>{CONFIG.INFO_WA_ALT_DISPLAY}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>raassalamah2017@gmail.com</span>
                </li>
                <li className="pt-1 text-[11px] text-slate-400">
                  Senin s.d. Jumat (pagi hari aktif)
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2027 <strong>RA Assalaamah</strong> · Panitia PPDB Tahun Ajaran 2027/2028. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-slate-400 hover:text-white transition">
                Portal Admin Panitia ↗
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING WHATSAPP & QUICK ACTION BUTTONS */}
      {/* Floating Emerald WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <motion.a
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          transition={motionTokens.spring.snappy}
          href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20konsultasi%20pendaftaran`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl transition-all"
          aria-label="Hubungi WhatsApp Panitia"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-xs group-hover:max-w-xs transition-all duration-300">
            Konsultasi WhatsApp
          </span>
        </motion.a>
      </div>

      {/* Floating Mobile Bottom Action */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden flex items-center gap-2.5 shadow-2xl">
        <a
          href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/3 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs py-3 rounded-xl"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Tanya WA</span>
        </a>
        <a
          href="#formulir"
          className="w-2/3 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-md"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Daftar Sekarang</span>
        </a>
      </div>
    </div>
  );
}
