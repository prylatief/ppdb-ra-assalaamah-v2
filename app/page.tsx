"use client";
import React, { useState } from "react";
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
  ArrowRight,
  Globe,
  Heart,
  Smile,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SmartPhoto from "@/components/SmartPhoto";
import MascotIllustration from "@/components/MascotIllustration";
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
      className="font-bold text-[#1E6B49] hover:text-[#165037] hover:underline"
    >
      {shown}
    </a>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  // State Maskot Balon Kata (Speech Bubble)
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "Assalamu'alaikum! Selamat Datang di RA Assalaamah! ✨",
    "Yuk, belajar mengaji & bermain bersama kami! 🎨📚",
    "Pendaftaran murid baru (PPDB 2027/2028) sudah dibuka lho! 🎉",
    "Bisa daftar online langsung dari HP Ayah & Bunda! 📱",
    "Ada program Tahfidz Juz 30 & metode Tilawati yang seru! 🌟",
  ];

  const handleMascotClick = () => {
    setGreetingIndex((prev) => (prev + 1) % greetings.length);
  };

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
          <div className="bg-[#D1FAE5]/60 p-4 rounded-2xl border-2 border-[#1E6B49]/30">
            <p className="text-xs font-bold text-[#1E6B49] uppercase tracking-wider font-heading">Visi Madrasah:</p>
            <p className="font-extrabold text-[#112F20] mt-1 text-sm sm:text-base italic font-heading">
              &ldquo;Mempersiapkan Generasi yang Beriman, Berilmu, Berakhlak, dan Beramal Salihah&rdquo;
            </p>
          </div>
          <div>
            <p className="font-heading font-bold text-[#1E6B49] mb-2 text-xs uppercase tracking-wider">Misi Madrasah (7 Butir):</p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#112F20]/85 leading-relaxed font-body">
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
    <div className="min-h-screen bg-[#FCFDF9] text-[#112F20] flex flex-col selection:bg-[#FDE68A] selection:text-[#112F20] overflow-x-hidden w-full font-body">
      {/* 1. STICKY NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION INTERAKTIF DENGAN MASKOT PENYAMBUT */}
      <section id="beranda" className="relative pt-6 sm:pt-10 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FCFDF9] via-[#F0FDF4] to-[#FEF3C7]">
        {/* Dekorasi Garis Lengkung Kuning Atas */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-2">
          <svg className="w-full h-6 sm:h-8 text-[#FBBF24] opacity-80" viewBox="0 0 1200 60" fill="none">
            <path d="M0,40 Q300,-10 600,30 T1200,10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Kolom Kiri: Teks Sambutan & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left z-10"
            >
              {/* Badge Ceria */}
              <div className="inline-flex items-center gap-2 bg-[#D1FAE5] border-2 border-[#1E6B49]/30 text-[#1E6B49] px-4 py-1.5 rounded-full text-xs sm:text-sm font-heading font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Pendaftaran Siswa Baru TA 2027/2028 Telah Dibuka!</span>
              </div>

              {/* Judul Utama Ramah Anak */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#1E6B49] leading-[1.18] tracking-tight">
                Selamat Datang di <br />
                <span className="text-[#112F20] relative inline-block">
                  RA Assalaamah!
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FBBF24]" viewBox="0 0 200 20" fill="none">
                    <path d="M5 15 Q 100 0 195 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Subjudul */}
              <p className="font-body text-base sm:text-xl text-[#112F20]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Tempat Belajar, Bermain, dan Tumbuh dengan Nilai-Nilai Islami yang Ceria, Penuh Kasih Sayang, dan Menggembirakan.
              </p>

              {/* 2 Tombol CTA Chunky */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/daftar"
                  className="btn-chunky-yellow text-base sm:text-lg px-8 py-3.5 tracking-wide shadow-[0_5px_0_#D97706]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Daftar PPDB</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

                <a
                  href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20tanya%20info%20pendaftaran`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-chunky-green text-base sm:text-lg px-7 py-3.5"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span>Hubungi Kami</span>
                </a>
              </div>

              {/* Mini Keunggulan Tag */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#1E6B49] font-bold">
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-[#1E6B49]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371]" />
                  <span>Metode Tilawati</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-[#1E6B49]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371]" />
                  <span>Tahfidz Juz 30</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-[#1E6B49]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371]" />
                  <span>Kelas Ber-AC &amp; Asri</span>
                </div>
              </div>
            </motion.div>

            {/* Kolom Kanan: Karakter Maskot Interaktif dengan Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-center z-10 mt-2 lg:mt-0"
            >
              {/* Balon Kata (Speech Bubble) */}
              <div
                key={greetingIndex}
                onClick={handleMascotClick}
                className="animate-pop cursor-pointer relative bg-[#FEF3C7] border-2 sm:border-[3px] border-[#112F20] rounded-3xl px-5 sm:px-6 py-3.5 sm:py-4 mb-4 max-w-xs sm:max-w-sm shadow-[4px_4px_0px_#112F20] hover:scale-105 active:scale-95 transition-all select-none"
                title="Klik untuk ganti sapaan!"
              >
                <p className="font-heading text-sm sm:text-base font-semibold text-[#112F20] text-center leading-snug">
                  {greetings[greetingIndex]}
                </p>
                <span className="block text-[10px] text-center text-[#1E6B49] font-bold mt-1">
                  (Klik maskot untuk sapaan lain 👋)
                </span>
                {/* Ekor Balon Kata */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FEF3C7] border-r-2 border-b-2 sm:border-r-[3px] sm:border-b-[3px] border-[#112F20] rotate-45"></div>
              </div>

              {/* Area Maskot Anak TK Interaktif */}
              <div
                onClick={handleMascotClick}
                className="animate-float cursor-pointer relative group select-none w-72 sm:w-88"
              >
                {/* Bintang-Bintang Dekoratif Animasi */}
                <Star className="w-7 h-7 text-[#FBBF24] fill-[#FBBF24] absolute -left-4 top-8 animate-pulse pointer-events-none" />
                <Star className="w-5 h-5 text-[#3CB371] fill-[#3CB371] absolute -right-2 top-4 pointer-events-none" />
                <Star className="w-7 h-7 text-[#FBBF24] fill-[#FBBF24] absolute -right-6 bottom-16 animate-bounce pointer-events-none" />

                {/* Ilustrasi Maskot SVG Custom (Anak Sholeh & Sholehah Seragam Hijau-Kuning) */}
                <div className="w-full h-auto drop-shadow-xl filter group-hover:scale-105 transition-transform duration-300">
                  <MascotIllustration className="w-full h-auto" />
                </div>
              </div>

              {/* Floating Badge di Bawah Maskot */}
              <div className="mt-3 flex items-center gap-2 bg-white/90 border-2 border-[#1E6B49]/30 px-4 py-2 rounded-2xl shadow-sm text-xs font-heading font-bold text-[#1E6B49]">
                <span>🌟 Terakreditasi Kemenag</span>
                <span className="text-[#FBBF24]">·</span>
                <span>Usia 4–6 Tahun</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Section Divider: Pembatas Bawah Gelombang Kuning Melengkung */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-12 sm:h-20 text-[#FEF3C7]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* 3. SEKSI KEUNGGULAN / PROGRAM (3 KARTU CHUNKY BORDER) */}
      <section id="program" className="bg-[#FEF3C7] py-16 sm:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-white text-[#1E6B49] border border-[#1E6B49]/30 text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-2xs">
              Keunggulan Kami
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#112F20] tracking-tight">
              3 Pilar Tumbuh Kembang Ananda
            </h2>
            <p className="font-body text-[#112F20]/75 text-sm sm:text-base font-medium">
              Menyeimbangkan kecerdasan spiritual, emosional, dan motorik anak dengan pendekatan yang ceria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-9">
            
            {/* Kartu 1: Kurikulum Islami (Border Hijau Tua #1E6B49) */}
            <div className="relative bg-white rounded-3xl p-7 sm:p-8 border-[4px] border-[#1E6B49] shadow-[0_8px_0_#1E6B49] hover:-translate-y-1.5 transition-transform flex flex-col justify-between">
              <div>
                <div className="absolute -top-6 right-6 bg-[#D1FAE5] border-2 border-[#112F20] p-3 rounded-2xl shadow-sm">
                  <BookOpen className="w-7 h-7 text-[#1E6B49]" />
                </div>
                <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">
                  Pilar Utama
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#112F20] mb-3">
                  Kurikulum Islami
                </h3>
                <p className="font-body text-[#112F20]/80 leading-relaxed text-sm sm:text-base font-normal">
                  Hafalan surat-surat pendek Juz 30 bertahap, doa sehari-hari, hadis adab anak saleh, dan metode mengaji Tilawati yang menyenangkan.
                </p>
              </div>
              <ul className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1E6B49] space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371] shrink-0" />
                  <span>Metode Tilawati &amp; Murottal Ceria</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371] shrink-0" />
                  <span>Praktek Sholat &amp; Wudhu Harian</span>
                </li>
              </ul>
            </div>

            {/* Kartu 2: Aktivitas Seru (Border Kuning Ceria #FBBF24) */}
            <div className="relative bg-white rounded-3xl p-7 sm:p-8 border-[4px] border-[#FBBF24] shadow-[0_8px_0_#D97706] hover:-translate-y-1.5 transition-transform flex flex-col justify-between">
              <div>
                <div className="absolute -top-6 right-6 bg-[#FEF3C7] border-2 border-[#112F20] p-3 rounded-2xl shadow-sm">
                  <Star className="w-7 h-7 text-[#F59E0B] fill-[#FBBF24]" />
                </div>
                <span className="inline-block bg-[#FEF3C7] text-[#B45309] text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">
                  Eksplorasi Anak
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#112F20] mb-3">
                  Aktivitas Seru
                </h3>
                <p className="font-body text-[#112F20]/80 leading-relaxed text-sm sm:text-base font-normal">
                  Belajar sambil bermain melalui sentra seni kreasi, motorik halus &amp; kasar, eksperimen sains sederhana, dan pengenalan kosakata Arab &amp; Inggris.
                </p>
              </div>
              <ul className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-[#B45309] space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Sentra Peran, Balok &amp; Sains</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Ekskul &amp; Wisata Ilmiah Edukatif</span>
                </li>
              </ul>
            </div>

            {/* Kartu 3: Lingkungan Aman & Nyaman (Border Hijau Ceria #3CB371) */}
            <div className="relative bg-white rounded-3xl p-7 sm:p-8 border-[4px] border-[#3CB371] shadow-[0_8px_0_#1E6B49] hover:-translate-y-1.5 transition-transform flex flex-col justify-between">
              <div>
                <div className="absolute -top-6 right-6 bg-[#ECFDF5] border-2 border-[#112F20] p-3 rounded-2xl shadow-sm">
                  <Globe className="w-7 h-7 text-[#3CB371]" />
                </div>
                <span className="inline-block bg-[#ECFDF5] text-[#047857] text-xs font-heading font-bold px-3 py-1 rounded-full mb-3">
                  Ramah Anak
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#112F20] mb-3">
                  Lingkungan Nyaman
                </h3>
                <p className="font-body text-[#112F20]/80 leading-relaxed text-sm sm:text-base font-normal">
                  Didampingi bunda guru yang sabar dan penyayang, ruang kelas ber-AC yang bersih, area bermain berpagar aman, dan pemeriksaan menu sehat UKS.
                </p>
              </div>
              <ul className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-[#047857] space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371] shrink-0" />
                  <span>Ruang Ber-AC &amp; Pojok Baca</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3CB371] shrink-0" />
                  <span>Taman Bermain Outdoor Aman</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OVERLAPPING 4-COLUMN STATS BAR */}
      <section className="-mt-10 relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl shadow-[0_6px_0_rgba(30,107,73,0.15)] border-2 border-[#1E6B49]/20 p-4 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* Stat 1 */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-2xl bg-[#FCFDF9] sm:bg-transparent border border-slate-100 sm:border-none">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#D1FAE5] text-[#1E6B49] flex items-center justify-center shrink-0 border border-[#1E6B49]/20">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="font-heading text-base sm:text-2xl font-bold text-[#1E6B49] leading-tight">4 – 6 Th</p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#112F20]/70 mt-0.5 leading-tight">Kelompok A &amp; B</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-2xl bg-[#FCFDF9] sm:bg-transparent border border-slate-100 sm:border-none">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 border border-[#FBBF24]/40">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="font-heading text-base sm:text-2xl font-bold text-[#B45309] leading-tight">Tilawati</p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#112F20]/70 mt-0.5 leading-tight">Tahfidz Juz 30</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-2xl bg-[#FCFDF9] sm:bg-transparent border border-slate-100 sm:border-none">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#D1FAE5] text-[#1E6B49] flex items-center justify-center shrink-0 border border-[#1E6B49]/20">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="font-heading text-base sm:text-2xl font-bold text-[#1E6B49] leading-tight">5 Hari</p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#112F20]/70 mt-0.5 leading-tight">Senin – Jumat Pagi</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-0 rounded-2xl bg-[#FCFDF9] sm:bg-transparent border border-slate-100 sm:border-none">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 border border-[#FBBF24]/40">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 w-full sm:w-auto">
              <p className="font-heading text-base sm:text-2xl font-bold text-[#B45309] leading-tight">2 Gelombang</p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#112F20]/70 mt-0.5 leading-tight">Okt 2026 – Apr 2027</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PROFIL & KEUNGGULAN (Bento Grid) */}
      <section id="profil" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: 2x2 Photo Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="rounded-3xl overflow-hidden shadow-md border-[3px] border-[#1E6B49]">
                <SmartPhoto baseName="activity-1" alt="Belajar Mengaji Tilawati" aspect="aspect-square" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md border-[3px] border-[#FBBF24] mt-6">
                <SmartPhoto baseName="activity-2" alt="Praktek Sholat & Ibadah" aspect="aspect-square" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md border-[3px] border-[#3CB371] -mt-6">
                <SmartPhoto baseName="activity-3" alt="Eksplorasi Sains & Kreasi" aspect="aspect-square" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-md border-[3px] border-[#1E6B49]">
                <SmartPhoto baseName="activity-4" alt="Bermain Motorik & Ketangkasan" aspect="aspect-square" />
              </div>
            </div>
          </div>

          {/* Right Side: Content & Visi Misi */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider border border-[#1E6B49]/20">
              Profil Madrasah
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E6B49] leading-tight">
              Mendidik dengan Adab, Membina dengan Kasih Sayang
            </h2>

            <p className="font-body text-[#112F20]/80 text-base leading-relaxed">
              Masa usia dini (golden age) adalah waktu terbaik menanamkan kecintaan pada Al-Qur&apos;an dan adab mulia. Di RA Assalaamah, setiap anak didampingi pendidik berdedikasi dalam lingkungan belajar yang aman, bersih, kondusif, dan menyenangkan.
            </p>

            <div className="space-y-3.5 pt-1">
              {[
                {
                  title: "Tilawati & Tahfidz Juz 30 Bertahap",
                  desc: "Membaca Al-Qur'an dengan metode tilawati yang mudah dipahami dan hafalan surat pendek berulang.",
                },
                {
                  title: "Pembiasaan Ibadah Harian & Adab Islami",
                  desc: "Latihan wudhu, sholat dhuha berjamaah, hafalan doa harian, adab makan, dan akhlak kepada orang tua.",
                },
                {
                  title: "Stimulasi Kecerdasan Majemuk & Sains",
                  desc: "Bermain peran, sentra balok, seni kreasi, motorik halus, dan eksperimen sains sederhana.",
                },
                {
                  title: "Pengenalan Bahasa Arab & Bahasa Inggris",
                  desc: "Mengenal kosakata sehari-hari melalui lagu anak dan percakapan ringan sejak dini.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D1FAE5] text-[#1E6B49] flex items-center justify-center shrink-0 mt-0.5 border border-[#1E6B49]/30">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#112F20] text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#112F20]/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ArcAccordion Visi & Misi */}
            <div className="pt-2">
              <ArcAccordion items={visiMisiItems} variant="separated" />
            </div>

          </div>

        </div>
      </section>

      {/* 6. RINCIAN BIAYA & JADWAL GELOMBANG */}
      <section id="biaya" className="py-20 lg:py-28 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider border border-[#1E6B49]/20">
            Investasi Pendidikan
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
            Rincian Biaya &amp; Jadwal Pendaftaran
          </h2>
          <p className="font-body text-[#112F20]/75 text-sm sm:text-base font-medium">
            Biaya transparan Tahun Ajaran 2027/2028. Rincian mencakup pendaftaran, perlengkapan, seragam, buku paket, dan kegiatan setahun.
          </p>
        </div>

        {/* Jadwal 2 Gelombang Chunky Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-3xl p-5 sm:p-6 border-[3px] border-[#1E6B49] bg-white shadow-[0_5px_0_#1E6B49] flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#D1FAE5] text-[#1E6B49] flex items-center justify-center text-lg sm:text-xl shrink-0 font-heading font-bold border-2 border-[#1E6B49]">
              1
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#1E6B49]">
                Pendaftaran Gelombang 1
              </span>
              <p className="font-heading text-base sm:text-lg font-bold text-[#112F20] mt-0.5 leading-snug">
                Oktober 2026 – Januari 2027
              </p>
              <p className="text-xs text-[#112F20]/70 mt-1 leading-relaxed font-medium">
                Disarankan mendaftar lebih awal karena kuota kelas terbatas.
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-5 sm:p-6 border-[3px] border-[#FBBF24] bg-white shadow-[0_5px_0_#D97706] flex items-start gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-lg sm:text-xl shrink-0 font-heading font-bold border-2 border-[#FBBF24]">
              2
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#B45309]">
                Pendaftaran Gelombang 2
              </span>
              <p className="font-heading text-base sm:text-lg font-bold text-[#112F20] mt-0.5 leading-snug">
                Februari – April 2027
              </p>
              <p className="text-xs text-[#112F20]/70 mt-1 leading-relaxed font-medium">
                Akan ditutup sewaktu-waktu jika kapasitas rombel telah terpenuhi.
              </p>
            </div>
          </div>
        </div>

        {/* Biaya Card */}
        <div className="section-card p-4 sm:p-8 space-y-6">
          <BiayaTable />

          <div className="bg-[#FCFDF9] rounded-2xl p-5 border-2 border-[#1E6B49]/15 text-xs sm:text-sm text-[#112F20] space-y-2.5">
            <p className="font-heading font-bold text-[#1E6B49] text-sm">Ketentuan Pendaftaran:</p>
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed font-body">
              <li>Biaya pendaftaran <strong>Rp200.000</strong>.</li>
              <li>
                Pengembalian formulir pendaftaran disertai:
                <ul className="list-[lower-alpha] pl-5 mt-1 space-y-0.5 text-xs text-[#112F20]/70">
                  <li>Fotokopi Akta Kelahiran</li>
                  <li>Fotokopi Kartu Keluarga</li>
                  <li>Pas foto ukuran 3x4 sebanyak 3 lembar</li>
                  <li>Fotokopi KTP Orang Tua</li>
                </ul>
                <span className="text-xs italic text-[#112F20]/60 mt-1 block">
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
            <p className="text-xs text-[#112F20]/60 pt-2 border-t border-slate-200">
              <strong>NB:</strong> Biaya tersebut di luar kegiatan kedinasan (Manasik, Aksera, dan Akhirussanah).
            </p>
          </div>
        </div>
      </section>

      {/* 7. FASILITAS & GALERI KEGIATAN */}
      <section id="galeri" className="bg-[#FEF3C7]/40 py-20 lg:py-28 border-t border-[#1E6B49]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#FEF3C7] text-[#B45309] border border-[#FBBF24]/40 text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider">
              Suasana &amp; Sarana
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
              Galeri Kegiatan &amp; Fasilitas Belajar
            </h2>
            <p className="font-body text-[#112F20]/75 text-sm sm:text-base font-medium">
              Lingkungan madrasah yang bersih, asri, nyaman, dan mendukung kegiatan eksplorasi motorik serta spiritual anak setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Photo 1: Sentra Balok di Kelas */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#1E6B49]/30 aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-1" alt="Sentra Balok & Konstruksi di Ruang Kelas" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Sentra Kelas</span>
                <p className="text-base font-heading font-bold">Sentra Balok &amp; Kreativitas</p>
                <p className="text-xs text-slate-200 mt-0.5">Mengeksplorasi imajinasi &amp; kerja sama tim di kelas</p>
              </div>
            </div>

            {/* Photo 2: Ketangkasan Motorik di Lapangan */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#FBBF24] aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-2" alt="Permainan Ketangkasan Bola di Lapangan" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Motorik Ceria</span>
                <p className="text-base font-heading font-bold">Ketangkasan Bola Warna</p>
                <p className="text-xs text-slate-200 mt-0.5">Melatih fokus dan gerak motorik di lapangan terbuka</p>
              </div>
            </div>

            {/* Photo 3: Karnaval Profesi Cita-Cita */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#3CB371] aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-3" alt="Pentas Profesi Cita-Cita Siswa" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Cita-Cita</span>
                <p className="text-base font-heading font-bold">Pentas Profesi Masa Depan</p>
                <p className="text-xs text-slate-200 mt-0.5">Mengenal ragam profesi mulia sejak usia dini</p>
              </div>
            </div>

            {/* Photo 4: Prestasi Manasik Haji */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#1E6B49]/30 aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-4" alt="Prestasi Juara Manasik Haji Cilik" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Prestasi</span>
                <p className="text-base font-heading font-bold">Juara Manasik Haji Cilik</p>
                <p className="text-xs text-slate-200 mt-0.5">Piala penghargaan peragaan manasik haji anak</p>
              </div>
            </div>

            {/* Photo 5: Wisata Alam & Edukasi Berkebun */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#FBBF24] aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-5" alt="Wisata Alam & Edukasi Berkebun" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Eksplorasi Alam</span>
                <p className="text-base font-heading font-bold">Wisata Edukasi Berkebun</p>
                <p className="text-xs text-slate-200 mt-0.5">Mengenal aneka tanaman &amp; alam ciptaan Allah</p>
              </div>
            </div>

            {/* Photo 6: Dewan Asatidz & Guru RA Assalaamah */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md bg-white border-2 border-[#3CB371] aspect-4/3 cursor-pointer hover:-translate-y-1 transition-transform">
              <SmartPhoto baseName="gallery-6" alt="Dewan Guru & Asatidz RA Assalaamah" aspect="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112F20]/90 via-[#1E6B49]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-heading font-bold text-[#FBBF24] uppercase tracking-wider">Pendidik</span>
                <p className="text-base font-heading font-bold">Dewan Guru &amp; Asatidz</p>
                <p className="text-xs text-slate-200 mt-0.5">Penuh kehangatan membina akidah &amp; akhlak ananda</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. ALUR PENDAFTARAN PPDB (ArcStepper) */}
      <section id="alur" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] border border-[#1E6B49]/20 text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider">
            Tata Cara Pendaftaran
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
            4 Langkah Mudah Mendaftar di HP
          </h2>
          <p className="font-body text-[#112F20]/75 text-sm sm:text-base font-medium">
            Proses cepat, praktis, dan dapat diisi santai dari rumah bersama keluarga.
          </p>
        </div>

        {/* ArcStepper Component */}
        <ArcStepper steps={alurSteps} currentStep={1} />
      </section>

      {/* 9. AJAKAN PENDAFTARAN ONLINE (CTA SHOWCASE) */}
      <section id="formulir" className="py-16 sm:py-24 bg-gradient-to-b from-[#FEF3C7]/40 via-white to-white border-t border-[#1E6B49]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border-[3px] border-[#1E6B49] shadow-[0_8px_0_#1E6B49] text-center space-y-6 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border-2 border-[#FBBF24]/60 text-[#B45309] text-xs font-heading font-bold px-4 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Pendaftaran Murid Baru TA 2027/2028</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
              Siap Menjadi Bagian dari <br />
              Keluarga Besar RA Assalaamah?
            </h2>

            <p className="font-body text-[#112F20]/75 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Formulir PPDB kini terpisah dalam halaman khusus yang fokus, nyaman, dan ramah pengguna di layar HP. Dilengkapi fitur autosave otomatis agar aman bila Anda mengisi sambil menyiapkan berkas.
            </p>

            {/* 3 Keuntungan Mengisi Form Online */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
              <div className="bg-[#FCFDF9] p-4 rounded-2xl border-2 border-[#1E6B49]/15 space-y-1">
                <span className="text-xl">📋</span>
                <p className="font-heading font-bold text-xs sm:text-sm text-[#112F20]">39 Data Terstruktur</p>
                <p className="text-[11px] sm:text-xs text-[#112F20]/70 font-medium">4 bagian rapi: Anak, Fisik, Ayah, dan Ibu kandung.</p>
              </div>

              <div className="bg-[#FCFDF9] p-4 rounded-2xl border-2 border-[#FBBF24]/50 space-y-1">
                <span className="text-xl">💾</span>
                <p className="font-heading font-bold text-xs sm:text-sm text-[#112F20]">Autosave di HP</p>
                <p className="text-[11px] sm:text-xs text-[#112F20]/70 font-medium">Draf tersimpan otomatis, aman keluar masuk aplikasi.</p>
              </div>

              <div className="bg-[#FCFDF9] p-4 rounded-2xl border-2 border-[#3CB371]/30 space-y-1">
                <span className="text-xl">📲</span>
                <p className="font-heading font-bold text-xs sm:text-sm text-[#112F20]">Bukti &amp; WhatsApp</p>
                <p className="text-[11px] sm:text-xs text-[#112F20]/70 font-medium">Terbit nomor registrasi &amp; tombol kirim konfirmasi WA.</p>
              </div>
            </div>

            {/* Tombol Buka Halaman /daftar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/daftar"
                className="w-full sm:w-auto btn-chunky-yellow text-base sm:text-lg px-8 py-4 shadow-[0_5px_0_#D97706]"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Buka Formulir Pendaftaran Online (39 Data)</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <p className="text-xs text-[#112F20]/60 font-medium">
              * Pengisian butuh waktu ±5 menit. Siapkan Kartu Keluarga (KK) dan Akta Kelahiran ananda.
            </p>
          </div>
        </div>
      </section>

      {/* 10. TANYA JAWAB (ArcAccordion FAQ) */}
      <section id="faq" className="py-20 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] border border-[#1E6B49]/20 text-xs font-heading font-bold uppercase px-4 py-1.5 rounded-full tracking-wider">
            Bantuan Wali Murid
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="font-body text-[#112F20]/75 text-sm font-medium">
            Jawaban lengkap seputar pendaftaran, berkas, dan ketentuan RA Assalaamah.
          </p>
        </div>

        {/* ArcAccordion Component untuk FAQ */}
        <ArcAccordion items={faqItems} defaultOpen="faq-usia" variant="separated" />
      </section>

      {/* 11. PRE-FOOTER CTA BANNER */}
      <section id="kontak" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-gradient-to-r from-[#1E6B49] via-[#165037] to-[#112F20] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 border-2 border-[#FBBF24]/40">
          
          <div className="space-y-3 max-w-xl">
            <span className="inline-block bg-[#FBBF24] text-[#112F20] text-xs font-heading font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Konsultasi &amp; Tanya Jawab
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold leading-tight">
              Masih Ada Pertanyaan Seputar PPDB?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-body">
              Tim panitia siap membantu Ayah &amp; Bunda melalui WhatsApp resmi panitia PPDB. Konsultasikan usia anak, program kelas, dan tata cara pendaftaran.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
            <a
              href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20bertanya%20mengenai%20pendaftaran`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chunky-yellow text-sm sm:text-base px-7 py-3.5"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Chat WhatsApp Panitia</span>
            </a>
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border-2 border-white/40 font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition"
            >
              <span>Buka Form Pendaftaran →</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 12. FOOTER (Identitas Hijau Logo #112F20 & #1E6B49) */}
      <footer className="bg-[#112F20] text-emerald-100 pt-16 pb-12 border-t-4 border-[#FBBF24] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E6B49]/40">
            
            {/* Col 1: Identitas Madrasah */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 border-2 border-[#FBBF24]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-ra.jpg" alt="Logo RA Assalaamah" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                    <span className="text-[#3CB371]">RA </span>
                    <span className="text-[#FBBF24]">ASSALAAMAH</span>
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold font-body">Taman Belajar Islami &amp; Ceria</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-md font-body">
                Lembaga pendidikan anak usia dini berciri khas Islam yang menyelenggarakan bimbingan Tilawati Al-Qur&apos;an, hafalan Juz 30, serta pembiasaan ibadah dan adab sejak dini.
              </p>
              <div className="pt-1 flex items-center gap-3 text-xs text-emerald-300 font-semibold font-body">
                <span>Instagram: <a href="https://www.instagram.com/ra_assalaamah" target="_blank" rel="noopener noreferrer" className="text-[#FBBF24] font-bold hover:underline">@ra_assalaamah</a></span>
                <span>·</span>
                <span>TikTok: <a href="https://www.tiktok.com/@ra_assalaamah" target="_blank" rel="noopener noreferrer" className="text-[#FBBF24] font-bold hover:underline">@ra_assalaamah</a></span>
              </div>
            </div>

            {/* Col 2: Alamat */}
            <div className="lg:col-span-4 space-y-3 font-body">
              <p className="text-sm font-heading font-bold text-white uppercase tracking-wider">Lokasi Madrasah</p>
              <div className="flex items-start gap-2.5 text-xs text-emerald-100/90 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <span>
                  Jl. Raya Rawa Kuning No. 29, RT.001/RW.002, Kelurahan Pulo Gebang, Kecamatan Cakung, Kota Jakarta Timur, DKI Jakarta 13950
                </span>
              </div>
              <a
                href="https://share.google/HJimLV7hhcQQgotnY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-[#FBBF24] hover:text-amber-300 hover:underline pt-1"
              >
                📍 Buka Peta Google Maps →
              </a>
            </div>

            {/* Col 3: Layanan & Jam */}
            <div className="lg:col-span-3 space-y-3 font-body">
              <p className="text-sm font-heading font-bold text-white uppercase tracking-wider">Kontak &amp; Layanan</p>
              <ul className="text-xs text-emerald-100/90 space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>WA 1: <strong>{CONFIG.ADMIN_WA_DISPLAY}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>WA 2: <strong>{CONFIG.INFO_WA_ALT_DISPLAY}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>raassalamah2017@gmail.com</span>
                </li>
                <li className="pt-1 text-[11px] text-emerald-300">
                  Senin s.d. Jumat (pagi hari aktif)
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80 font-body">
            <p>© 2027 <strong>RA Assalaamah</strong> · Panitia PPDB Tahun Ajaran 2027/2028. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-emerald-300 hover:text-white transition font-medium">
                Portal Admin Panitia ↗
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING WHATSAPP / MASKOT HELPER (Pojok Kanan Bawah) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20konsultasi%20pendaftaran`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#1E6B49] hover:bg-[#165037] text-white font-heading font-bold text-sm px-5 py-3 rounded-full shadow-2xl border-2 border-white hover:scale-105 active:scale-95 transition-all"
          aria-label="Hubungi WhatsApp Panitia"
        >
          <MessageCircle className="w-5 h-5 text-[#FBBF24]" />
          <span>Tanya Info PPDB</span>
        </a>
      </div>

      {/* Floating Mobile Bottom Action */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FCFDF9]/95 backdrop-blur-md border-t border-[#1E6B49]/20 p-3 sm:hidden flex items-center gap-2.5 shadow-2xl">
        <a
          href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/3 flex items-center justify-center gap-1.5 bg-[#D1FAE5] text-[#1E6B49] border-2 border-[#1E6B49]/30 font-heading font-bold text-xs py-3 rounded-full"
        >
          <MessageCircle className="w-4 h-4 text-[#1E6B49]" />
          <span>Tanya WA</span>
        </a>
        <Link
          href="/daftar"
          className="w-2/3 flex items-center justify-center gap-2 btn-chunky-yellow text-sm py-3 shadow-[0_4px_0_#D97706]"
        >
          <Sparkles className="w-4 h-4 text-[#112F20]" />
          <span>DAFTAR PPDB</span>
        </Link>
      </div>
    </div>
  );
}
