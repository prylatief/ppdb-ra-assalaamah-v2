"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FORM_STEPS,
  CONFIG,
  DRAFT_KEY,
  withDerivedFields,
  formatWAForLink,
  buildWhatsAppMessage,
  type RegistrationData,
} from "@/lib/config";
import { api } from "@/lib/api";
import ReceiptModal from "./ReceiptModal";

// ---- Upload helpers ----
const UPLOAD_FIELDS = ["aktaKelahiran", "kartuKeluarga"] as const;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

interface UploadItem {
  name: string;
  mimeType: string;
  dataBase64: string;
  previewUrl?: string | null;
  sizeStr?: string;
}

function describeSize(bytes: number) {
  return bytes >= 1024 * 1024 ? (bytes / (1024 * 1024)).toFixed(1) + " MB" : Math.round(bytes / 1024) + " KB";
}

function detectAndNormalizeFile(file: File): {
  isValid: boolean;
  normalizedMime: "image/jpeg" | "image/png" | "application/pdf" | "";
  isImage: boolean;
  isPdf: boolean;
  safeName: string;
} {
  const name = file.name || "berkas";
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const rawType = (file.type || "").toLowerCase();

  // PDF
  if (rawType === "application/pdf" || rawType === "application/x-pdf" || ext === "pdf") {
    return {
      isValid: true,
      normalizedMime: "application/pdf",
      isImage: false,
      isPdf: true,
      safeName: name.toLowerCase().endsWith(".pdf") ? name : `${name}.pdf`,
    };
  }

  // PNG
  if (rawType === "image/png" || ext === "png") {
    return {
      isValid: true,
      normalizedMime: "image/png",
      isImage: true,
      isPdf: false,
      safeName: name.toLowerCase().endsWith(".png") ? name : `${name}.png`,
    };
  }

  // JPEG / JPG / HEIC / HEIF / WEBP / any other mobile camera format
  if (
    rawType.startsWith("image/") ||
    ["jpg", "jpeg", "heic", "heif", "webp", "bmp"].includes(ext)
  ) {
    const base = name.replace(/\.[^/.]+$/, "");
    return {
      isValid: true,
      normalizedMime: "image/jpeg",
      isImage: true,
      isPdf: false,
      safeName: `${base}.jpg`,
    };
  }

  return {
    isValid: false,
    normalizedMime: "",
    isImage: false,
    isPdf: false,
    safeName: name,
  };
}

// Mengompres foto secara aman di browser client:
// Foto kamera HP (3-8MB) dikecilkan ke maks 1600px dengan kualitas JPEG 0.82
// Menghasilkan ukuran ~150KB-300KB yang tajam & ringan diunggah ke Google Apps Script tanpa timeout.
function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxDim = 1600;
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;
      if (width > maxDim || height > maxDim) {
        const scale = maxDim / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas tidak tersedia"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Gagal mengompres gambar"));
        },
        "image/jpeg",
        0.82
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Foto tidak dapat dibaca. Mohon gunakan format JPG atau PNG."));
    };
    img.src = url;
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = String(reader.result || "");
      const base64 = res.split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Gagal membaca berkas."));
    reader.readAsDataURL(blob);
  });
}

// ---- Field renderer ----
function optionTags(f: (typeof FORM_STEPS)[0]["fields"][0]): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  if (f.blank) nodes.push(<option key="" value="">{f.blank}</option>);
  (f.options ?? []).forEach((o) => {
    const [val, label] = Array.isArray(o) ? o : [o, o];
    nodes.push(<option key={val} value={val}>{label}</option>);
  });
  return nodes;
}

interface FieldProps {
  f: (typeof FORM_STEPS)[0]["fields"][0];
  cols: 2 | 3;
  onCopyAddress: (key: string) => void;
  onDigitInput: (key: string, val: string) => void;
  digitCounts: Record<string, number>;
  formRef: React.RefObject<HTMLFormElement | null>;
}

