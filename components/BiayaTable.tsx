"use client";
import { useState } from "react";
import { BIAYA, biayaTotal, rp } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";

export default function BiayaTable() {
  const [kelas, setKelas] = useState<"A" | "B">("A");
  const b = BIAYA[kelas];
  let no = 0;

  return (
    <div>
      {/* Tab Kelas A & B */}
      <div className="grid grid-cols-2 gap-3 mb-5" role="tablist">
        {(["A", "B"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kelas === k}
            onClick={() => setKelas(k)}
            className={`step-tab justify-center font-bold text-sm sm:text-base py-3 transition-all ${
              kelas === k ? "step-active ring-2 ring-amber-400" : "bg-white hover:bg-slate-50"
            }`}
          >
            <span>Kelas {k}</span>
            <span className="text-xs font-normal opacity-85 ml-1">
              {k === "A" ? "(usia 4–5 th)" : "(usia 5–6 th)"}
            </span>
          </button>
        ))}
      </div>

      {/* Tabel Rincian */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs" id={`biayaTable${kelas}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider font-bold">
              <th className="py-3 px-3 text-left w-12">No</th>
              <th className="py-3 px-3 text-left">Uraian Komponen</th>
              <th className="py-3 px-3 text-right">Biaya</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {b.rows.map(([label, v]) => {
              no++;
              if (v !== "kegiatan") {
                return (
                  <tr key={label} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 text-slate-400 font-semibold align-top">{no}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{label}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap font-bold text-slate-900">{rp(v)}</td>
                  </tr>
                );
              }
              const kegTotal = b.kegiatan.reduce((s, [, x]) => s + x, 0);
              return (
                <tr key={label} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 text-slate-400 font-semibold align-top">{no}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-blue-900">{label}</div>
                    <ul className="mt-2 ml-1 pl-3 border-l-2 border-emerald-400 text-xs text-slate-600 space-y-1">
                      {b.kegiatan.map(([l, x], i) => (
                        <li key={l} className="flex justify-between gap-4 py-0.5">
                          <span className="flex items-center gap-1.5">
                            <span className="text-emerald-600 font-bold">{String.fromCharCode(97 + i)}.</span>
                            <span>{l}</span>
                          </span>
                          <span className="whitespace-nowrap font-semibold text-slate-700">{rp(x)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap font-bold text-blue-900 align-top">
                    {rp(kegTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-50 text-emerald-950 font-extrabold border-t-2 border-emerald-500">
              <td colSpan={2} className="py-3.5 px-3 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>TOTAL BIAYA (Kelas {kelas})</span>
                </div>
              </td>
              <td
                id={`biayaTotal${kelas}`}
                className="py-3.5 px-3 text-right whitespace-nowrap text-base sm:text-lg text-emerald-800 font-extrabold"
                data-total={biayaTotal(kelas)}
              >
                {rp(biayaTotal(kelas))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
