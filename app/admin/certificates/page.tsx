"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Upload, Trash2, Save, RefreshCw, CheckCircle, AlertCircle, Plus, Edit2, X, Download, GripVertical } from "lucide-react";

const DEFAULT_CERTS = [
  { id: "gst", name: "GST Registration Certificate", code: "24ABPFM7919L1ZK", desc: "Goods and Services Tax Registration Certificate issued by Government of India.", icon: "🇮🇳", file: "/assets/maac-media/certificates/GST-Certificate.pdf", validUntil: "Permanent", issued: "17 Jun 2026", order: 0 },
  { id: "iso9001", name: "ISO 9001:2015", code: "IN59785A", desc: "Quality Management System certification ensuring consistent product quality.", icon: "🏆", file: "/assets/maac-media/certificates/ISO-9001-2015.pdf", validUntil: "11 May 2028", issued: "12 May 2025", order: 1 },
  { id: "iso45001", name: "ISO 45001:2018", code: "IN59785C-1", desc: "Occupational Health & Safety Management System certification.", icon: "🛡️", file: "/assets/maac-media/certificates/ISO-45001-2018.pdf", validUntil: "11 May 2028", issued: "12 May 2025", order: 2 },
  { id: "msme", name: "MSME UDYAM", code: "GJ-25-0006759", desc: "Registered under Ministry of Micro, Small and Medium Enterprises.", icon: "🏛️", file: "/assets/maac-media/certificates/MSME-UDYAM.pdf", validUntil: "Permanent", issued: "01 Mar 2021", order: 3 },
  { id: "iec", name: "IEC — Import/Export Code", code: "ABPFM7919L", desc: "Importer-Exporter Code issued by DGFT, Ministry of Commerce & Industry.", icon: "🌏", file: "/assets/maac-media/certificates/IEC-certificate.pdf", validUntil: "Permanent", issued: "31 Mar 2023", order: 4 },
  { id: "dnb", name: "D&B DUNS", code: "813884357", desc: "Dun & Bradstreet registered business identity number.", icon: "✅", file: null, validUntil: "Active", issued: "Registered", order: 5 },
  { id: "indiamart", name: "IndiaMART TrustSEAL", code: "Certified July 2024", desc: "IndiaMart TrustSEAL verified supplier with authenticated business credentials.", icon: "🔏", file: "/assets/maac-media/certificates/IndiaMART-TrustSEAL.pdf", validUntil: "Active", issued: "July 2024", order: 6 },
];

