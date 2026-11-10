import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:4000";

// --- helper: isi seluruh 39 field formulir ---
async function fillAllFields(page: Page) {
  // Bagian 1 – Data Anak (13 field)
  await page.fill('[name="namaLengkap"]', "Ahmad Faris Maulana");
  await page.fill('[name="namaPanggilan"]', "Faris");
  await page.selectOption('[name="jenisKelamin"]', "Laki-laki");
  await page.fill('[name="tempatLahirAnak"]', "Jakarta");
  await page.fill('[name="tglLahirAnak"]', "2021-05-10");
  await page.fill('[name="noKK"]', "3175012345678901");
  await page.fill('[name="nikAnak"]', "3175012345678902");
  await page.selectOption('[name="agamaAnak"]', "Islam");
  await page.fill('[name="anakKe"]', "1");
  await page.fill('[name="jmlSaudara"]', "2");
  await page.fill('[name="alamatAnak"]', "Jl. Contoh No. 1 RT.001/RW.001 Jakarta Timur");
  await page.selectOption('[name="tinggalBersama"]', "Orang Tua Kandung");
  await page.selectOption('[name="jarakSekolah"]', "1 - 3 Km");
  await page.selectOption('[name="transportasi"]', "Jalan Kaki");
}

async function fillStep2(page: Page) {
  // Bagian 2 – Fisik & Seragam
  await page.selectOption('[name="golDarah"]', "A");
  await page.fill('[name="tinggiBadan"]', "105");
  await page.fill('[name="beratBadan"]', "17");
  await page.fill('[name="kelainanJasmani"]', "Tidak Ada");
  await page.fill('[name="riwayatPenyakit"]', "Tidak Ada");
  await page.selectOption('[name="ukuranSeragam"]', "M (LD ~36cm / PJ Celana ~60cm)");
}

async function fillStep3(page: Page) {
  // Bagian 3 – Ayah
  await page.fill('[name="namaAyah"]', "Budi Santoso");
  await page.fill('[name="tempatLahirAyah"]', "Bandung");
  await page.fill('[name="tglLahirAyah"]', "1988-03-15");
  await page.fill('[name="nikAyah"]', "3175019988031503");
  await page.selectOption('[name="agamaAyah"]', "Islam");
  await page.selectOption('[name="pendidikanAyah"]', "S1 / D4");
  await page.fill('[name="pekerjaanAyah"]', "Karyawan Swasta");
  await page.selectOption('[name="penghasilanAyah"]', "Rp 2.000.000 - Rp 4.000.000");
  await page.fill('[name="alamatAyah"]', "Jl. Contoh No. 1 RT.001/RW.001 Jakarta Timur");
  await page.fill('[name="waAyah"]', "081234567890");
  await page.selectOption('[name="kondisiAyah"]', "Masih Hidup");
}

async function fillStep4(page: Page) {
  // Bagian 4 – Ibu
  await page.fill('[name="namaIbu"]', "Siti Rahayu");
  await page.fill('[name="tempatLahirIbu"]', "Bogor");
  await page.fill('[name="tglLahirIbu"]', "1990-07-20");
  await page.fill('[name="nikIbu"]', "3175019990072001");
  await page.selectOption('[name="agamaIbu"]', "Islam");
  await page.selectOption('[name="pendidikanIbu"]', "SMA / SMK / MA");
  await page.fill('[name="pekerjaanIbu"]', "Ibu Rumah Tangga");
  await page.selectOption('[name="penghasilanIbu"]', "Tidak Berpenghasilan / IRT");
  await page.fill('[name="alamatIbu"]', "Jl. Contoh No. 1 RT.001/RW.001 Jakarta Timur");
  await page.fill('[name="waIbu"]', "081398765432");
  await page.selectOption('[name="kondisiIbu"]', "Masih Hidup");
}

// ==== TEST 1: Console error 0 di halaman utama (390px dan 1280px) ====
for (const width of [390, 1280]) {
  test(`T1: 0 JS error console – lebar ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.setViewportSize({ width, height: 844 });
    await page.goto(BASE, { waitUntil: "networkidle" });
    expect(errors.filter((e) => !e.includes("Failed to load resource"))).toHaveLength(0);
  });
}

// ==== TEST 2: Console error 0 di /admin (390px dan 1280px) ====
for (const width of [390, 1280]) {
  test(`T1: 0 JS error console /admin – lebar ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.setViewportSize({ width, height: 844 });
    await page.goto(BASE + "/admin", { waitUntil: "networkidle" });
    expect(errors.filter((e) => !e.includes("Failed to load resource"))).toHaveLength(0);
  });
}

