"use client";
import React, { useState } from "react";
import Image from "next/image";

interface MarqueePhotoItem {
  src: string;
  title: string;
  tag: string;
  desc: string;
  tagBg: string;
  tagText: string;
  borderColor: string;
}

const MARQUEE_ROW_1: MarqueePhotoItem[] = [
  {
    src: "/images/activity-1.jpg",
    title: "Mengaji Tilawati",
    tag: "📖 Tilawati",
    desc: "Bimbingan baca Al-Qur'an lagu tilawati di karpet kelas",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#1E6B49]",
  },
  {
    src: "/images/activity-2.jpg",
    title: "Sholat Berjamaah",
    tag: "🤲 Ibadah",
    desc: "Latihan sholat dhuha & wudhu tertib di serambi sekolah",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Juara Manasik Haji",
    tag: "🏆 Prestasi",
    desc: "Piala penghargaan peragaan manasik haji anak",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#3CB371]",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Karnaval Cita-Cita",
    tag: "👨‍✈️ Pentas Seni",
    desc: "Mengenal aneka profesi dokter, pilot & tentara",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
  {
    src: "/images/activity-3.jpg",
    title: "Mewarnai Pola Batik",
    tag: "🎨 Kreasi Seni",
    desc: "Melatih motorik halus & imajinasi warna ananda",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#1E6B49]",
  },
  {
    src: "/images/gallery-1.jpg",
    title: "Sentra Balok Ceria",
    tag: "🧱 Sentra Kelas",
    desc: "Eksplorasi susun balok & kerja sama tim",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
];

const MARQUEE_ROW_2: MarqueePhotoItem[] = [
  {
    src: "/images/activity-4.jpg",
    title: "Wahana Jaring Tali",
    tag: "🧗 Ketangkasan",
    desc: "Melatih keberanian & fisik di area luar ruangan",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#1E6B49]",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Ketangkasan Bola",
    tag: "⚽ Motorik",
    desc: "Permainan menyusun bola warna ceria di lapangan",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
  {
    src: "/images/gallery-5.jpg",
    title: "Wisata Edukasi Alam",
    tag: "🌿 Berkebun",
    desc: "Belajar panen sayuran & cinta ciptaan Allah",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#3CB371]",
  },
  {
    src: "/images/gallery-7.jpg",
    title: "Sholat di Panggung",
    tag: "🤲 Pembiasaan",
    desc: "Seragam muslim putih & mukena khusyuk berjamaah",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
  {
    src: "/images/gallery-8.jpg",
    title: "Eksplorasi Tepi Kolam",
    tag: "🐟 Sains Alam",
    desc: "Mengenal ikan & lingkungan alam sekitar madrasah",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#1E6B49]",
    borderColor: "border-[#1E6B49]",
  },
  {
    src: "/images/gallery-6.jpg",
    title: "Dewan Guru & Asatidz",
    tag: "🧕 Pendidik",
    desc: "Penuh kehangatan membina akidah & akhlak ananda",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#B45309]",
    borderColor: "border-[#FBBF24]",
  },
];

function MarqueeCard({ item }: { item: MarqueePhotoItem }) {
  return (
    <div
      className={`shrink-0 w-64 sm:w-76 bg-white rounded-3xl overflow-hidden border-[3px] ${item.borderColor} shadow-[0_4px_0_rgba(17,47,32,0.12)] hover:-translate-y-1 transition-all select-none`}
    >
      {/* Photo Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Tag Pill di Atas Foto */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`inline-block ${item.tagBg} ${item.tagText} text-[10px] sm:text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full border border-black/10 shadow-xs`}
          >
            {item.tag}
          </span>
        </div>
      </div>

      {/* Clean Caption di Bawah Foto (Sangat Jelas di HP, Gak Menutupi Wajah Anak) */}
      <div className="p-3.5 space-y-1">
        <h4 className="font-heading font-bold text-sm sm:text-base text-[#112F20] leading-snug truncate">
          {item.title}
        </h4>
        <p className="font-body text-[11px] sm:text-xs text-[#112F20]/75 leading-relaxed line-clamp-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function PhotoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full overflow-hidden py-4 space-y-4 sm:space-y-6 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Gradient Fade Edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FEF3C7] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FEF3C7] to-transparent z-10" />

      {/* Row 1: Leftward moving */}
      <div className="flex gap-4 sm:gap-5 overflow-hidden">
        <div
          className={`flex gap-4 sm:gap-5 animate-marquee shrink-0 ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {MARQUEE_ROW_1.map((item, idx) => (
            <MarqueeCard key={`row1-a-${idx}`} item={item} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className={`flex gap-4 sm:gap-5 animate-marquee shrink-0 ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {MARQUEE_ROW_1.map((item, idx) => (
            <MarqueeCard key={`row1-b-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Rightward moving */}
      <div className="flex gap-4 sm:gap-5 overflow-hidden">
        <div
          className={`flex gap-4 sm:gap-5 animate-marquee-reverse shrink-0 ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {MARQUEE_ROW_2.map((item, idx) => (
            <MarqueeCard key={`row2-a-${idx}`} item={item} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className={`flex gap-4 sm:gap-5 animate-marquee-reverse shrink-0 ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {MARQUEE_ROW_2.map((item, idx) => (
            <MarqueeCard key={`row2-b-${idx}`} item={item} />
          ))}
        </div>
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] sm:text-xs text-[#112F20]/60 font-body font-medium">
          💡 <em>Ketuk / sentuh foto untuk menahan gerakan</em>
        </p>
      </div>
    </div>
  );
}
