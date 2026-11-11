import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fredoka } from "next/font/google";
import "./globals.css";

const pjs = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ppdb-ra-assalaamah-v2.vercel.app"),
  title: "PPDB RA Assalaamah 2027/2028 – Formulir Pendaftaran Online",
  description:
    "Daftarkan putra-putri Anda ke Raudhatul Athfal (RA) Assalaamah Jakarta Timur. Formulir PPDB online Tahun Ajaran 2027/2028.",
  keywords: "PPDB RA Assalaamah, Raudhatul Athfal, TK Islam Jakarta Timur, pendaftaran online 2027",
  openGraph: {
    title: "PPDB RA Assalaamah 2027/2028",
    description: "Formulir pendaftaran siswa baru RA Assalaamah Jakarta Timur – Tahun Ajaran 2027/2028.",
    type: "website",
    locale: "id_ID",
    siteName: "RA Assalaamah",
    images: [{ url: "/logo-ra.jpg", width: 400, height: 400, alt: "Logo RA Assalaamah" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${pjs.variable} ${fredoka.variable} h-full`}>
      <head>
        <link rel="icon" href="/logo-ra.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFDF9] text-[#112F20] antialiased">
        {children}
      </body>
    </html>
  );
}
