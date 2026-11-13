"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import LogoImg from "@/components/LogoImg";
import PpdbForm from "@/components/PpdbForm";
import { CONFIG } from "@/lib/config";

export default function DaftarPage() {
  return (
    <div className="min-h-screen bg-[#FCFDF9] text-[#112F20] flex flex-col font-body selection:bg-[#FDE68A] selection:text-[#112F20]">
      {/* Top Header Khusus Pendaftaran */}
      <header className="sticky top-0 z-40 bg-[#FCFDF9]/95 backdrop-blur-md border-b border-[#1E6B49]/15 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-bold text-[#1E6B49] hover:text-[#165037] bg-[#D1FAE5]/60 hover:bg-[#D1FAE5] px-3.5 py-2 rounded-full border border-[#1E6B49]/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white p-1 shadow-xs border-2 border-[#1E6B49]/30 flex items-center justify-center shrink-0">
              <LogoImg size={34} className="w-full h-full object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-sm text-[#1E6B49] leading-tight">
                RA ASSALAAMAH
              </span>
              <span className="text-[11px] text-[#112F20]/70 font-medium">
                PPDB TA 2027/2028
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Intro Banner */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border-2 border-[#FBBF24]/60 text-[#B45309] text-xs font-heading font-bold px-4 py-1.5 rounded-full shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Formulir Resmi Pendaftaran Siswa Baru TA 2027/2028</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-[#1E6B49] tracking-tight">
            Formulir Pendaftaran Siswa Baru
          </h1>

          <p className="font-body text-[#112F20]/75 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Silakan lengkapi 39 isian data ananda berikut sesuai Kartu Keluarga (KK) dan Akta Kelahiran.
            Isian tersimpan otomatis di perangkat ini, aman bila keluar sejenak.
          </p>

          {/* Quick Assurance Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs text-[#1E6B49] font-bold">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#1E6B49]/20 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#3CB371]" />
              Autosave Draft di HP
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#1E6B49]/20 shadow-2xs">
              <HeartHandshake className="w-4 h-4 text-[#3CB371]" />
              Tanpa Biaya Mengisi Form
            </span>
          </div>
        </div>

        {/* 39 Fields Form Component with Wizard / Show All */}
        <PpdbForm />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-[#112F20]/70 no-print">
        <p className="max-w-md mx-auto px-4">
          Butuh bantuan saat mengisi formulir? Hubungi WhatsApp Panitia:{" "}
          <strong className="text-[#1E6B49] font-bold">{CONFIG.ADMIN_WA_DISPLAY}</strong>
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          © 2027 RA Assalaamah Jakarta Timur · Formulir PPDB Online Resmi
        </p>
      </footer>
    </div>
  );
}
