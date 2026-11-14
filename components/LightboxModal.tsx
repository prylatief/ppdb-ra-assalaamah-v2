"use client";
import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  src: string;
  title: string;
  tag?: string;
  desc?: string;
}

interface LightboxModalProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          {/* Top Bar with Counter & Close Button */}
          <div className="absolute top-3 sm:top-5 inset-x-3 sm:inset-x-6 flex items-center justify-between text-white z-20 pointer-events-none">
            <div className="pointer-events-auto bg-black/60 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-heading font-bold text-white shadow-md">
              Foto {currentIndex + 1} dari {items.length}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="pointer-events-auto flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white p-2 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-md"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">Tutup</span>
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/25 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-90 shadow-lg"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/25 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-90 shadow-lg"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Main Photo Card */}
          <motion.div
            key={currentItem.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white/30 shadow-2xl bg-black/50 max-h-[64vh] sm:max-h-[72vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="max-h-[64vh] sm:max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption Card Beneath */}
            <div className="mt-3 sm:mt-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 max-w-lg w-full text-center shadow-xl border border-white/50 space-y-1">
              {currentItem.tag && (
                <span className="inline-block bg-[#D1FAE5] text-[#1E6B49] text-[10px] sm:text-xs font-heading font-bold px-3 py-0.5 rounded-full border border-[#1E6B49]/20 mb-1">
                  {currentItem.tag}
                </span>
              )}
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#112F20] leading-tight">
                {currentItem.title}
              </h3>
              {currentItem.desc && (
                <p className="font-body text-xs sm:text-sm text-[#112F20]/75 leading-relaxed font-medium">
                  {currentItem.desc}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
