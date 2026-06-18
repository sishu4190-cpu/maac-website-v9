"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, CheckCircle, ArrowLeft, X, Download } from "lucide-react";

const docTypes = [
  { value: "catalogue", label: "Product Catalogue" },
  { value: "iso-9001", label: "ISO 9001:2015 Certificate" },
  { value: "iso-45001", label: "ISO 45001:2018 Certificate" },
  { value: "msme", label: "MSME UDYAM Certificate" },
  { value: "iec", label: "IEC Certificate" },
  { value: "indiamart", label: "IndiaMART TrustSEAL" },
  { value: "coa", label: "Certificate of Analysis (COA)" },
  { value: "msds", label: "MSDS / Safety Data Sheet" },
  { value: "other", label: "Other Document" },
];

const existingDocs = [
  { name: "MAAC Product Catalogue", file: "MAAC-Product-Catalogue.pdf", type: "catalogue", updated: "Jun 2025" },
  { name: "ISO 9001:2015 Certificate", file: "ISO-9001-2015.pdf", type: "iso-9001", updated: "May 2025" },
  { name: "ISO 45001:2018 Certificate", file: "ISO-45001-2018.pdf", type: "iso-45001", updated: "May 2025" },
  { name: "MSME UDYAM Certificate", file: "MSME-UDYAM.pdf", type: "msme", updated: "Apr 2025" },
  { name: "IEC Certificate", file: "IEC-certificate.pdf", type: "iec", updated: "Mar 2023" },
  { name: "IndiaMART TrustSEAL", file: "IndiaMART-TrustSEAL.pdf", type: "indiamart", updated: "Jul 2024" },
];

export default function DocumentsUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("File too large. Max size is 20MB.");
      return;
    }
    setSelectedFile(file);
    setSuccess(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !docType) {
      alert("Please select a file and document type.");
      return;
    }
    setUploading(true);
    // Simulate upload — in production connect to your storage (Firebase/S3/local)
    await new Promise(r => setTimeout(r, 1800));
    setUploading(false);
    setSuccess(true);
    // Note: actual file saving needs backend API route
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a4d2e, #0f2d1a)", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
        <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Documents & Uploads</span>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Upload Card */}
        <div style={{ background: "white", borderRadius: 16, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>Upload New Document</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
            Upload PDF documents to replace existing certificates, catalogue, COA, or MSDS files on the website.
          </p>

          {/* Document Type */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
              Document Type <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={docType}
              onChange={e => setDocType(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, background: "white", outline: "none" }}
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
              padding: "2.5rem",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "#f0fdf4" : selectedFile ? "#f0fdf4" : "#fafafa",
              transition: "all 0.2s",
              marginBottom: 20,
            }}
          >
            <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {selectedFile ? (
              <div>
                <CheckCircle size={36} style={{ color: "#4caf50", margin: "0 auto 10px" }} />
                <div style={{ fontWeight: 600, color: "#1a4d2e", fontSize: 15 }}>{selectedFile.name}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{(selectedFile.size / 1024).toFixed(1)} KB</div>
                <button onClick={e => { e.stopPropagation(); setSelectedFile(null); }} style={{ marginTop: 10, fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <X size={12} /> Remove
                </button>
              </div>
            ) : (
              <div>
                <Upload size={36} style={{ color: "#9ca3af", margin: "0 auto 10px" }} />
                <div style={{ fontWeight: 600, color: "#374151", fontSize: 15 }}>Click to select PDF or drag & drop</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>PDF only · Max 20MB</div>
              </div>
            )}
          </div>

          {/* Note about actual upload */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#92400e" }}>
            <strong>Important:</strong> To permanently replace a file on the website, manually place the new PDF in:<br />
            <code style={{ fontFamily: "monospace", background: "#fef3c7", padding: "2px 6px", borderRadius: 4, display: "inline-block", marginTop: 4 }}>
              public/assets/maac-media/certificates/
            </code>
            <br />
            <span style={{ marginTop: 6, display: "block" }}>Use the same filename as the existing file to auto-replace it.</span>
          </div>

          {success && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 14, color: "#15803d", display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={16} /> File selected successfully. Remember to copy it to the certificates folder.
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFile || !docType || uploading}
            style={{
              background: !selectedFile || !docType ? "#e5e7eb" : "linear-gradient(135deg, #1a4d2e, #2d6e47)",
              color: !selectedFile || !docType ? "#9ca3af" : "white",
              border: "none", borderRadius: 999, padding: "12px 28px",
              fontSize: 15, fontWeight: 600, cursor: !selectedFile || !docType ? "not-allowed" : "pointer",
              display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
          >
            {uploading ? "Processing…" : <><Upload size={16} /> Upload Document</>}
          </button>
        </div>

        {/* Existing Documents */}
        <div style={{ background: "white", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>Current Documents on Website</h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>These files are served from <code style={{ fontFamily: "monospace", background: "#f3f4f6", padding: "1px 6px", borderRadius: 4 }}>public/assets/maac-media/certificates/</code></p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {existingDocs.map(doc => (
              <div key={doc.file} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fafafa" }}>
                <FileText size={20} style={{ color: "#f4a228", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e1c" }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>{doc.file}</div>
                </div>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Updated: {doc.updated}</span>
                <a
                  href={`/assets/maac-media/certificates/${doc.file}`}
                  download
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none", padding: "6px 12px", border: "1px solid #1a4d2e", borderRadius: 999 }}
                >
                  <Download size={12} /> View
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