// ==== TEST 3: Formulir 39 field + mock submit + nomor registrasi tampil ====
test("T3: Isi 39 field, submit dengan mock, nomor registrasi tampil", async ({ page }) => {
  // Mock API
  await page.route("**script.google.com**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, regNumber: "RA-2627-0001", createdAt: "10 Nov 2026 10:00" }),
    });
  });

  await page.goto(BASE, { waitUntil: "networkidle" });

  // Tampilkan semua bagian sekaligus
  await page.click('button:has-text("Tampilkan Semua")');

  await fillAllFields(page);
  await fillStep2(page);
  await fillStep3(page);
  await fillStep4(page);

  // Hitung total field visible (39 + 1 honeypot)
  const fieldCount = await page.locator("#ppdbForm [name]").count();
  expect(fieldCount).toBeGreaterThanOrEqual(40); // 39 + hp_check

  // Submit
  await page.click('#btnSubmit');
  await page.waitForSelector('text=RA-2627-0001', { timeout: 10000 });
  const regText = await page.textContent('body');
  expect(regText).toContain("RA-2627-0001");
});

// ==== TEST 4: Total biaya Kelas A dan B ====
test("T4: Biaya Kelas A = Rp5.895.000 dan Kelas B = Rp6.195.000", async ({ page }) => {
  await page.goto(BASE, { waitUntil: "networkidle" });

  // Kelas A (default)
  const totalA = await page.locator("#biayaTotalA").getAttribute("data-total");
  expect(Number(totalA)).toBe(5895000);

  // Kelas B
  await page.click('button:has-text("Kelas B")');
  await page.waitForSelector("#biayaTotalB");
  const totalB = await page.locator("#biayaTotalB").getAttribute("data-total");
  expect(Number(totalB)).toBe(6195000);
});

// ==== TEST 5: Pesan WA tidak ada "&" dan memuat 39 butir ====
test("T5: Pesan WA tidak ada & dan memuat 39 butir", async ({ page }) => {
  const { buildWhatsAppMessage, withDerivedFields } = await import("../lib/config");
  const dummy: Record<string, string> = {
    regNumber: "RA-2627-0001", createdAt: "10 Nov 2026 10:00",
    namaLengkap: "Ahmad Faris", namaPanggilan: "Faris", jenisKelamin: "Laki-laki",
    tempatLahirAnak: "Jakarta", tglLahirAnak: "2021-05-10",
    noKK: "3175012345678901", nikAnak: "3175012345678902",
    agamaAnak: "Islam", anakKe: "1", jmlSaudara: "2",
    alamatAnak: "Jl. Test", tinggalBersama: "Orang Tua Kandung",
    jarakSekolah: "1 - 3 Km", transportasi: "Jalan Kaki",
    golDarah: "A", tinggiBadan: "105", beratBadan: "17",
    kelainanJasmani: "Tidak Ada", riwayatPenyakit: "Tidak Ada",
    ukuranSeragam: "M (LD ~36cm / PJ Celana ~60cm)",
    namaAyah: "Budi & Sons", tempatLahirAyah: "Bandung", tglLahirAyah: "1988-03-15",
    nikAyah: "3175019988031503", agamaAyah: "Islam", pendidikanAyah: "S1 / D4",
    pekerjaanAyah: "Karyawan", penghasilanAyah: "Rp 2.000.000 - Rp 4.000.000",
    alamatAyah: "Jl. Test", waAyah: "081234567890", kondisiAyah: "Masih Hidup",
    namaIbu: "Siti", tempatLahirIbu: "Bogor", tglLahirIbu: "1990-07-20",
    nikIbu: "3175019990072001", agamaIbu: "Islam", pendidikanIbu: "SMA / SMK / MA",
    pekerjaanIbu: "IRT", penghasilanIbu: "Tidak Berpenghasilan / IRT",
    alamatIbu: "Jl. Test", waIbu: "081398765432", kondisiIbu: "Masih Hidup",
  };
  const data = withDerivedFields(dummy);
  const msg = buildWhatsAppMessage(data);
  expect(msg).not.toContain("&");
  // Cek nomor field 1 sampai 39 ada dalam pesan
  for (let i = 1; i <= 39; i++) {
    expect(msg).toContain(`${i}.`);
  }
});

// ==== TEST 6: Tidak ada password hardcoded di source file, API_URL identik ====
test("T6: Tidak ada password hardcoded, API_URL identik dengan situs lama", async ({ page }) => {
  const jsUrls: string[] = [];
  page.on("response", (resp) => {
    if (resp.url().includes("/_next/static") && resp.url().endsWith(".js")) jsUrls.push(resp.url());
  });
  await page.goto(BASE, { waitUntil: "networkidle" });

  let combined = "";
  for (const url of jsUrls) {
    const res = await page.request.get(url);
    combined += await res.text();
  }

  // Tidak ada kata ADMIN_PASSWORD hardcoded sebagai nilai
  expect(combined).not.toMatch(/ADMIN_PASSWORD\s*[:=]\s*['"][^'"]{3,}/);
  // API_URL identik dengan situs lama
  expect(combined).toContain("AKfycbwY1UQBgwPxlf97Sfh-m3bkzzBe3fNNIVV7NI1ZK4g-AhdU9F4z54bUrmL17mbLzcld");
});

// ==== TEST 7: Tidak ada scroll horizontal di 390px ====
test("T7: Tidak ada scroll horizontal di 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(390);
});
