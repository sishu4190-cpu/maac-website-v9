"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import AdminShell from "../../lib/AdminShell";
import { uploadFile } from "../../lib/upload";
import { Upload, CheckCircle, X, Copy, Award, FileArchive } from "lucide-react";

const docTypes = [
  { value: "coa", label: "Certificate of Analysis (COA)" },
  { value: "msds", label: "MSDS / Safety Data Sheet" },
  { value: "other", label: "Other Document" },
];

export default function DocumentsUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("File too large. Max size is 20MB.");
      return;
    }
    setError("");
    setSelectedFile(file);
    setUploadedUrl("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !docType) {
      setError("Please select a file and document type.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const path = await uploadFile(selectedFile, `document-${docType}`);
      setUploadedUrl(path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    }
    setUploading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(uploadedUrl);
  };

  return (
    <AdminShell title="Upload Document">
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#1e40af" }}>
        For product catalogue or company certificates (ISO, MSME, IEC, GST, etc.), use the dedicated{" "}
        <Link href="/admin/catalogue" style={{ fontWeight: 700 }}>Catalogue PDF</Link> or{" "}
        <Link href="/admin/certificates" style={{ fontWeight: 700 }}>Certificates</Link> pages instead — they attach the file automatically. Use this page for COA, MSDS, or other one-off documents.
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Upload Card */}
        <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>Upload New Document</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Uploads directly to permanent storage and gives you a shareable link.
          </p>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Document Type <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={docType}
              onChange={e => setDocType(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, background: "white", outline: "none", boxSizing: "border-box" }}
            >
              <option value="">— Select document type —</option>
              {docTypes.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "#1a4d2e" : selectedFile ? "#4caf50" : "#d1d5db"}`,
              borderRadius: 12,
              padding: "2rem 1rem",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver || selectedFile ? "#f0fdf4" : "#fafafa",
              transition: "all 0.2s",
              marginBottom: 16,
            }}
          >
            <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {selectedFile ? (
              <div>
                <CheckCircle size={32} style={{ color: "#4caf50", margin: "0 auto 10px" }} />
                <div style={{ fontWeight: 600, color: "#1a4d2e", fontSize: 14, wordBreak: "break-word" }}>{selectedFile.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{(selectedFile.size / 1024).toFixed(1)} KB</div>
                <button onClick={e => { e.stopPropagation(); setSelectedFile(null); setUploadedUrl(""); }} style={{ marginTop: 10, fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <X size={12} /> Remove
                </button>
              </div>
            ) : (
              <div>
                <Upload size={32} style={{ color: "#9ca3af", margin: "0 auto 10px" }} />
                <div style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>Tap to select PDF or drag & drop</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>PDF only · Max 20MB</div>
              </div>
            )}
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
              {error}
            </div>
          )}

          {uploadedUrl && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#15803d" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontWeight: 700 }}>
                <CheckCircle size={16} /> Uploaded successfully
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <code style={{ fontSize: 11, background: "white", padding: "6px 10px", borderRadius: 6, wordBreak: "break-all", flex: "1 1 200px", border: "1px solid #d1fae5" }}>{uploadedUrl}</code>
                <button onClick={copyLink} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#15803d", background: "white", border: "1px solid #86efac", borderRadius: 999, padding: "6px 12px", cursor: "pointer", flexShrink: 0 }}>
                  <Copy size={12} /> Copy Link
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || !docType || uploading}
            style={{
              width: "100%",
              background: !selectedFile || !docType ? "#e5e7eb" : "linear-gradient(135deg, #1a4d2e, #2d6e47)",
              color: !selectedFile || !docType ? "#9ca3af" : "white",
              border: "none", borderRadius: 999, padding: "12px 28px",
              fontSize: 14, fontWeight: 700, cursor: !selectedFile || !docType ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s",
            }}
          >
            {uploading ? "Uploading…" : <><Upload size={16} /> Upload Document</>}
          </button>
        </div>

        {/* Quick links to the proper dedicated sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <Link href="/admin/certificates" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "white", border: "1px solid #e5e7eb", borderRadius: 12, textDecoration: "none" }}>
            <Award size={20} style={{ color: "#1a4d2e", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>Certificates</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>GST, ISO, MSME, IEC & more</div>
            </div>
          </Link>
          <Link href="/admin/catalogue" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "white", border: "1px solid #e5e7eb", borderRadius: 12, textDecoration: "none" }}>
            <FileArchive size={20} style={{ color: "#1a4d2e", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>Catalogue PDF</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>Main product catalogue</div>
            </div>
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
