"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, FileText, BookOpen, Settings, LogOut, Menu, X, ExternalLink, Award, FileArchive, Images, History } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Catalogue PDF", href: "/admin/catalogue", icon: FileArchive },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Activity Log", href: "/admin/activity", icon: History },
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

  // Close the mobile sidebar automatically whenever the route changes.
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

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

  return (
    <div className="admin-shell">
      {/* Mobile backdrop */}
      <div
        className="admin-backdrop"
        data-open={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar — single element, shown/positioned purely via CSS (no Tailwind breakpoint dependency) */}
      <aside className="admin-sidebar" data-open={sidebarOpen}>
        <div className="admin-sidebar-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <img src="/assets/maac-media/images/maac-logo-avatar.webp" alt="MAAC" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "contain", background: "white", padding: 2, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2, color: "white" }}>MAAC Admin</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Mangalam Chemicals</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="admin-sidebar-close" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          {nav.map(item => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className="admin-nav-link" data-active={active}>
                <item.icon size={16} />{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-foot">
          <a href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 12 }}>
            <ExternalLink size={12} /> View Website
          </a>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#fca5a5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-content">
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <button onClick={() => setSidebarOpen(true)} className="admin-hamburger" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="admin-header-title">{title || "Dashboard"}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a href="/" target="_blank" className="admin-view-site" style={{ fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <ExternalLink size={12} /> <span className="admin-view-site-label">View Site</span>
            </a>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1a4d2e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>

      <style>{`
        .admin-shell {
          min-height: 100vh;
          background: #f3f4f6;
          position: relative;
        }

        /* Backdrop — mobile only, behind the sidebar */
        .admin-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 40;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .admin-backdrop[data-open="true"] {
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar — off-canvas on mobile by default, fixed/visible on desktop */
        .admin-sidebar {
          width: 240px;
          max-width: 82vw;
          background: linear-gradient(180deg, #0f2d1a 0%, #1a4d2e 100%);
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        }
        .admin-sidebar[data-open="true"] { transform: translateX(0); }
        .admin-sidebar-close { background: none; border: none; color: white; cursor: pointer; padding: 4px; flex-shrink: 0; }

        .admin-sidebar-head {
          padding: 18px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .admin-nav { flex: 1; padding: 10px 8px; overflow-y: auto; }
        .admin-nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 12px; border-radius: 8px; margin-bottom: 2px;
          text-decoration: none; font-size: 13.5px; font-weight: 500;
          background: transparent; color: rgba(255,255,255,0.65);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .admin-nav-link[data-active="true"] { background: rgba(255,255,255,0.15); color: white; font-weight: 600; }
        .admin-nav-link:active { background: rgba(255,255,255,0.12); }
        .admin-sidebar-foot { padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.08); }

        /* Main content area */
        .admin-content {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          margin-left: 0;
        }
        .admin-header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 14px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
          gap: 10px;
        }
        .admin-hamburger { background: none; border: none; cursor: pointer; color: #374151; padding: 6px; margin-left: -6px; display: flex; flex-shrink: 0; }
        .admin-header-title {
          font-size: 15px; font-weight: 700; color: #111827; margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .admin-view-site-label { display: none; }
        .admin-main { flex: 1; padding: 16px; padding-bottom: 40px; max-width: 100vw; overflow-x: hidden; }

        /* ── Reusable responsive helpers for all admin pages ── */
        /* 2-column "content + sidebar" layout — stacks on mobile/tablet */
        .admin-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        /* Horizontal scroll wrapper for wide tables so they scroll instead
           of squeezing/breaking the page layout on narrow screens */
        .admin-table-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        /* Toolbar rows (search + filters + buttons) wrap onto multiple
           lines on narrow screens instead of overflowing */
        .admin-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .admin-2col { grid-template-columns: 1fr 300px; align-items: start; }
        }

        /* ── Desktop (≥1024px): static sidebar, no overlay/hamburger ── */
        @media (min-width: 1024px) {
          .admin-backdrop { display: none; }
          .admin-sidebar {
            transform: translateX(0);
            box-shadow: none;
            max-width: 240px;
          }
          .admin-sidebar-close { display: none; }
          .admin-content { margin-left: 240px; }
          .admin-header { padding: 0 24px; height: 60px; }
          .admin-hamburger { display: none; }
          .admin-header-title { font-size: 16px; }
          .admin-view-site-label { display: inline; }
          .admin-main { padding: 24px; }
        }
      `}</style>
    </div>
  );
}
