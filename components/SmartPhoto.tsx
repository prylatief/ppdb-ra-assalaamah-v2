"use client";
import { useState } from "react";

interface SmartPhotoProps {
  baseName: string; // e.g. "hero-student"
  alt: string;
  className?: string;
  aspect?: string;
}

export default function SmartPhoto({ baseName, alt, className = "", aspect = "aspect-4/3" }: SmartPhotoProps) {
  // First try .jpg, then fallback to .svg
  const [src, setSrc] = useState(`/images/${baseName}.jpg`);
  const [failedOnce, setFailedOnce] = useState(false);

  return (
    <div className={`overflow-hidden relative ${aspect} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={() => {
          if (!failedOnce) {
            setFailedOnce(true);
            setSrc(`/images/${baseName}.svg`);
          }
        }}
      />
    </div>
  );
}
