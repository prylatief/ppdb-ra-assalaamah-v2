"use client";
import { useState } from "react";
import { BIAYA, biayaTotal, rp } from "@/lib/config";

export default function BiayaTable() {
  const [kelas, setKelas] = useState<"A" | "B">("A");
  const b = BIAYA[kelas];
  let no = 0;

  return (
    <div>
      {/* Tab */}
      <div className="grid grid-cols-2 gap-2 mb-4" role="tablist">
        {(["A", "B"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kelas === k}
            onClick={() => setKelas(k)}
            className={`step-tab justify-center font-bold text-sm${kelas === k ? " step-active" : ""}`}
          >
            Kelas {k}{" "}
            <span className="text-[11px] font-normal opacity-80">
              {k === "A" ? "(usia 4–5 th)" : "(usia 5–6 th)"}
            </span>
          </button>
        ))}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto" id={`biayaTable${kelas}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wider">
              <th className="py-2 pr-2 text-left w-8">No</th>
              <th className="py-2 pr-2 text-left">Uraian</th>
              <th className="py-2 text-right">Total Biaya</th>
            </tr>
          </thead>
          <tbody>
            {b.rows.map(([label, v]) => {
              no++;
              if (v !== "kegiatan") {
                return (
                  <tr key={label} className="border-b border-slate-200">
                    <td className="py-2 pr-2 text-slate-500 align-top">{no}</td>
                    <td className="py-2 pr-2">{label}</td>
                    <td className="py-2 text-right whitespace-nowrap font-semibold">{rp(v)}</td>
                  </tr>
                );
              }
              const kegTotal = b.kegiatan.reduce((s, [, x]) => s + x, 0);
              return (
                <tr key={label} className="border-b border-slate-200">
                  <td className="py-2 pr-2 text-slate-500 align-top">{no}</td>
                  <td className="py-2 pr-2">
                    {label}
                    <ul className="mt-1 ml-2 pl-3 border-l-2 border-ra-100 text-xs text-slate-600 space-y-0.5">
                      {b.kegiatan.map(([l, x], i) => (
                        <li key={l} className="flex justify-between gap-3">
                          <span>{String.fromCharCode(97 + i)}. {l}</span>
                          <span className="whitespace-nowrap">{rp(x)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 text-right whitespace-nowrap font-semibold align-top">{rp(kegTotal)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: "#eefbf3", color: "#0a3b1e" }} className="font-extrabold">
              <td colSpan={2} className="py-2.5 px-2">JUMLAH (Kelas {kelas})</td>
              <td
                id={`biayaTotal${kelas}`}
                className="py-2.5 text-right whitespace-nowrap"
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
