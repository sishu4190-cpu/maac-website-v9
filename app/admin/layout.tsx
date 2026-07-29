import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "MAAC Admin",
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MAAC Admin",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a4d2e",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
