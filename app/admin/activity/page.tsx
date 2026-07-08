"use client";
import { useState, useEffect, useCallback } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet } from "../lib/api";
import { Search, RefreshCw, History, Clock } from "lucide-react";

interface ActivityLogEntry {
  id: string;
  section: string;
  label: string;
  detail: string;
  timestamp: string;
}

function formatWhen(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  return { day, time };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const SECTION_GROUPS: Record<string, string> = {
  contact: "Settings", settings: "Settings", password_change: "Settings",
  enquiry_status: "Enquiries", enquiry_notes: "Enquiries", enquiry_delete: "Enquiries", add_enquiry: "Enquiries",
  blog_add: "Blog", blog_update: "Blog", blog_delete: "Blog", blog_toggle_publish: "Blog",
  product_add: "Products", product_update: "Products", product_delete: "Products", product_toggle_hide: "Products",
  product_override_save: "Products", product_override_reset: "Products", category_add: "Products", category_delete: "Products",
  coa_map: "Products", coa_unmap: "Products",
  certificates_save: "Certificates", certificates_reset: "Certificates",
  gallery_cover_save: "Gallery", gallery_info_save: "Gallery", gallery_image_add: "Gallery",
  gallery_image_update: "Gallery", gallery_image_delete: "Gallery",
  catalogue_update: "Catalogue", catalogue_reset: "Catalogue",
  password_reset_otp_verify: "Settings",
};

export default function ActivityLogPage() {
  const [log, setLog] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");

  const load = useCallback(() => {
    setLoading(true);
    adminGet().then(d => { setLog(d.activityLog || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const groups = ["all", ...Array.from(new Set(Object.values(SECTION_GROUPS)))];

  const filtered = log.filter(e => {
    const group = SECTION_GROUPS[e.section] || "Other";
    const matchGroup = filterGroup === "all" || group === filterGroup;
    const matchSearch = !search || [e.label, e.detail, e.section].some(v => v.toLowerCase().includes(search.toLowerCase()));
    return matchGroup && matchSearch;
  });

  const cardStyle = { background: "white", borderRadius: 12, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  return (
    <AdminShell title="Activity Log">
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
        Every change made anywhere in the admin panel is recorded here automatically — what changed, and the exact date, day, and time it happened.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activity…"
            style={{ width: "100%", padding: "9px 12px 9px 34px", border: "1px solid #e5e7eb", borderRadius: 999, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
          style={{ padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: 999, fontSize: 13, background: "white" }}>
          {groups.map(g => <option key={g} value={g}>{g === "all" ? "All sections" : g}</option>)}
        </select>
        <button onClick={load} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <RefreshCw size={13} /> Refresh
        </button>
        <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: "auto" }}>{filtered.length} of {log.length} entries</span>
      </div>

      {loading ? (
        <p style={{ fontSize: 13, color: "#6b7280" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div style={{ ...cardStyle, padding: 40, textAlign: "center", color: "#9ca3af" }}>
          <History size={32} style={{ margin: "0 auto 10px" }} />
          <p style={{ fontSize: 13 }}>{log.length === 0 ? "No activity recorded yet — changes you make in the admin panel will appear here." : "No entries match your search/filter."}</p>
        </div>
      ) : (
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          {filtered.map((entry, i) => {
            const { day, time } = formatWhen(entry.timestamp);
            const group = SECTION_GROUPS[entry.section] || "Other";
            return (
              <div key={entry.id} style={{ padding: "14px 18px", borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Clock size={15} style={{ color: "#1a4d2e" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>{entry.label}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "#1a4d2e", background: "#f0fdf4", padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.3 }}>{group}</span>
                  </div>
                  {entry.detail && <div style={{ fontSize: 12.5, color: "#6b7280", marginBottom: 4 }}>{entry.detail}</div>}
                  <div style={{ fontSize: 11.5, color: "#9ca3af" }}>{day} at {time} &middot; {timeAgo(entry.timestamp)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
