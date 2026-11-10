"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import LogoImg from "./LogoImg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Program", href: "#program" },
    { label: "Biaya & Jadwal", href: "#biaya" },
    { label: "Alur PPDB", href: "#alur" },
    { label: "Galeri", href: "#galeri" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md border border-emerald-100 flex items-center justify-center shrink-0 ring-2 ring-emerald-500/30 group-hover:ring-amber-400 transition">
              <LogoImg size={42} className="w-full h-full object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                Raudhatul Athfal
              </span>
              <span className="text-base sm:text-lg font-extrabold text-blue-900 tracking-tight leading-none group-hover:text-emerald-600 transition">
                ASSALAAMAH
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Jakarta Timur · TA 2027/2028
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-500 hover:text-blue-900 px-2 py-1 transition"
            >
              Admin
            </Link>
            <a
              href="#formulir"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>PPDB Dibuka</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden gap-2">
            <a
              href="#formulir"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold px-3 py-2 rounded-full shadow-sm"
            >
              Daftar
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg px-3 transition"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#formulir"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-2.5 rounded-xl shadow-md"
            >
              ✍️ Isi Formulir PPDB
            </a>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-center text-xs font-semibold text-slate-500 py-1"
            >
              Dashboard Panitia (Admin) →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
