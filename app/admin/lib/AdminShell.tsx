"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, FileText, BookOpen, Settings, LogOut, Menu, X, ExternalLink, Award, FileArchive } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Catalogue PDF", href: "/admin/catalogue", icon: FileArchive },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({ children, title }: { children: ReactNode; title?: string }) {
  const [auth, setAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("maac_admin_token");
    if (!token) { window.location.href = "/admin/login"; return; }
    setAuth(true);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("maac_admin_token");
    window.location.href = "/admin/login";
  };

  if (!auth) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #1a4d2e", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ fontSize: 14, color: "#6b7280" }}>Verifying session…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const isActive = (href: string) => href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/assets/maac-media/images/maac-logo-avatar.webp" alt="MAAC" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain", background: "white", padding: 2 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2, color: "white" }}>MAAC Admin</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Mangalam Chemicals</div>
          </div>
        </div>
        {onClose && <button onClick={onClose} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><X size={20} /></button>}
      </div>
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {nav.map(item => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 2, textDecoration: "none", fontSize: 13, fontWeight: active ? 600 : 400, background: active ? "rgba(255,255,255,0.15)" : "transparent", color: active ? "white" : "rgba(255,255,255,0.65)" }}>
              <item.icon size={16} />{item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <a href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 12 }}>
          <ExternalLink size={12} /> View Website
        </a>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#fca5a5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", position: "relative", zIndex: 1 }}>
      {sidebarOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} onClick={() => setSidebarOpen(false)} />}

      {/* Desktop Sidebar */}
      <aside style={{ width: 220, background: "linear-gradient(180deg, #0f2d1a 0%, #1a4d2e 100%)", color: "white", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100%", zIndex: 50 }} className="hidden lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside style={{ width: 220, background: "linear-gradient(180deg, #0f2d1a 0%, #1a4d2e 100%)", color: "white", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100%", zIndex: 50, transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s ease" }} className="lg:hidden">
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      <div style={{ flex: 1, marginLeft: 220, display: "flex", flexDirection: "column", minHeight: "100vh" }} className="lg:ml-[220px] ml-0">
        <header style={{ background: "white", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#374151", padding: 4 }}><Menu size={22} /></button>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>{title || "Dashboard"}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="/" target="_blank" style={{ fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}><ExternalLink size={12} /> View Site</a>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a4d2e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>A</div>
          </div>
        </header>
        <main style={{ flex: 1, padding: "24px" }}>{children}</main>
      </div>
    </div>
  );
}
