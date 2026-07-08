"use client";
import { useState, useEffect } from "react";
import AdminShell from "./lib/AdminShell";
import { adminGet, adminPost } from "./lib/api";
import { Package, Tag, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Settings, ExternalLink, Clock } from "lucide-react";
import { getAllProducts, categories } from "../data/products";
import Link from "next/link";

const allProducts = getAllProducts();
const totalProducts = allProducts.length;
const totalCategories = categories.length;

export default function AdminDashboard() {
  const [data, setData] = useState<{ enquiries: { id: string; name: string; company: string; product: string; qty: string; location: string; status: string; time: string }[]; adminPassword?: string } | null>(null);
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(true);
  const [storageStatus, setStorageStatus] = useState<{ connected: boolean; mode: string; message: string; isDeployed?: boolean } | null>(null);
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    adminGet().then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const checkStorage = () => {
    setCheckingStorage(true);
    const token = sessionStorage.getItem("maac_admin_token") || "maac-admin-dev";
    fetch("/api/admin/storage-status", { headers: { "x-admin-token": token } })
      .then(r => r.json())
      .then(d => { setStorageStatus(d); setCheckingStorage(false); })
      .catch(() => { setCheckingStorage(false); });
  };

  useEffect(() => { checkStorage(); }, []);

  const enquiries = data?.enquiries || [];
  const newCount = enquiries.filter(e => e.status === "new").length;
  const monthCount = enquiries.length;

  const updateStatus = async (id: string, status: string) => {
    await adminPost("enquiry_status", { id, status });
    setData(prev => prev ? {
      ...prev,
      enquiries: prev.enquiries.map(e => e.id === id ? { ...e, status } : e)
    } : prev);
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    return "Just now";
  };

  const statusColor = (s: string) => s === "new" ? { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" } : s === "responded" ? { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" } : { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" };

  return (
    <AdminShell title="Dashboard">
      {/* Storage Connection Status — critical, shown first */}
      {!checkingStorage && storageStatus && (
        <div style={{
          background: storageStatus.connected ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${storageStatus.connected ? "#86efac" : "#fca5a5"}`,
          borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16,
        }}>
          {storageStatus.connected
            ? <CheckCircle size={18} style={{ color: "#15803d", flexShrink: 0, marginTop: 1 }} />
            : <AlertTriangle size={18} style={{ color: "#dc2626", flexShrink: 0, marginTop: 1 }} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: storageStatus.connected ? "#15803d" : "#b91c1c", margin: 0 }}>
              {storageStatus.connected ? "Storage Connected — changes will save permanently" : "Storage NOT Connected — changes will NOT save permanently"}
            </p>
            <p style={{ fontSize: 12, color: storageStatus.connected ? "#166534" : "#991b1b", margin: "2px 0 0" }}>{storageStatus.message}</p>
          </div>
          <button onClick={checkStorage} style={{ fontSize: 12, fontWeight: 700, color: storageStatus.connected ? "#15803d" : "#dc2626", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
            Re-check
          </button>
        </div>
      )}

      {/* Password Alert */}
      {showAlert && (
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
          <AlertTriangle size={18} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: "#92400e", margin: 0 }}>Change Your Password</p>
            <p style={{ fontSize: 12, color: "#a16207", margin: "2px 0 0" }}>You are using the default temporary password. Change it under Settings → Security.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/admin/settings" style={{ fontSize: 12, fontWeight: 700, color: "#d97706", textDecoration: "none" }}>Change Now</Link>
            <button onClick={() => setShowAlert(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d97706", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { icon: Package, label: "Total Products", value: totalProducts, sub: "Across all categories", iconBg: "#dcfce7", iconColor: "#1a4d2e" },
          { icon: Tag, label: "Categories", value: totalCategories, sub: "Product categories", iconBg: "#dbeafe", iconColor: "#1d4ed8" },
          { icon: MessageSquare, label: "New Enquiries", value: newCount, sub: "Awaiting response", iconBg: "#ffedd5", iconColor: "#c2410c" },
          { icon: TrendingUp, label: "Total Enquiries", value: monthCount, sub: "All time", iconBg: "#f3e8ff", iconColor: "#7c3aed" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <s.icon size={20} style={{ color: s.iconColor }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{loading ? "—" : s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { label: "Upload PDF", desc: "Catalogue / certificates", href: "/admin/documents/upload", bg: "#dbeafe", color: "#1d4ed8", emoji: "📄" },
            { label: "View Enquiries", desc: "Respond to buyers", href: "/admin/enquiries", bg: "#ffedd5", color: "#c2410c", emoji: "📬" },
            { label: "Update Contact", desc: "Phone, email, hours", href: "/admin/settings", bg: "#dcfce7", color: "#1a4d2e", emoji: "📞" },
            { label: "Blog Posts", desc: "Knowledge centre", href: "/admin/blog", bg: "#f3e8ff", color: "#7c3aed", emoji: "✍️" },
            { label: "Homepage Image", desc: "Change background photo", href: "/admin/settings?tab=site", bg: "#fef3c7", color: "#b45309", emoji: "🖼️" },
            { label: "Gallery", desc: "Office, factory, events photos", href: "/admin/gallery", bg: "#e0e7ff", color: "#4338ca", emoji: "📸" },
          ].map(a => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "white", borderRadius: 12, padding: "18px 16px", border: "1px solid #f1f5f9", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10 }}>{a.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{a.label}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Enquiries */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>Recent Enquiries</h2>
          <Link href="/admin/enquiries" style={{ fontSize: 13, color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}>View All →</Link>
        </div>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          {loading ? (
            <div style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading…</div>
          ) : enquiries.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>No enquiries yet</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f1f5f9" }}>
                    {["ID", "Contact", "Product", "Qty", "Location", "Status", "Time", "Action"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.slice(0, 5).map(enq => {
                    const sc = statusColor(enq.status);
                    return (
                      <tr key={enq.id} style={{ borderBottom: "1px solid #f9fafb" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fafafa"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ""}
                      >
                        <td style={{ padding: "12px 16px", fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>{enq.id}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{enq.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{enq.company}</div>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{enq.product}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{enq.qty}</td>
                        <td style={{ padding: "12px 16px", fontSize: 12, color: "#6b7280" }}>{enq.location}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: sc.bg, color: sc.color }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot }} />
                            {enq.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#9ca3af" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Clock size={11} />{timeAgo(enq.time)}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <select value={enq.status} onChange={e => updateStatus(enq.id, e.target.value)}
                            style={{ fontSize: 11, padding: "4px 8px", border: "1px solid #e5e7eb", borderRadius: 6, background: "white", cursor: "pointer", outline: "none" }}>
                            <option value="new">New</option>
                            <option value="responded">Responded</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Checklist */}
      <div style={{ background: "linear-gradient(135deg, #0f2d1a, #1a4d2e)", borderRadius: 16, padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Settings size={18} style={{ color: "#f4a228" }} />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Setup Checklist</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
          {[
            { done: true, task: "Website pages published" },
            { done: true, task: "Product catalogue data loaded" },
            { done: true, task: "Contact form configured" },
            { done: true, task: "Certificates uploaded (PDFs)" },
            { done: true, task: "Email notifications connected" },
            { done: true, task: "Homepage image set" },
            { done: Boolean(data?.adminPassword), task: "Change default admin password" },
            { done: Boolean(storageStatus?.isDeployed), task: "Deploy to production (Vercel)" },
            { done: false, task: "Submit sitemap to Google Search Console", href: "https://search.google.com/search-console" },
          ].map((item, i) => (
            item.href ? (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: item.done ? "#86efac" : "rgba(255,255,255,0.65)", textDecoration: "none" }}>
                {item.done
                  ? <CheckCircle size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                  : <div style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%", flexShrink: 0 }} />}
                {item.task} <span style={{ textDecoration: "underline", flexShrink: 0 }}>→</span>
              </a>
            ) : (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: item.done ? "#86efac" : "rgba(255,255,255,0.65)" }}>
              {item.done
                ? <CheckCircle size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                : <div style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%", flexShrink: 0 }} />}
              {item.task}
            </div>
            )
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