function FieldControl({ f, cols, onCopyAddress, onDigitInput, digitCounts, formRef }: FieldProps) {
  const spanCls = f.span === "full" ? (cols === 3 ? "md:col-span-3" : "md:col-span-2") : "";
  const id = `f_${f.key}`;

  let control: React.ReactNode;
  const commonProps = { name: f.key, id, required: true };

  switch (f.type) {
    case "select":
      control = (
        <select {...commonProps} defaultValue={f.def ?? (f.blank ? "" : undefined)} className="field-input">
          {optionTags(f)}
        </select>
      );
      break;
    case "textarea":
      control = (
        <textarea {...commonProps} rows={2} placeholder={f.ph ?? ""} className="field-input" />
      );
      break;
    case "digits":
      control = (
        <input
          type="text"
          {...commonProps}
          maxLength={24}
          pattern="\d{16}"
          title="Harus 16 digit angka"
          inputMode="numeric"
          autoComplete="off"
          placeholder={f.ph ?? ""}
          className="field-input"
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, "").slice(0, 16);
            e.target.value = cleaned;
            onDigitInput(f.key, cleaned);
          }}
        />
      );
      break;
    case "number":
      control = (
        <input
          type="number"
          {...commonProps}
          inputMode="decimal"
          min={f.min ?? 0}
          step={f.step}
          placeholder={f.ph ?? ""}
          className="field-input"
        />
      );
      break;
    case "tel":
      control = (
        <input
          type="tel"
          {...commonProps}
          inputMode="tel"
          pattern="[0-9+\-\s]{8,20}"
          title="Nomor HP/WA, 8 sampai 20 karakter"
          placeholder={f.ph ?? ""}
          className="field-input"
        />
      );
      break;
    case "date":
      control = <input type="date" {...commonProps} className="field-input" />;
      break;
    default:
      control = (
        <input
          type="text"
          {...commonProps}
          defaultValue={f.def ?? ""}
          placeholder={f.ph ?? ""}
          className="field-input"
        />
      );
  }

  const labelText = `${f.no}. ${f.label}`;
  const count = digitCounts[f.key] ?? 0;

  let labelEl: React.ReactNode = (
    <label className="field-label" htmlFor={id}>
      {labelText} <span className="req">*</span>
    </label>
  );

  if (f.type === "digits") {
    labelEl = (
      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
        <label className="field-label !mb-0" htmlFor={id}>
          {labelText} <span className="req">*</span>
        </label>
        <span className={`digit-badge px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold ${count === 16 ? "!text-emerald-600 bg-emerald-50" : "!text-amber-600 bg-amber-50"}`}>
          {count}/16 digit
        </span>
      </div>
    );
  }

  if (f.copyFromChild) {
    labelEl = (
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
        <label className="field-label !mb-0" htmlFor={id}>
          {labelText} <span className="req">*</span>
        </label>
        <button
          type="button"
          onClick={() => onCopyAddress(f.key)}
          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 transition-colors"
        >
          📌 Sama dengan alamat anak
        </button>
      </div>
    );
  }

  return (
    <div className={spanCls}>
      {labelEl}
      {control}
    </div>
  );
}

