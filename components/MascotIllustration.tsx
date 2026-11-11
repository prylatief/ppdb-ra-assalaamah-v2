"use client";
import React from "react";

export default function MascotIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Maskot Siswa dan Siswi RA Assalaamah Ceria"
    >
      <defs>
        {/* Soft shadow below characters */}
        <ellipse id="shadow" cx="200" cy="335" rx="160" ry="18" fill="#112F20" fillOpacity="0.1" />
        
        {/* Gradients */}
        <linearGradient id="uniformGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25855A" />
          <stop offset="100%" stopColor="#1E6B49" />
        </linearGradient>
        <linearGradient id="accentYellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <use href="#shadow" />

      {/* ===================== BOY (Kiri: Fatih) ===================== */}
      <g id="boy-character">
        {/* Body & Uniform */}
        <path d="M90 230 L160 230 L170 320 L80 320 Z" fill="#1E6B49" />
        {/* White Collar & Tie/Vest Accent */}
        <path d="M100 230 L125 270 L150 230 Z" fill="#FEF3C7" />
        <path d="M120 235 L130 235 L128 290 L122 290 Z" fill="#FBBF24" />
        <circle cx="125" cy="275" r="4" fill="#1E6B49" />
        
        {/* Arms & Hands (Waving Right Hand) */}
        {/* Left arm */}
        <path d="M90 240 Q70 270 78 295" stroke="#1E6B49" strokeWidth="18" strokeLinecap="round" />
        <circle cx="78" cy="298" r="9" fill="url(#skinTone)" />
        {/* Right arm waving up */}
        <path d="M158 240 Q180 210 185 180" stroke="#1E6B49" strokeWidth="18" strokeLinecap="round" />
        <circle cx="187" cy="175" r="10" fill="url(#skinTone)" />

        {/* Shoes */}
        <ellipse cx="102" cy="324" rx="16" ry="9" fill="#112F20" />
        <ellipse cx="148" cy="324" rx="16" ry="9" fill="#112F20" />

        {/* Head */}
        <circle cx="125" cy="165" r="44" fill="url(#skinTone)" />

        {/* Ears */}
        <circle cx="80" cy="168" r="9" fill="url(#skinTone)" />
        <circle cx="170" cy="168" r="9" fill="url(#skinTone)" />

        {/* Cheerful Face */}
        {/* Eyes (happy crescents) */}
        <path d="M105 160 Q113 150 121 160" stroke="#112F20" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M129 160 Q137 150 145 160" stroke="#112F20" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="104" cy="172" r="7" fill="#FF8A80" fillOpacity="0.5" />
        <circle cx="146" cy="172" r="7" fill="#FF8A80" fillOpacity="0.5" />
        {/* Big Smile */}
        <path d="M114 175 Q125 192 136 175" stroke="#112F20" strokeWidth="3" fill="#D32F2F" strokeLinecap="round" />

        {/* Peci / Songkok Hitam Bergaris Kuning */}
        <path d="M84 145 C84 115 166 115 166 145 Z" fill="#112F20" />
        <path d="M84 142 L166 142" stroke="#FBBF24" strokeWidth="4" />
      </g>


      {/* ===================== GIRL (Kanan: Aisyah) ===================== */}
      <g id="girl-character">
        {/* Hijab Base / Back */}
        <ellipse cx="275" cy="175" rx="58" ry="68" fill="#1E6B49" />

        {/* Dress / Gamis Sekolah Hijau-Kuning */}
        <path d="M230 235 L320 235 L335 320 L215 320 Z" fill="url(#uniformGreen)" />
        {/* Yellow Trim on Hem & Waist */}
        <path d="M214 316 L336 316 L335 322 L215 322 Z" fill="#FBBF24" />
        <rect x="250" y="248" width="50" height="70" rx="4" fill="#FEF3C7" />
        <circle cx="275" cy="265" r="4" fill="#FBBF24" />
        <circle cx="275" cy="285" r="4" fill="#FBBF24" />

        {/* Shoes */}
        <ellipse cx="245" cy="324" rx="15" ry="9" fill="#112F20" />
        <ellipse cx="305" cy="324" rx="15" ry="9" fill="#112F20" />

        {/* Hijab Front Frame */}
        <path d="M230 160 C230 115, 320 115, 320 160 C320 215, 230 215, 230 160 Z" fill="#1E6B49" />
        {/* Hijab Inner White Cap */}
        <path d="M242 145 C242 125, 308 125, 308 145 Z" fill="#FEF3C7" />

        {/* Face Oval */}
        <ellipse cx="275" cy="165" rx="38" ry="40" fill="url(#skinTone)" />

        {/* Cheerful Face */}
        {/* Sparkly Eyes */}
        <ellipse cx="260" cy="162" rx="4" ry="6" fill="#112F20" />
        <circle cx="258.5" cy="160" r="1.5" fill="#FFFFFF" />
        <ellipse cx="290" cy="162" rx="4" ry="6" fill="#112F20" />
        <circle cx="288.5" cy="160" r="1.5" fill="#FFFFFF" />
        {/* Eyelashes */}
        <path d="M254 156 L250 152 M266 156 L270 152" stroke="#112F20" strokeWidth="2" strokeLinecap="round" />
        <path d="M284 156 L280 152 M296 156 L300 152" stroke="#112F20" strokeWidth="2" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="251" cy="173" r="7" fill="#FF8A80" fillOpacity="0.55" />
        <circle cx="299" cy="173" r="7" fill="#FF8A80" fillOpacity="0.55" />
        {/* Sweet Smile */}
        <path d="M265 176 Q275 192 285 176" stroke="#112F20" strokeWidth="3" fill="#D32F2F" strokeLinecap="round" />

        {/* Hijab Ribbon / Brooch */}
        <circle cx="275" cy="216" r="8" fill="#FBBF24" />
        <circle cx="275" cy="216" r="4" fill="#FFFFFF" />

        {/* Arms & Hands (Left Hand holding Book, Right Hand Waving) */}
        {/* Left hand holding mini book */}
        <path d="M230 240 Q215 270 225 285" stroke="#1E6B49" strokeWidth="16" strokeLinecap="round" />
        <rect x="202" y="270" width="22" height="28" rx="3" fill="#FBBF24" transform="rotate(-15 202 270)" />
        <circle cx="223" cy="286" r="7" fill="url(#skinTone)" />
        {/* Right hand waving */}
        <path d="M320 240 Q345 220 348 195" stroke="#1E6B49" strokeWidth="16" strokeLinecap="round" />
        <circle cx="349" cy="190" r="8" fill="url(#skinTone)" />
      </g>
    </svg>
  );
}
