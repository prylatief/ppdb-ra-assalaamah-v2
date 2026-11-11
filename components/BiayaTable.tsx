"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BIAYA, biayaTotal, rp } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";
import { motionTokens } from "@/lib/motion";

export default function BiayaTable() {
  const [kelas, setKelas] = useState<"A" | "B">("A");
  const b = BIAYA[kelas];
  const shouldReduceMotion = useReducedMotion();
  let no = 0;

  return (
    <div className="w-full">
      {/* Arc UI Segmented Tabs with Gliding Pill */}
      <div className="flex justify-center mb-6">
        <div
          role="tablist"
          className="relative inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-xs w-full max-w-md"
        >
          {(["A", "B"] as const).map((k) => {
            const isActive = kelas === k;
            return (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setKelas(k)}
                className={`relative z-10 flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-200 ${
                  isActive ? "text-blue-950 font-extrabold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {/* Arc UI Gliding Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="biaya-active-pill"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : motionTokens.spring.morph
                    }
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/90 ring-1 ring-slate-950/5 z-0"
                  />
                )}
                <span className="relative z-10">Kelas {k}</span>
                <span
                  className={`relative z-10 text-xs font-normal transition-opacity ${
                    isActive ? "text-emerald-700 font-semibold" : "opacity-60"
                  }`}
                >
                  {k === "A" ? "(4–5 th)" : "(5–6 th)"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabel Rincian dengan Animasi Arc Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={kelas}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : motionTokens.spring.smooth}
          className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white"
          id={`biayaTable${kelas}`}
        >
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 text-[11px] sm:text-xs uppercase tracking-wider font-extrabold">
                <th className="py-3 px-2 sm:px-4 text-center sm:text-left w-8 sm:w-12">No</th>
                <th className="py-3 px-2 sm:px-4 text-left">Uraian Komponen</th>
                <th className="py-3 px-2 sm:px-4 text-right">Biaya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {b.rows.map(([label, v]) => {
                no++;
                if (v !== "kegiatan") {
                  return (
                    <tr key={label} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-slate-400 font-semibold align-top text-center sm:text-left">{no}</td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 font-medium text-slate-800">{label}</td>
                      <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-right whitespace-nowrap font-bold text-slate-900">{rp(v)}</td>
                    </tr>
                  );
                }
                const kegTotal = b.kegiatan.reduce((s, [, x]) => s + x, 0);
                return (
                  <tr key={label} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-slate-400 font-semibold align-top text-center sm:text-left">{no}</td>
                    <td className="py-2.5 sm:py-3 px-2 sm:px-4">
                      <div className="font-bold text-blue-900">{label}</div>
                      <ul className="mt-2 ml-0.5 sm:ml-1 pl-2 sm:pl-3.5 border-l-2 border-emerald-400 text-[11px] sm:text-xs text-slate-600 space-y-1">
                        {b.kegiatan.map(([l, x], i) => (
                          <li key={l} className="flex justify-between gap-2 sm:gap-4 py-0.5">
                            <span className="flex items-center gap-1">
                              <span className="text-emerald-600 font-bold">{String.fromCharCode(97 + i)}.</span>
                              <span>{l}</span>
                            </span>
                            <span className="whitespace-nowrap font-semibold text-slate-700">{rp(x)}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-right whitespace-nowrap font-bold text-blue-900 align-top">
                      {rp(kegTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50/80 text-emerald-950 font-extrabold border-t-2 border-emerald-500">
                <td colSpan={2} className="py-3.5 px-2 sm:px-4 text-xs sm:text-base">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                    <span>TOTAL BIAYA (Kelas {kelas})</span>
                  </div>
                </td>
                <td
                  id={`biayaTotal${kelas}`}
                  className="py-3.5 px-2 sm:px-4 text-right whitespace-nowrap text-sm sm:text-lg text-emerald-800 font-black"
                  data-total={biayaTotal(kelas)}
                >
                  {rp(biayaTotal(kelas))}
                </td>
              </tr>
            </tfoot>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
