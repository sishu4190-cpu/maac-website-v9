"use client";
import { useState, useEffect, useCallback } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Search, Download, MessageCircle, ChevronDown, ChevronUp, Mail, Phone, RefreshCw } from "lucide-react";

interface Enquiry {
  id: string; name: string; company: string; mobile: string; email?: string;
  product: string; grade?: string; quantity: string; packaging?: string;
  deliveryLocation: string; application?: string; message?: string;
  status: string; notes?: string; createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "#dcfce7", text: "#15803d" },
  { value: "contacted", label: "Contacted", color: "#dbeafe", text: "#1e40af" },
  { value: "qualified", label: "Qualified", color: "#e9d5ff", text: "#7e22ce" },
  { value: "quotation_sent", label: "Quotation Sent", color: "#fef3c7", text: "#a16207" },
  { value: "won", label: "Won ✓", color: "#dcfce7", text: "#166534" },
  { value: "lost", label: "Lost", color: "#fee2e2", text: "#b91c1c" },
];

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<{ id: string; text: string } | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminGet().then(d => {
      setEnquiries(d.enquiries || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = enquiries.filter(e => {
    const matchSearch = !search || [e.name, e.company, e.product, e.mobile, e.email || ""].some(v => v.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: string) => {
    await adminPost("enquiry_status", { id, status });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const saveNote = async (id: string, notes: string) => {
    await adminPost("enquiry_notes", { id, notes });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, notes } : e));
    setEditingNote(null);
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Company", "Mobile", "Email", "Product", "Grade", "Quantity", "Location", "Status", "Date"];
    const rows = filtered.map(e => [
      e.id, e.name, e.company, e.mobile, e.email || "", e.product, e.grade || "",
      e.quantity, e.deliveryLocation, e.status, new Date(e.createdAt).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `MAAC-Enquiries-${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const newCount = enquiries.filter(e => e.status === "new").length;

  return (
    <AdminShell title="Enquiries">
      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total", value: enquiries.length, color: "#1a4d2e" },
          { label: "New", value: newCount, color: "#15803d" },
          { label: "In Progress", value: enquiries.filter(e => ["contacted","qualified","quotation_sent"].includes(e.status)).length, color: "#1e40af" },
          { label: "Won", value: enquiries.filter(e => e.status === "won").length, color: "#7e22ce" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #f1f5f9", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 320 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, company, product…"
            style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, background: "white", outline: "none" }}>
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button onClick={load} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <RefreshCw size={14} style={{ color: "#6b7280" }} />
        </button>
        <button onClick={exportCSV} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#f4a228", color: "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", padding: 48, textAlign: "center" }}>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>{search || filterStatus !== "all" ? "No enquiries match your filter." : "No enquiries yet. They appear here when buyers submit the contact form."}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(e => {
            const st = getStatusStyle(e.status);
            return (
              <div key={e.id} style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}
                  onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{e.name}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>{e.company}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600, background: st.color, color: st.text }}>{st.label}</span>
                      {e.status === "new" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />}
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <span>📦 {e.product}</span>
                      <span>⚖️ {e.quantity}</span>
                      <span>📍 {e.deliveryLocation}</span>
                      <span>{timeAgo(e.createdAt)}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
                    <a href={`https://wa.me/${e.mobile.replace(/\D/g, "")}?text=Hello ${e.name}, this is Mangalam Acid and Chemicals. Regarding your enquiry for ${e.product}.`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={ev => ev.stopPropagation()}
                      style={{ padding: "6px 10px", background: "#25D366", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", textDecoration: "none" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                    {expandedId === e.id ? <ChevronUp size={15} style={{ color: "#9ca3af" }} /> : <ChevronDown size={15} style={{ color: "#9ca3af" }} />}
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedId === e.id && (
                  <div style={{ padding: "16px", borderTop: "1px solid #f9fafb", background: "#fafafa" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
                      {[
                        { label: "Mobile", value: e.mobile, icon: <Phone size={12} /> },
                        { label: "Email", value: e.email || "—", icon: <Mail size={12} /> },
                        { label: "Product", value: e.product },
                        { label: "Grade", value: e.grade || "—" },
                        { label: "Quantity", value: e.quantity },
                        { label: "Packaging", value: e.packaging || "—" },
                        { label: "Application", value: e.application || "—" },
                        { label: "Enquiry ID", value: e.id },
                      ].map(({ label, value, icon }) => (
                        <div key={label}>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, display: "flex", alignItems: "center", gap: 4 }}>{icon}{label}</div>
                          <div style={{ fontSize: 13, color: "#111827", fontWeight: 500 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                    {e.message && <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#4b5563", marginBottom: 14 }}>{e.message}</div>}

                    {/* Status + Notes */}
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>Update Status</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {STATUS_OPTIONS.map(s => (
                            <button key={s.value} onClick={() => updateStatus(e.id, s.value)}
                              style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: `1px solid ${e.status === s.value ? s.text : "#e5e7eb"}`, background: e.status === s.value ? s.color : "white", color: e.status === s.value ? s.text : "#6b7280", cursor: "pointer", fontWeight: e.status === s.value ? 700 : 400 }}>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 5 }}>Internal Note</div>
                        {editingNote?.id === e.id ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <input value={editingNote.text} onChange={ev => setEditingNote({ id: e.id, text: ev.target.value })}
                              style={{ flex: 1, padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                            <button onClick={() => saveNote(e.id, editingNote.text)} style={{ padding: "6px 12px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Save</button>
                            <button onClick={() => setEditingNote(null)} style={{ padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                          </div>
                        ) : (
                          <div onClick={() => setEditingNote({ id: e.id, text: e.notes || "" })}
                            style={{ padding: "6px 10px", border: "1px dashed #d1d5db", borderRadius: 8, fontSize: 12, color: e.notes ? "#374151" : "#9ca3af", cursor: "pointer", minHeight: 32 }}>
                            {e.notes || "Click to add note…"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </AdminShell>
  );
}
