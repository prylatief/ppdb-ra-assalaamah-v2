// lib/api.ts – wrapper fetch ke Apps Script
// Menggunakan Content-Type text/plain (JANGAN ganti ke application/json).
// Ini adalah "simple request" agar tidak ada preflight CORS.

import { CONFIG } from "./config";

export async function api(action: string, payload: Record<string, unknown> = {}, timeoutMs = 60000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...payload }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
