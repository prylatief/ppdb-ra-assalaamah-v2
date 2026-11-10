import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin PPDB RA Assalaamah",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
