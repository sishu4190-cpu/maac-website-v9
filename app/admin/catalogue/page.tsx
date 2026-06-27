"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Upload, FileText, CheckCircle, RefreshCw, Download, AlertCircle, X } from "lucide-react";

export default function CataloguePage() {
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedName, setUploadedName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    adminGet().then(d => setCurrentFile(d.catalogueFile || null));
  }, []);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Only PDF files are allowed."); return; }
    if (file.size > 20 * 1024 * 1024) { setError("File size must be under 20 MB."); return; }
    setError(""); setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "catalogue");
      const token = sessionStorage.getItem("maac_admin_token") || "";
      const res = await fetch("/api/admin/upload", { method: "POST", headers: { "x-admin-token": token }, body: formData });
      const data = await res.json();
      if (data.success) {
        await adminPost("catalogue_update", { file: data.path });
        setCurrentFile(data.path);
        setUploadedName(file.name);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else setError(data.error || "Upload failed.");
    } catch { setError("Upload failed. Please try again."); }
    setUploading(false);
  };

  const handleReset = async () => {
    if (!confirm("Reset to default catalogue?")) return;
    await adminPost("catalogue_reset", {});
    setCurrentFile(null);
    setUploadedName("");
  };

  const cardStyle = { background: "white", borderRadius: 12, border: "1px solid #f1f5f9", padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  return (
    <AdminShell title="Product Catalogue PDF">
      <div style={{ maxWidth: 700 }}>
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>📄 Current Catalogue</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            This PDF is linked on the website's "Download Catalogue" button and footer. Upload a new version to replace it instantly.
          </p>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 16, display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <FileText size={24} style={{ color: "#1a4d2e", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a4d2e" }}>
                {currentFile ? currentFile.split("/").pop() : "MAAC-Product-Catalogue.pdf (default)"}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                {currentFile ? "Custom uploaded file" : "Using default catalogue from /assets/maac-media/certificates/"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={currentFile || "/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf"} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", background: "#1a4d2e", color: "white", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                <Download size={12} /> Preview
              </a>
              {currentFile && (
                <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", fontSize: 12, color: "#6b7280", cursor: "pointer" }}>
                  <RefreshCw size={12} /> Reset
                </button>
              )}
            </div>
          </div>

          {(saved || uploadedName) && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <CheckCircle size={16} style={{ color: "#15803d" }} />
              <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>Catalogue updated successfully! Changes are live on the website.</span>
            </div>
          )}

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <AlertCircle size={16} style={{ color: "#dc2626" }} />
              <span style={{ fontSize: 13, color: "#dc2626" }}>{error}</span>
              <button onClick={() => setError("")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}><X size={14} /></button>
            </div>
          )}

          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileRef.current?.click()}
            style={{ border: `2px dashed ${dragOver ? "#1a4d2e" : "#d1d5db"}`, borderRadius: 12, padding: 40, textAlign: "center", cursor: "pointer", background: dragOver ? "#f0fdf4" : "#fafafa", transition: "all 0.2s" }}>
            <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            {uploading ? (
              <div>
                <div style={{ width: 40, height: 40, border: "3px solid #1a4d2e", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
                <p style={{ fontSize: 14, color: "#1a4d2e", fontWeight: 600 }}>Uploading...</p>
              </div>
            ) : (
              <div>
                <Upload size={32} style={{ color: dragOver ? "#1a4d2e" : "#9ca3af", margin: "0 auto 12px" }} />
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Drag & Drop PDF here</p>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>or click to browse files</p>
                <span style={{ fontSize: 12, background: "#1a4d2e", color: "white", padding: "6px 18px", borderRadius: 999, fontWeight: 600 }}>Select PDF File</span>
                <p style={{ fontSize: 11, color: "#d1d5db", marginTop: 12 }}>Max file size: 20 MB · PDF only</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ ...cardStyle, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 8 }}>💡 How This Works</h3>
          <ul style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
            <li>Upload a new PDF to replace the product catalogue on the website</li>
            <li>The "Download Catalogue" button on the website will serve this file</li>
            <li>File is saved to <code>/public/assets/uploads/</code> folder</li>
            <li>Click "Reset" to go back to the default catalogue file</li>
          </ul>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AdminShell>
  );
}
