"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import LogoImg from "./LogoImg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Profil", href: "#profil" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Program", href: "#program" },
    { label: "Biaya & Jadwal", href: "#biaya" },
    { label: "Alur PPDB", href: "#alur" },
    { label: "Galeri", href: "#galeri" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FCFDF9]/95 backdrop-blur-md border-b border-[#1E6B49]/15 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 pr-1 sm:pr-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-1 shadow-sm border-2 border-[#1E6B49]/30 flex items-center justify-center shrink-0 ring-2 ring-[#FBBF24]/50 group-hover:ring-[#F59E0B] transition">
              <LogoImg size={40} className="w-full h-full object-contain" priority />
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#1E6B49] leading-tight">
                Raudhatul Athfal
              </span>
              <div className="font-heading text-base sm:text-2xl font-bold tracking-wide leading-tight group-hover:scale-[1.01] transition-transform">
                <span className="text-[#1E6B49]">RA </span>
                <span className="text-[#FBBF24]">ASSALAAMAH</span>
              </div>
              <span className="hidden sm:block text-[10px] sm:text-[11px] text-[#112F20]/70 font-medium leading-tight">
                Cakung, Jakarta Timur · TA 2027/2028
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 font-body font-semibold text-sm text-[#112F20]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1E6B49] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-[#112F20]/60 hover:text-[#1E6B49] px-2 py-1 transition"
            >
              Admin
            </Link>
            <a
              href="#formulir"
              className="btn-chunky-yellow text-xs sm:text-sm px-5 py-2.5 tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-[#112F20] mr-1.5 animate-pulse" />
              <span>DAFTAR PPDB</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden gap-2">
            <a
              href="#formulir"
              className="btn-chunky-yellow text-xs px-3.5 py-2"
            >
              Daftar
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#112F20] hover:bg-emerald-50 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden border-t border-[#1E6B49]/10 bg-[#FCFDF9] px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold text-[#112F20] hover:text-[#1E6B49] hover:bg-emerald-50/60 rounded-xl px-3 transition"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-2">
            <a
              href="#formulir"
              onClick={() => setIsOpen(false)}
              className="w-full text-center btn-chunky-yellow text-sm py-2.5"
            >
              ✍️ DAFTAR PPDB SEKARANG
            </a>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-center text-xs font-semibold text-[#112F20]/60 py-1"
            >
              Portal Panitia (Admin) →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
