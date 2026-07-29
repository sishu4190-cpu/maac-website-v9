"use client";
import Link from "next/link";
import AdminShell from "../lib/AdminShell";
import { Upload, FileText, Download } from "lucide-react";

const docs = [
  { name: "MAAC Product Catalogue", file: "MAAC-Product-Catalogue.pdf", updated: "Jun 2025" },
  { name: "ISO 9001:2015 Certificate", file: "ISO-9001-2015.pdf", updated: "May 2025" },
  { name: "ISO 45001:2018 Certificate", file: "ISO-45001-2018.pdf", updated: "May 2025" },
  { name: "MSME UDYAM Certificate", file: "MSME-UDYAM.pdf", updated: "Apr 2025" },
  { name: "IEC Certificate", file: "IEC-certificate.pdf", updated: "Mar 2023" },
  { name: "IndiaMART TrustSEAL", file: "IndiaMART-TrustSEAL.pdf", updated: "Jul 2024" },
];

export default function DocumentsPage() {
  return (
    <AdminShell title="Documents">
      <div className="admin-toolbar" style={{ marginBottom: 20, justifyContent: "space-between" }}>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
          Reference copies of key PDFs. For certificate images shown on the Quality page, use the <Link href="/admin/certificates" style={{ color: "#1a4d2e", fontWeight: 600 }}>Certificates</Link> section instead.
        </p>
        <Link href="/admin/documents/upload" style={{ background: "#f4a228", color: "white", padding: "8px 18px", borderRadius: 999, fontWeight: 600, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <Upload size={14} /> Upload New
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", maxWidth: 800 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1a4d2e", marginBottom: 18 }}>All Documents</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {docs.map(doc => (
            <div key={doc.file} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "14px 16px", border: "1px solid #e5e7eb", borderRadius: 10 }}>
              <FileText size={20} style={{ color: "#f4a228", flexShrink: 0 }} />
              <div style={{ flex: "1 1 180px", minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a2e1c" }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{doc.file} · Updated {doc.updated}</div>
              </div>
              <a href={`/assets/maac-media/certificates/${doc.file}`} download
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#1a4d2e", fontWeight: 600, textDecoration: "none", padding: "6px 14px", border: "1px solid #1a4d2e", borderRadius: 999, flexShrink: 0 }}>
                <Download size={12} /> Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
