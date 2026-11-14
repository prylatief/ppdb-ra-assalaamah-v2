"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FIELD_GROUPS,
  CONFIG,
  escapeHtml,
  fieldValue,
  buildWhatsAppMessage,
  formatWAForLink,
  PLACEHOLDER_LOGO,
  type RegistrationData,
} from "@/lib/config";

interface ReceiptModalProps {
  data: RegistrationData | null;
  showWA: boolean;
  onClose: () => void;
}

function renderReceiptGroup(group: (typeof FIELD_GROUPS)[0], d: RegistrationData): string {
  const rows = group.fields
    .map((fl) => {
      const cls = [fl.mono ? "font-mono" : "", fl.bold ? "font-bold" : ""].join(" ").trim();
      return `<tr>
        <td class="text-slate-600 w-36 align-top">${fl.no}. ${escapeHtml(fl.label)}</td>
        <td class="${cls}">: ${escapeHtml(fieldValue(d, fl))}</td>
      </tr>`;
    })
    .join("");
  return `<div class="receipt-card border border-slate-300 rounded-lg p-3">
    <h4 class="font-extrabold text-ra-800 border-b border-slate-300 pb-1 mb-2 uppercase text-[11px]" style="color:#0a3b1e">${group.letter}. ${escapeHtml(group.title)}</h4>
    <table class="w-full leading-relaxed">${rows}</table>
  </div>`;
}

export default function ReceiptModal({ data, showWA, onClose }: ReceiptModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!data) return;
    document.body.classList.add("receipt-open");
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("receipt-open");
      document.removeEventListener("keydown", handler);
    };
  }, [data, onClose]);

  if (!data || !mounted) return null;

  function handleSendWA() {
    if (!data) return;
    const url = `https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
    window.open(url, "_blank");
  }

  const parentSign = data.namaAyah || data.namaIbu || "Wali Murid";
  const bodyHTML = `<div class="receipt-grid grid grid-cols-1 gap-3.5" style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
    ${FIELD_GROUPS.map((g) => renderReceiptGroup(g, data)).join("")}
  </div>`;

  const modalJSX = (
    <div
      id="receiptModal"
      ref={modalRef}
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-6 overflow-y-auto"
      onClick={(e) => { if (e.target === modalRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Bukti Pendaftaran"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header toolbar */}
        <div className="bg-slate-800 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 no-print">
          <div className="text-xs font-bold text-emerald-400">✅ Bukti Pendaftaran Resmi RA Assalaamah</div>
          <div className="flex flex-wrap items-center gap-2">
            {showWA && (
              <button
                onClick={handleSendWA}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
                aria-label="Kirim bukti ke WhatsApp panitia"
              >
                📲 Kirim ke WA Panitia
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
              aria-label="Cetak atau simpan PDF"
            >
              🖨️ Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition"
              aria-label="Tutup bukti pendaftaran"
            >
              ✕ Tutup
            </button>
          </div>
        </div>

        {/* Print area */}
        <div id="printArea" className="p-6 md:p-10 overflow-y-auto bg-white text-slate-900">
          {/* Kop surat */}
          <div className="kop-border pb-3 mb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="w-24 h-24 shrink-0 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-ra.jpg"
                  alt="Logo RA Assalaamah"
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_LOGO; }}
                />
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs md:text-sm font-bold tracking-widest uppercase" style={{ color: "#0f532b" }}>
                  Panitia Penerimaan Peserta Didik Baru (PPDB)
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase mt-0.5" style={{ color: "#0a3b1e" }}>
                  Raudhatul Athfal (RA) Assalaamah
                </h2>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">TAHUN AJARAN 2027 / 2028</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Layanan Informasi &amp; Konfirmasi PPDB (WhatsApp):{" "}
                  <strong>{CONFIG.ADMIN_WA_DISPLAY}</strong>
                </p>
              </div>
              <div className="w-28 shrink-0 text-center border-2 rounded-xl p-2" style={{ borderColor: "#0f532b", background: "#eefbf3" }}>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">No. Registrasi</span>
                <span className="text-xs font-extrabold block mt-0.5 break-all" style={{ color: "#0a3b1e" }}>
                  {data.regNumber || "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-sm font-extrabold uppercase underline tracking-wide text-slate-800">
              Bukti Formulir Pendaftaran Calon Peserta Didik Baru
            </h3>
          </div>

          {/* Konten grup data */}
          <div
            id="receiptContentBody"
            className="space-y-4 text-xs"
            dangerouslySetInnerHTML={{ __html: bodyHTML }}
          />

          {/* Footer bukti */}
          <div className="mt-6 pt-4 border-t border-slate-300 grid grid-cols-2 gap-4 text-xs text-slate-700">
            <div>
              <p className="font-semibold">Tanggal Pendaftaran: {data.createdAt || "-"}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                * Harap simpan bukti pendaftaran ini dan konfirmasikan ke WhatsApp Panitia PPDB RA Assalaamah ({CONFIG.ADMIN_WA_DISPLAY}).
              </p>
            </div>
            <div className="text-center">
              <p>Orang Tua / Calon Wali Murid,</p>
              <div className="h-14" />
              <p className="font-bold underline">( {parentSign} )</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
}
