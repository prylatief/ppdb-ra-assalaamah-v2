// lib/motion.ts - Arc UI motion tokens & spring presets
// Berdasarkan spesifikasi Arc UI (https://uiarc.dev/)

export const motionTokens = {
  spring: {
    // Digunakan untuk morphing highlights / gliding pills antar tab
    morph: { type: "spring", stiffness: 400, damping: 30 } as const,
    // Digunakan untuk pembukaan panel, card expand, dan accordion
    smooth: { type: "spring", stiffness: 300, damping: 28 } as const,
    // Digunakan untuk tombol tap, toggle icon, chevron rotation
    snappy: { type: "spring", stiffness: 500, damping: 35 } as const,
    // Bouncy spring untuk badge pop-in
    bouncy: { type: "spring", stiffness: 450, damping: 22 } as const,
  },
  duration: {
    instant: 0.1,
    fast: 0.18,
    standard: 0.28,
    relaxed: 0.45,
  },
  ease: {
    standard: [0.2, 0, 0, 1] as const,
    enter: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
};
