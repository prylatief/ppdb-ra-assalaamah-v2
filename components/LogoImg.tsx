"use client";
import Image from "next/image";
import { useState } from "react";
import { PLACEHOLDER_LOGO } from "@/lib/config";

interface LogoImgProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export default function LogoImg({ className = "", size = 56, priority = false }: LogoImgProps) {
  const [src, setSrc] = useState("/logo-ra.jpg");
  return (
    <Image
      src={src}
      alt="Logo RA Assalaamah"
      width={size}
      height={size}
      className={className}
      priority={priority}
      onError={() => setSrc(PLACEHOLDER_LOGO)}
      unoptimized={src.startsWith("data:")}
    />
  );
}
