"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, X, ArrowRight, Heart } from "lucide-react";
import { CONFIG, formatWAForLink } from "@/lib/config";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Munculkan popup sambutan setelah 1.5 detik kunjungan pertama (atau per sesi)
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("ra_welcome_dismissed");
      if (!dismissed && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("ra_welcome_dismissed", "true");
    } catch {
      // noop
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Sambutan PPDB RA Assalaamah"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative max-w-md w-full bg-[#FCFDF9] rounded-3xl border-4 border-[#1E6B49] shadow-[0_10px_0_#1E6B49] p-6 sm:p-7 text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup X */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Maskot Icon Kecil / Animasi Bintang */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#D1FAE5] border-2 border-[#1E6B49]/30 flex items-center justify-center text-3xl shadow-inner animate-bounce">
              🧒🏻👧🏻
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#B45309] text-[11px] font-heading font-bold px-3 py-1 rounded-full border border-[#FBBF24]/50 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Ahlan wa Sahlan, Ayah &amp; Bunda!</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1E6B49] leading-tight mb-2">
              PPDB RA Assalaamah <br />
              <span className="text-[#112F20]">Tahun Ajaran 2027/2028</span>
            </h3>

            <p className="font-body text-xs sm:text-sm text-[#112F20]/80 leading-relaxed mb-6 font-medium">
              Alhamdulillah pendaftaran telah dibuka! Mari daftarkan putra-putri tercinta untuk tumbuh ceria, berakhlak mulia, dan cinta Al-Qur&apos;an bersama kami.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href="/daftar"
                onClick={handleClose}
                className="w-full btn-chunky-yellow text-sm sm:text-base py-3.5 shadow-[0_4px_0_#D97706] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#112F20]" />
                <span>✍️ Buka Formulir Pendaftaran</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={`https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=Assalamu%27alaikum%20Panitia%20PPDB%20RA%20Assalaamah%2C%20saya%20ingin%20konsultasi`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full btn-chunky-green text-xs sm:text-sm py-3 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#1E6B49]" />
                <span>💬 Tanya Info via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-[11px] text-[#112F20]/60 font-medium">
              <span>Dibuat dengan</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>untuk pendidikan anak sholeh/sholehah</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