type Cert = typeof DEFAULT_CERTS[0];

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Cert[]>(DEFAULT_CERTS);
  const [isCustom, setIsCustom] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Cert | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    adminGet().then(d => {
      if (d.certificateOverrides) { setCerts(d.certificateOverrides); setIsCustom(true); }
    });
  }, []);

  const save = async (updated: Cert[]) => {
    setSaved(false);
    await adminPost("certificates_save", { certificates: updated });
    setSaved(true); setIsCustom(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetToDefault = async () => {
    if (!confirm("Reset all certificates to default? Custom uploads will remain but info will reset.")) return;
    await adminPost("certificates_reset", {});
    setCerts(DEFAULT_CERTS); setIsCustom(false);
  };

  const handleFileUpload = async (certId: string, file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Only PDF files are allowed."); return; }
    setError(""); setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", `cert-${certId}`);
      const token = sessionStorage.getItem("maac_admin_token") || "";
      const res = await fetch("/api/admin/upload", { method: "POST", headers: { "x-admin-token": token }, body: formData });
      const data = await res.json();
      if (data.success) {
        setEditing(prev => prev ? { ...prev, file: data.path } : null);
      } else setError(data.error || "Upload failed.");
    } catch { setError("Upload failed."); }
    setUploading(false);
  };

  const saveEdit = async () => {
    if (!editing) return;
    let updated: Cert[];
    if (isNew) updated = [...certs, { ...editing, order: certs.length }];
    else updated = certs.map(c => c.id === editing.id ? editing : c);
    setCerts(updated);
    await save(updated);
    setEditing(null); setIsNew(false);
  };

  const deleteCert = async (id: string) => {
    if (!confirm("Remove this certificate?")) return;
    const updated = certs.filter(c => c.id !== id).map((c, i) => ({ ...c, order: i }));
    setCerts(updated);
    await save(updated);
  };

  const startNew = () => {
    setEditing({ id: `cert-${Date.now()}`, name: "", code: "", desc: "", icon: "📄", file: null, validUntil: "", issued: "", order: certs.length });
    setIsNew(true);
  };

  const inp = (label: string, key: keyof Cert, placeholder?: string) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
      <input value={(editing?.[key] as string) || ""} onChange={e => setEditing(prev => prev ? { ...prev, [key]: e.target.value } : null)} placeholder={placeholder}
        style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
    </div>
  );

  const cardStyle = { background: "white", borderRadius: 12, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  if (editing) return (
    <AdminShell title={isNew ? "Add Certificate" : "Edit Certificate"}>
      <div style={{ maxWidth: 600 }}>
        <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}><X size={14} /> Cancel</button>
        <div style={{ ...cardStyle, padding: 24 }}>
          {inp("Certificate Name *", "name", "e.g. ISO 9001:2015")}
          {inp("Certificate Code/Number", "code", "e.g. IN59785A")}
          {inp("Icon (Emoji)", "icon", "e.g. 🏆")}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Description</label>
            <textarea value={editing?.desc || ""} onChange={e => setEditing(prev => prev ? { ...prev, desc: e.target.value } : null)} rows={3}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          {inp("Valid Until", "validUntil", "e.g. 11 May 2028 or Permanent")}
          {inp("Issued Date", "issued", "e.g. 12 May 2025")}

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Certificate PDF</label>
            {editing.file && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#15803d", flex: 1 }}>{editing.file.split("/").pop()}</span>
                <a href={editing.file} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}>Preview</a>
                <button onClick={() => setEditing(prev => prev ? { ...prev, file: null } : null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}><X size={12} /></button>
              </div>
            )}
            <input type="file" accept=".pdf" ref={el => { fileRefs.current[editing.id] = el; }} style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(editing.id, f); }} />
            <button onClick={() => fileRefs.current[editing.id]?.click()} disabled={uploading}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: uploading ? "#e5e7eb" : "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: uploading ? "not-allowed" : "pointer", fontWeight: 600 }}>
              <Upload size={14} />{uploading ? "Uploading..." : "Upload PDF"}
            </button>
          </div>

          {error && <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 14 }}>{error}</div>}

          <button onClick={saveEdit} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            <Save size={14} /> {isNew ? "Add Certificate" : "Save Changes"}
          </button>
        </div>
      </div>
    </AdminShell>
  );

  return (
    <AdminShell title="Quality Certificates">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontSize: 13, color: "#6b7280" }}>Manage certificates shown on the Quality page. Changes reflect immediately.</p>
          {isCustom && <span style={{ fontSize: 11, background: "#fef3c7", color: "#a16207", padding: "2px 8px", borderRadius: 999, fontWeight: 600 }}>Using custom certificate data</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {isCustom && <button onClick={resetToDefault} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: 999, background: "white", fontSize: 13, cursor: "pointer", color: "#6b7280" }}><RefreshCw size={13} /> Reset to Default</button>}
          <button onClick={startNew} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 18px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer" }}><Plus size={14} /> Add Certificate</button>
        </div>
      </div>

      {saved && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <CheckCircle size={16} style={{ color: "#15803d" }} />
          <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>Certificates updated! Changes are live on the Quality page.</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {certs.sort((a, b) => a.order - b.order).map(cert => (
          <div key={cert.id} style={{ ...cardStyle, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>{cert.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{cert.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                {cert.code && <span style={{ marginRight: 10 }}>Code: {cert.code}</span>}
                {cert.issued && <span style={{ marginRight: 10 }}>Issued: {cert.issued}</span>}
                {cert.validUntil && <span>Valid: {cert.validUntil}</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
              {cert.file ? (
                <a href={cert.file} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none" }}><Download size={12} /> PDF</a>
              ) : (
                <span style={{ fontSize: 11, color: "#9ca3af", padding: "5px 10px" }}>No PDF</span>
              )}
              <button onClick={() => { setEditing(cert); setIsNew(false); }} style={{ padding: "5px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#1a4d2e", display: "flex", alignItems: "center" }}><Edit2 size={13} /></button>
              <button onClick={() => deleteCert(cert.id)} style={{ padding: "5px 10px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center" }}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