// ---- Main form component ----
export default function PpdbForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const topAnchorRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastSaved, setLastSaved] = useState<RegistrationData | null>(null);
  const [receipt, setReceipt] = useState<{ data: RegistrationData; showWA: boolean } | null>(null);
  const [digitCounts, setDigitCounts] = useState<Record<string, number>>({});
  const [uploadPicked, setUploadPicked] = useState<Record<string, UploadItem | null>>({});
  const [uploadInfos, setUploadInfos] = useState<Record<string, { text: string; cls: string }>>({});

  // ---- Draft ----
  const saveDraft = useCallback(() => {
    if (!formRef.current) return;
    try {
      const obj: Record<string, string> = {};
      new FormData(formRef.current).forEach((v, k) => { if (k !== "hp_check") obj[k] = String(v); });
      localStorage.setItem(DRAFT_KEY, JSON.stringify(obj));
    } catch { /* blocked */ }
  }, []);

  const loadDraft = useCallback(() => {
    try {
      const obj = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (!obj || !formRef.current) return;
      Object.keys(obj).forEach((k) => {
        const el = formRef.current!.elements.namedItem(k) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        if (el) el.value = obj[k];
      });
      // refresh digit counts
      const counts: Record<string, number> = {};
      FORM_STEPS.forEach((st) => st.fields.forEach((f) => {
        if (f.type === "digits") {
          const el = formRef.current!.elements.namedItem(f.key) as HTMLInputElement | null;
          if (el) counts[f.key] = el.value.length;
        }
      }));
      setDigitCounts(counts);
    } catch { /* corrupt draft */ }
  }, []);

  const clearDraft = () => { try { localStorage.removeItem(DRAFT_KEY); } catch { /* noop */ } };

  useEffect(() => {
    // small delay to ensure form is mounted
    const t = setTimeout(loadDraft, 50);
    return () => clearTimeout(t);
  }, [loadDraft]);

  // ---- Navigation ----
  function goToStep(step: number, scroll = true) {
    if (showAll) return;
    setCurrentStep(step);
    // Scroll ke bagian atas FORMULIR (bukan ke atas halaman/Hero Section),
    // beri sedikit jarak agar tidak tertutup Navbar sticky.
    if (scroll) {
      requestAnimationFrame(() => {
        const el = topAnchorRef.current;
        if (!el) return;
        const navbarOffset = 88; // tinggi navbar sticky + jarak aman
        const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }

  function toggleMode() {
    setShowAll((prev) => !prev);
  }

  function removeUpload(key: string) {
    const input = document.getElementById(`file_${key}`) as HTMLInputElement | null;
    if (input) input.value = "";
    setUploadPicked((prev) => {
      const next = { ...prev };
      if (next[key]?.previewUrl) {
        URL.revokeObjectURL(next[key]!.previewUrl!);
      }
      delete next[key];
      return next;
    });
    setUploadInfos((prev) => ({
      ...prev,
      [key]: { text: "", cls: "text-[11px] text-slate-500 mt-1" },
    }));
  }

  function resetDraft() {
    if (!confirm("Kosongkan seluruh isian formulir?")) return;
    clearDraft();
    formRef.current?.reset();
    setDigitCounts({});
    UPLOAD_FIELDS.forEach((key) => removeUpload(key));
    setErrorMsg(null);
    goToStep(1);
  }

  // ---- Address copy ----
  function copyChildAddress(targetKey: string) {
    const src = (formRef.current?.elements.namedItem("alamatAnak") as HTMLTextAreaElement)?.value.trim();
    if (!src) { alert("Isi dulu Alamat Lengkap Anak (nomor 10)."); return; }
    const el = formRef.current?.elements.namedItem(targetKey) as HTMLTextAreaElement;
    if (el) el.value = src;
    saveDraft();
  }

  function handleDigitInput(key: string, val: string) {
    setDigitCounts((prev) => ({ ...prev, [key]: val.length }));
    saveDraft();
  }

  // ---- Upload ----
  async function pickUpload(key: string, input: HTMLInputElement) {
    const f = input.files?.[0];
    if (!f) return;

    setUploadInfos((prev) => ({
      ...prev,
      [key]: { text: "⏳ Sedang memproses & mengompres foto...", cls: "text-[11px] text-amber-600 font-semibold mt-1" },
    }));

    try {
      const detected = detectAndNormalizeFile(f);
      if (!detected.isValid) {
        throw new Error("Format tidak didukung. Mohon gunakan foto (JPG/PNG) atau PDF.");
      }

      let finalBlob: Blob = f;
      let finalName = detected.safeName;
      let finalMime = detected.normalizedMime;

      if (detected.isImage) {
        // Otomatis optimasi semua foto HP: mengurangi ukuran dari 3-8MB jadi ~150-300KB
        // Tulisan dokumen tetap tajam & tidak membuat koneksi HP/Google Apps Script timeout!
        finalBlob = await compressImage(f);
        finalMime = "image/jpeg";
        if (!finalName.toLowerCase().endsWith(".jpg") && !finalName.toLowerCase().endsWith(".jpeg")) {
          finalName = `${finalName.replace(/\.[^/.]+$/, "")}.jpg`;
        }
      } else if (detected.isPdf) {
        if (f.size > MAX_UPLOAD_BYTES) {
          throw new Error(`Ukuran PDF (${describeSize(f.size)}) melebihi batas 5 MB. Bisa dilewati & dikirim via WhatsApp panitia.`);
        }
      }

      if (finalBlob.size > MAX_UPLOAD_BYTES) {
        throw new Error(`Ukuran berkas (${describeSize(finalBlob.size)}) melebihi 5 MB.`);
      }

      const dataBase64 = await blobToBase64(finalBlob);
      const previewUrl = detected.isImage ? URL.createObjectURL(finalBlob) : null;

      setUploadPicked((prev) => ({
        ...prev,
        [key]: {
          name: finalName,
          mimeType: finalMime,
          dataBase64,
          previewUrl,
          sizeStr: describeSize(finalBlob.size),
        },
      }));

      setUploadInfos((prev) => ({
        ...prev,
        [key]: {
          text: `✔ ${finalName} (${describeSize(finalBlob.size)}${finalBlob.size < f.size ? ", dioptimasi otomatis" : ""}) — siap dikirim`,
          cls: "text-[11px] text-emerald-700 font-semibold mt-1",
        },
      }));
    } catch (err) {
      input.value = "";
      setUploadPicked((prev) => {
        const next = { ...prev };
        if (next[key]?.previewUrl) URL.revokeObjectURL(next[key]!.previewUrl!);
        delete next[key];
        return next;
      });
      setUploadInfos((prev) => ({
        ...prev,
        [key]: { text: `✖ ${(err as Error).message}`, cls: "text-[11px] text-rose-600 font-semibold mt-1" },
      }));
    }
  }

  // ---- Submit ----
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);

    const data: Record<string, string> = {};
    new FormData(formRef.current!).forEach((v, k) => { data[k] = String(v).trim(); });

    // Filter clean files payload without UI preview fields
    const filesToSend: Record<string, { name: string; mimeType: string; dataBase64: string }> = {};
    Object.entries(uploadPicked).forEach(([k, v]) => {
      if (v && v.dataBase64) {
        filesToSend[k] = { name: v.name, mimeType: v.mimeType, dataBase64: v.dataBase64 };
      }
    });

    const hasFiles = Object.keys(filesToSend).length > 0;
    setSubmitting(true);

    try {
      // If sending files, give 60s timeout so GAS has enough time to write to Google Drive
      const r = await api("submit", { data, files: filesToSend }, hasFiles ? 60000 : 30000);
      if (!r?.ok) {
        setErrorMsg((r?.message) || "Pendaftaran belum berhasil. Silakan coba lagi.");
        return;
      }
      const full = withDerivedFields({ ...data, regNumber: r.regNumber, createdAt: r.createdAt });
      delete full.hp_check;
      setLastSaved(full);
      clearDraft();
      formRef.current?.reset();
      setDigitCounts({});
      UPLOAD_FIELDS.forEach((key) => removeUpload(key));
      setSuccess(true);
      requestAnimationFrame(() => {
        const el = topAnchorRef.current;
        if (el) {
          const navbarOffset = 88;
          const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
      setReceipt({ data: full, showWA: true });
    } catch {
      setErrorMsg(
        `Koneksi bermasalah atau terputus. Data Anda MASIH tersimpan di formulir ini. Periksa internet lalu tekan tombol kirim sekali lagi. Jika tetap gagal, hubungi panitia di WhatsApp ${CONFIG.ADMIN_WA_DISPLAY}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Render ----
  if (success && lastSaved) {
    return (
      <>
        {/* Anchor scroll untuk tampilan sukses */}
        <div ref={topAnchorRef} />
        {receipt && (
          <ReceiptModal
            data={receipt.data}
            showWA={receipt.showWA}
            onClose={() => setReceipt(null)}
          />
        )}
        <div className="section-card text-center p-8 space-y-4">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-extrabold" style={{ color: "#0a3b1e" }}>Pendaftaran Berhasil Terkirim</h2>
          <p className="text-sm text-slate-600">Nomor registrasi Ananda</p>
          <div
            className="inline-block border-2 rounded-xl px-6 py-3 text-2xl font-extrabold tracking-wide"
            style={{ borderColor: "#0f532b", color: "#0a3b1e", background: "#eefbf3" }}
          >
            {lastSaved.regNumber}
          </div>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Simpan bukti pendaftaran di bawah ini (cetak atau simpan PDF), lalu konfirmasi ke WhatsApp panitia agar data Ananda segera diproses.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
            <button
              type="button"
              onClick={() => setReceipt({ data: lastSaved!, showWA: true })}
              className="btn-primary"
            >
              🖨️ Lihat / Cetak Bukti
            </button>
            <button
              type="button"
              onClick={() => {
                const url = `https://wa.me/${formatWAForLink(CONFIG.ADMIN_WA)}?text=${encodeURIComponent(
                  buildWhatsAppMessage(lastSaved!)
                )}`;
                window.open(url, "_blank");
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-5 rounded-xl min-h-[44px] transition"
            >
              📲 Konfirmasi ke WhatsApp Panitia
            </button>
          </div>
          <button
            type="button"
            onClick={() => { setSuccess(false); setLastSaved(null); goToStep(1); }}
            className="text-xs font-semibold hover:underline pt-2"
            style={{ color: "#0f532b" }}
          >
            Daftarkan anak lain
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {receipt && (
        <ReceiptModal
          data={receipt.data}
          showWA={receipt.showWA}
          onClose={() => setReceipt(null)}
        />
      )}

      {/* Anchor scroll: target lompatan saat ganti step (bukan ke atas halaman) */}
      <div ref={topAnchorRef} />

      {/* Top bar */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 md:p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-blue-950">Assalamu&#39;alaikum Ayah / Bunda 👋</h2>
          <p className="text-xs md:text-sm text-slate-600 mt-0.5">
            Lengkapi 39 data calon peserta didik berikut sesuai Kartu Keluarga (KK) dan Akta Kelahiran.
            Isian tersimpan otomatis di perangkat ini, jadi aman kalau Anda keluar di tengah jalan.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={toggleMode}
            className="text-xs font-bold border px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
          >
            {showAll ? "🔢 Per Bagian" : "📋 Tampilkan Semua"}
          </button>
          <button
            type="button"
            onClick={resetDraft}
            className="text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-2.5 rounded-xl hover:bg-rose-100 transition"
          >
            🔄 Kosongkan
          </button>
        </div>
      </div>

      {/* Wizard nav */}
      {!showAll && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 mb-5" role="tablist">
          {FORM_STEPS.map((st, i) => {
            const n = i + 1;
            const isActive = currentStep === n;
            return (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => goToStep(n)}
                className={`step-tab !p-2 sm:!p-3 relative overflow-hidden transition-all ${
                  isActive ? "step-active ring-2 ring-amber-400" : "hover:bg-slate-50"
                }`}
              >
                <span className="step-num w-6 h-6 sm:w-7 sm:h-7 text-xs shrink-0 relative z-10">{n}</span>
                <div className="overflow-hidden min-w-0 relative z-10">
                  <div className={`text-[10px] sm:text-[11px] leading-tight ${isActive ? "text-amber-300" : "opacity-80"}`}>
                    Bagian {n}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold leading-snug break-words">{st.tab}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <form
        ref={formRef}
        id="ppdbForm"
        className="space-y-6"
        onSubmit={handleSubmit}
        onChange={saveDraft}
        onInvalid={(e) => {
          // Jika field ada di step tersembunyi, buka step itu
          const target = e.target as HTMLElement;
          const panel = target.closest("[data-step]") as HTMLElement | null;
          if (panel && !showAll) {
            const step = Number(panel.dataset.step);
            if (step !== currentStep) {
              goToStep(step, false);
              setTimeout(() => (target as HTMLInputElement).reportValidity?.(), 0);
            }
          }
        }}
      >
        <div className="space-y-6">
          {FORM_STEPS.map((st, i) => {
            const n = i + 1;
            const visible = showAll || currentStep === n;
            const first = n === 1;
            const last = n === FORM_STEPS.length;

            return (
              <div
                key={n}
                data-step={n}
                className={`section-card${visible ? "" : " hidden"}`}
              >
                <div className="section-head p-3.5 sm:p-4">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-bold text-sm sm:text-base leading-tight">{st.title}</h3>
                    <p className="text-[11px] sm:text-xs mt-0.5 text-blue-100">{st.sub}</p>
                  </div>
                  <span className="text-xl sm:text-2xl shrink-0" aria-hidden="true">{st.icon}</span>
                </div>

                <div className={`p-4 sm:p-5 grid grid-cols-1 ${st.cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
                  {st.fields.map((f) => (
                    <FieldControl
                      key={f.key}
                      f={f}
                      cols={st.cols}
                      onCopyAddress={copyChildAddress}
                      onDigitInput={handleDigitInput}
                      digitCounts={digitCounts}
                      formRef={formRef}
                    />
                  ))}
                </div>

                <div className="section-foot justify-between">
                  {!first && !showAll ? (
                    <button type="button" onClick={() => goToStep(n - 1)} className="btn-secondary step-nav text-xs sm:text-sm">
                      ← Kembali
                    </button>
                  ) : <span />}
                  {last ? (
                    <button type="submit" id="btnSubmit" disabled={submitting} className="btn-primary ml-auto text-xs sm:text-sm">
                      {submitting
                        ? (Object.values(uploadPicked).some((x) => x?.dataBase64)
                            ? "⏳ Mengunggah berkas & menyimpan..."
                            : "⏳ Mengirim...")
                        : "✅ Simpan & Kirim Pendaftaran"}
                    </button>
                  ) : !showAll ? (
                    <button type="button" onClick={() => goToStep(n + 1)} className="btn-primary step-nav ml-auto text-xs sm:text-sm">
                      Lanjut: {FORM_STEPS[n].tab} →
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Honeypot */}
        <input type="text" name="hp_check" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />

        {/* Error */}
        {errorMsg && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-sm px-4 py-3">
            {errorMsg}
          </div>
        )}
      </form>

      {/* Upload berkas */}
      <div className="section-card mt-6">
        <div className="section-head">
          <div>
            <h3 className="font-bold text-base">Upload Berkas (Opsional)</h3>
            <p className="text-xs text-blue-100">Akta Kelahiran &amp; Kartu Keluarga</p>
          </div>
          <span className="text-2xl" aria-hidden="true">📎</span>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Lampirkan foto/scan di bawah ini agar panitia tidak perlu meminta fotokopi lagi.{" "}
            <strong>Bisa juga dilewati</strong> — berkas dapat dikirim via WhatsApp ke{" "}
            <a
              href={`https://wa.me/${formatWAForLink(CONFIG.INFO_WA_ALT)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1E6B49] hover:underline"
            >
              {CONFIG.INFO_WA_ALT_DISPLAY}
            </a>{" "}
            setelah mendaftar. Foto kamera HP akan <strong>dioptimasi otomatis</strong> agar cepat terkirim.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {UPLOAD_FIELDS.map((key) => {
              const item = uploadPicked[key];
              const title = key === "aktaKelahiran" ? "📄 Akta Kelahiran" : "👨‍👩‍👧‍👦 Kartu Keluarga (KK)";
              return (
                <div key={key} className="p-4 rounded-2xl border-2 border-slate-200/80 bg-slate-50/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="field-label !mb-0 font-heading font-bold" htmlFor={`file_${key}`}>
                      {title}
                    </label>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Maks 5 MB</span>
                  </div>

                  {item ? (
                    <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-emerald-300 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.previewUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.previewUrl}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                            PDF
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-emerald-700 font-semibold">
                            {item.sizeStr} · Siap dikirim
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUpload(key)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 shrink-0 transition"
                      >
                        Ganti
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id={`file_${key}`}
                        accept="image/jpeg,image/png,image/jpg,.jpg,.jpeg,.png,.pdf,application/pdf"
                        className="field-input !py-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-[#1E6B49] file:text-xs file:font-bold file:cursor-pointer cursor-pointer text-xs"
                        onChange={(e) => pickUpload(key, e.target)}
                      />
                      {uploadInfos[key]?.text && (
                        <p className={uploadInfos[key].cls}>{uploadInfos[key].text}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500">
            Berkas hanya dilihat panitia PPDB dan disimpan di penyimpanan privat sekolah, tidak dibagikan ke publik.
          </p>
        </div>
      </div>
    </>
  );
}
