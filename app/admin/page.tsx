"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FIELD_GROUPS,
  CONFIG,
  withDerivedFields,
  escapeHtml,
  formatWAForLink,
  PLACEHOLDER_LOGO,
  type RegistrationData,
} from "@/lib/config";
import { api } from "@/lib/api";
import ReceiptModal from "@/components/ReceiptModal";
import LogoImg from "@/components/LogoImg";

const PW_KEY = "ppdb_admin_pw"; // sessionStorage: hilang saat tab ditutup

function getPw(): string {
  try { return sessionStorage.getItem(PW_KEY) || ""; } catch { return ""; }
}
function setPw(v: string) {
  try { v ? sessionStorage.setItem(PW_KEY, v) : sessionStorage.removeItem(PW_KEY); } catch { /* noop */ }
}

function sizeCode(item: RegistrationData): string {
  return (item.ukuranSeragam || "").split(" ")[0];
}

type AdminRow = RegistrationData & { regNumber: string; createdAt: string };

export default function AdminPage() {
  const [view, setView] = useState<"login" | "dash">("login");
  const [pw, setPwState] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [loadStatus, setLoadStatus] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterJK, setFilterJK] = useState("");
  const [receipt, setReceipt] = useState<{ data: RegistrationData } | null>(null);

  async function fetchRows(password: string) {
    const r = await api("list", { password });
    if (!r?.ok) {
      const e = new Error((r?.message) || "Gagal memuat data.");
      (e as Error & { code?: string }).code = r?.code;
      throw e;
    }
    return ((r.data || []) as RegistrationData[]).map((d) => withDerivedFields(d) as AdminRow);
  }

  const loadData = useCallback(async () => {
    setRefreshing(true);
    setLoadStatus("Memuat data...");
    try {
      const data = await fetchRows(getPw());
      setRows(data);
      setLoadStatus(`Diperbarui ${new Date().toLocaleTimeString("id-ID")} · ${data.length} pendaftar`);
    } catch (err) {
      const e = err as Error & { code?: string };
      if (e.code === "AUTH") {
        setPw("");
        setView("login");
        setLoginError("Sesi berakhir atau password salah.");
      } else {
        setLoadStatus("Gagal memuat: " + e.message);
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const data = await fetchRows(pw);
      setPw(pw);
      setRows(data);
      setView("dash");
      setLoadStatus(`Diperbarui ${new Date().toLocaleTimeString("id-ID")} · ${data.length} pendaftar`);
    } catch (err) {
      const e = err as Error & { code?: string };
      setLoginError(
        e.code === "AUTH" ? "Password salah." :
          e.code === "NOT_CONFIGURED" ? e.message :
            "Tidak bisa terhubung ke server. Coba lagi."
      );
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    setPw("");
    setRows([]);
    setPwState("");
    setView("login");
    setLoginError("");
  }

  // Lanjutkan sesi tab ini
  useEffect(() => {
    const stored = getPw();
    if (stored) {
      fetchRows(stored)
        .then((data) => { setRows(data); setView("dash"); setLoadStatus(`${data.length} pendaftar`); })
        .catch(() => { setPw(""); setView("login"); });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exportCSV() {
    if (!rows.length) { alert("Belum ada data untuk diunduh."); return; }
    const all = FIELD_GROUPS.flatMap((g) => g.fields.map((fl) => ({ ...fl, who: g.who })));
    const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const safe = (v: unknown, forceText?: boolean) => {
      const s = String(v ?? "");
      return forceText || /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
    };
    const header = ["No. Registrasi", "Waktu Pendaftaran", ...all.map((fl) => `${fl.no}. ${fl.label}${fl.who ? " " + fl.who : ""}`)];
    const lines = rows.map((d) => [q(d.regNumber), q(d.createdAt), ...all.map((fl) => q(safe(d[fl.key], fl.text)))].join(","));
    const csv = "\uFEFF" + [header.map(q).join(","), ...lines].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rekap_PPDB_RA_Assalaamah_2027-2028_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---- Filtered list ----
  const q = search.toLowerCase();
  const list = rows.filter((x) => {
    if (filterJK && x.jenisKelamin !== filterJK) return false;
    return [x.namaLengkap, x.namaPanggilan, x.nikAnak, x.noKK, x.namaAyah, x.namaIbu, x.waAyah, x.waIbu, x.regNumber]
      .join(" ").toLowerCase().includes(q);
  });

  // ---- Stat seragam ----
  const counts = { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
  rows.forEach((x) => { const s = sizeCode(x) as keyof typeof counts; if (s in counts) counts[s]++; });
  const seragamStat = Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(" | ");

  return (
    <>
      {receipt && (
        <ReceiptModal data={receipt.data} showWA={false} onClose={() => setReceipt(null)} />
      )}

      {/* ---- HEADER ---- */}
      <header className="no-print" style={{ background: "linear-gradient(to right, #0a3b1e, #146c38, #1b7a43)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-amber-400">
              <LogoImg size={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold leading-snug text-white">Dashboard Admin PPDB 2027/2028</h1>
              <p className="text-xs" style={{ color: "#d6f5e3" }}>RA Assalaamah · halaman khusus panitia</p>
            </div>
          </div>
          {view === "dash" && (
            <button
              onClick={handleLogout}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              Keluar
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">

        {/* ---- LOGIN ---- */}
        {view === "login" && (
          <section className="max-w-sm mx-auto mt-8">
            <div className="section-card p-6 space-y-4 text-center">
              <h2 className="text-lg font-extrabold">Masuk Panitia</h2>
              <p className="text-xs text-slate-500">Password diperiksa di server Google Apps Script, bukan di halaman ini.</p>
              <form onSubmit={handleLogin} className="space-y-3 text-left">
                <div>
                  <label className="field-label" htmlFor="pw">Password</label>
                  <input
                    type="password"
                    id="pw"
                    required
                    autoComplete="current-password"
                    className="field-input"
                    value={pw}
                    onChange={(e) => setPwState(e.target.value)}
                  />
                </div>
                {loginError && (
                  <p role="alert" className="text-xs text-rose-600 font-semibold">{loginError}</p>
                )}
                <button type="submit" disabled={loginLoading} className="btn-primary w-full">
                  {loginLoading ? "Memeriksa..." : "Masuk"}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ---- DASHBOARD ---- */}
        {view === "dash" && (
          <div className="space-y-6">
            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-card">
                <div className="stat-label">Total Pendaftar</div>
                <div className="text-2xl font-extrabold mt-1" style={{ color: "#0f532b" }}>{rows.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Laki-laki</div>
                <div className="text-2xl font-extrabold text-sky-600 mt-1">
                  {rows.filter((x) => x.jenisKelamin === "Laki-laki").length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Perempuan</div>
                <div className="text-2xl font-extrabold text-pink-600 mt-1">
                  {rows.filter((x) => x.jenisKelamin === "Perempuan").length}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Rekap Ukuran Baju</div>
                <div className="text-xs font-bold text-slate-700 mt-1.5 leading-relaxed">{seragamStat || "-"}</div>
              </div>
            </div>

            {/* Tabel */}
            <div className="section-card">
              <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1 flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="search"
                    placeholder="🔍 Cari nama anak, NIK, KK, nama ayah/ibu, atau No. WA..."
                    className="field-input !py-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    className="field-input !py-2 sm:!w-auto"
                    value={filterJK}
                    onChange={(e) => setFilterJK(e.target.value)}
                  >
                    <option value="">Semua Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={loadData}
                    disabled={refreshing}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                  >
                    🔄 {refreshing ? "Memuat..." : "Muat Ulang"}
                  </button>
                  <button
                    onClick={exportCSV}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                  >
                    📊 Download CSV
                  </button>
                </div>
              </div>
              <p className="px-4 pt-3 text-xs text-slate-500">{loadStatus}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">No. Reg & Waktu</th>
                      <th className="py-3 px-4">Nama Anak</th>
                      <th className="py-3 px-4">L/P & TTL</th>
                      <th className="py-3 px-4">No. KK & NIK Anak</th>
                      <th className="py-3 px-4">Orang Tua & WA</th>
                      <th className="py-3 px-4">Seragam</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                      <th className="py-3 px-4">Berkas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {list.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-slate-400">
                          {rows.length ? "Tidak ada data yang cocok." : "Belum ada pendaftar."}
                        </td>
                      </tr>
                    ) : list.map((x) => {
                      const male = x.jenisKelamin === "Laki-laki";
                      const links: [string, string][] = [];
                      if (x.linkAktaKelahiran) links.push(["Akta", x.linkAktaKelahiran]);
                      if (x.linkKartuKeluarga) links.push(["KK", x.linkKartuKeluarga]);
                      return (
                        <tr key={x.regNumber} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <span className="font-extrabold block" style={{ color: "#0f532b" }}>{x.regNumber}</span>
                            <span className="text-[11px] text-slate-400">{x.createdAt}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold">{x.namaLengkap}</div>
                            <div className="text-[11px] text-slate-500">Panggilan: {x.namaPanggilan}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${male ? "bg-sky-100 text-sky-700" : "bg-pink-100 text-pink-700"}`}>
                              {x.jenisKelamin}
                            </span>
                            <div className="text-[11px] text-slate-500 mt-0.5">{x.ttlAnak}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">
                            <div>KK: {x.noKK}</div>
                            <div className="text-slate-500">NIK: {x.nikAnak}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold">Ayah: {x.namaAyah} ({x.waAyah})</div>
                            <div className="text-[11px] text-slate-500">Ibu: {x.namaIbu} ({x.waIbu})</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold" style={{ color: "#0f532b" }}>{sizeCode(x)}</span>
                            <div className="text-[10px] text-slate-400">TB {x.tinggiBadan}cm / BB {x.beratBadan}kg</div>
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setReceipt({ data: x })}
                              className="hover:bg-ra-100 font-bold px-3 py-2 rounded-lg text-[11px] transition"
                              style={{ background: "#eefbf3", color: "#0f532b" }}
                              aria-label={`Lihat dan cetak bukti pendaftaran ${x.namaLengkap}`}
                            >
                              👁️ Lihat & Cetak
                            </button>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {links.length > 0 ? links.map(([l, url]) => (
                              <a
                                key={l}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded-md text-[10px] mr-1"
                                aria-label={`Buka berkas ${l} ${x.namaLengkap}`}
                              >
                                📎 {l}
                              </a>
                            )) : (
                              <span className="text-[10px] text-slate-400">belum ada</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Hapus atau koreksi data langsung di Google Sheets (tab "PPDB"). Halaman ini hanya untuk melihat, mencari, mencetak, dan mengunduh.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
