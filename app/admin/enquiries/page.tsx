"use client";
import { useState, useEffect } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Search, Phone, Mail, Package, MapPin, Clock, MessageSquare, Filter } from "lucide-react";

interface Enquiry {
  id: string; name: string; company: string; product: string; qty: string;
  location: string; status: string; time: string; mobile: string; email: string; message: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    adminGet().then(d => { setEnquiries(d.enquiries || []); setLoading(false); });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await adminPost("enquiry_status", { id, status });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
  };

  const filtered = enquiries.filter(e => {
    const matchSearch = !search || [e.name, e.company, e.product, e.location, e.id].some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = { all: enquiries.length, new: enquiries.filter(e => e.status === "new").length, responded: enquiries.filter(e => e.status === "responded").length, closed: enquiries.filter(e => e.status === "closed").length };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(h / 24);
    return d > 0 ? `${d}d ago` : h > 0 ? `${h}h ago` : "Just now";
  };

  const sc = (s: string) => s === "new" ? { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" } : s === "responded" ? { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" } : { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" };

  return (
    <AdminShell title="Enquiries">
      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 360 }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, product, company…"
            style={{ width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "white" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "new", "responded", "closed"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: filter === f ? "#1a4d2e" : "white", color: filter === f ? "white" : "#6b7280", boxShadow: filter === f ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 16 }}>
        {/* Table */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>
              <MessageSquare size={32} style={{ margin: "0 auto 8px", opacity: 0.3 }} />
              No enquiries found
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f1f5f9" }}>
                    {["ID", "Contact", "Product", "Qty", "Location", "Status", "Time"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(enq => {
                    const c = sc(enq.status);
                    return (
                      <tr key={enq.id} onClick={() => setSelected(selected?.id === enq.id ? null : enq)}
                        style={{ borderBottom: "1px solid #f9fafb", cursor: "pointer", background: selected?.id === enq.id ? "#f0fdf4" : "" }}
                        onMouseEnter={e => { if (selected?.id !== enq.id) (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
                        onMouseLeave={e => { if (selected?.id !== enq.id) (e.currentTarget as HTMLElement).style.background = ""; }}
                      >
                        <td style={{ padding: "12px 14px", fontSize: 11, fontFamily: "monospace", color: "#6b7280", whiteSpace: "nowrap" }}>{enq.id}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{enq.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{enq.company}</div>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{enq.product}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>{enq.qty}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: "#6b7280" }}>{enq.location}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: c.bg, color: c.color, whiteSpace: "nowrap" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot }} />{enq.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{timeAgo(enq.time)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", height: "fit-content", position: "sticky", top: 84 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{selected.company} · {selected.id}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20 }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {[
                { icon: Package, label: "Product", value: selected.product },
                { icon: Package, label: "Quantity", value: selected.qty },
                { icon: MapPin, label: "Location", value: selected.location },
                { icon: Clock, label: "Received", value: timeAgo(selected.time) },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <row.icon size={14} style={{ color: "#f4a228", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{row.label}</div>
                    <div style={{ fontSize: 13, color: "#111827", fontWeight: 500 }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {selected.message && (
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                "{selected.message}"
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {selected.mobile && (
                <a href={`tel:${selected.mobile}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "#f0fdf4", borderRadius: 8, textDecoration: "none", color: "#1a4d2e", fontSize: 13, fontWeight: 600 }}>
                  <Phone size={14} /> {selected.mobile}
                </a>
              )}
              {selected.email && (
                <a href={`mailto:${selected.email}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "#f0fdf4", borderRadius: 8, textDecoration: "none", color: "#1a4d2e", fontSize: 13, fontWeight: 600 }}>
                  <Mail size={14} /> {selected.email}
                </a>
              )}
              <a href={`https://wa.me/${(selected.mobile || "").replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(selected.name)}%2C%20thank%20you%20for%20your%20enquiry%20about%20${encodeURIComponent(selected.product)}.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "#25D366", borderRadius: 8, textDecoration: "none", color: "white", fontSize: 13, fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Reply
              </a>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Update Status</label>
              <div style={{ display: "flex", gap: 6 }}>
                {["new", "responded", "closed"].map(s => {
                  const c = sc(s);
                  return (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      style={{ flex: 1, padding: "7px 4px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: `1px solid ${selected.status === s ? c.dot : "#e5e7eb"}`, background: selected.status === s ? c.bg : "white", color: selected.status === s ? c.color : "#6b7280", cursor: "pointer" }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
