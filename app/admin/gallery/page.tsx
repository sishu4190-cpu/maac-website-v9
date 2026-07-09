"use client";
import { useState, useEffect, useRef } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { uploadFile } from "../lib/upload";
import { Upload, Trash2, ArrowLeft, CheckCircle, Image as ImageIcon, Clock } from "lucide-react";

interface GalleryImage { id: string; url: string; caption?: string }
interface GalleryCategory {
  id: string; name: string; tagline: string; cover: string | null;
  images: GalleryImage[]; comingSoon?: boolean;
}

export default function GalleryAdminPage() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const imagesRef = useRef<HTMLInputElement | null>(null);

  const load = () => {
    adminGet().then((d) => { setCategories(d.galleryCategories || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const upload = async (file: File, type: string): Promise<string | null> => {
    try {
      return await uploadFile(file, type);
    } catch {
      return null;
    }
  };

  const active = categories.find((c) => c.id === activeId) || null;

  const handleCoverUpload = async (file: File) => {
    if (!active) return;
    setUploadingCover(true);
    const path = await upload(file, `gallery-cover-${active.id}`);
    if (path) {
      await adminPost("gallery_cover_save", { categoryId: active.id, cover: path });
      setCategories((prev) => prev.map((c) => (c.id === active.id ? { ...c, cover: path } : c)));
      flash();
    }
    setUploadingCover(false);
  };

  const handleImagesUpload = async (files: FileList) => {
    if (!active) return;
    setUploadingImages(true);
    for (const file of Array.from(files)) {
      const path = await upload(file, `gallery-img-${active.id}`);
      if (path) {
        const image = { id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, url: path, caption: "" };
        await adminPost("gallery_image_add", { categoryId: active.id, image });
        setCategories((prev) => prev.map((c) => (c.id === active.id ? { ...c, images: [...c.images, image] } : c)));
      }
    }
    flash();
    setUploadingImages(false);
  };

  const deleteImage = async (imageId: string) => {
    if (!active) return;
    if (!confirm("Remove this photo?")) return;
    await adminPost("gallery_image_delete", { categoryId: active.id, imageId });
    setCategories((prev) => prev.map((c) => (c.id === active.id ? { ...c, images: c.images.filter((i) => i.id !== imageId) } : c)));
  };

  const updateCaption = async (imageId: string, caption: string) => {
    if (!active) return;
    setCategories((prev) => prev.map((c) => (c.id === active.id ? { ...c, images: c.images.map((i) => (i.id === imageId ? { ...i, caption } : i)) } : c)));
  };
  const saveCaption = async (imageId: string, caption: string) => {
    if (!active) return;
    await adminPost("gallery_image_update", { categoryId: active.id, imageId, caption });
    flash();
  };

  const cardStyle = { background: "white", borderRadius: 12, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  if (loading) {
    return <AdminShell title="Gallery"><p style={{ fontSize: 13, color: "#6b7280" }}>Loading…</p></AdminShell>;
  }

  // ── Category detail / editor ──────────────────────────────
  if (active) {
    return (
      <AdminShell title={`Gallery — ${active.name}`}>
        <button onClick={() => setActiveId(null)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
          <ArrowLeft size={14} /> Back to all categories
        </button>

        {saved && (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <CheckCircle size={16} style={{ color: "#15803d" }} />
            <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>Saved! Changes are live on the Gallery page immediately.</span>
          </div>
        )}

        {active.comingSoon && (
          <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 13, color: "#a16207" }}>
            <Clock size={15} /> This category currently shows &quot;Coming Soon&quot; on the website. You can still upload cover/photos now — they&apos;ll be ready when you launch it.
          </div>
        )}

        {/* Cover image */}
        <div style={{ ...cardStyle, padding: 20, marginBottom: 20, maxWidth: 480 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 10 }}>Cover Image</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>Shown as the box thumbnail on the main Gallery page.</p>
          {active.cover && (
            <img src={active.cover} alt="Cover" style={{ width: "100%", borderRadius: 10, marginBottom: 10, border: "1px solid #e5e7eb" }} />
          )}
          <input type="file" accept="image/*" ref={coverRef} style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }} />
          <button onClick={() => coverRef.current?.click()} disabled={uploadingCover}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: uploadingCover ? "#e5e7eb" : "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: uploadingCover ? "not-allowed" : "pointer", fontWeight: 600 }}>
            <Upload size={14} /> {uploadingCover ? "Uploading..." : active.cover ? "Replace Cover" : "Upload Cover"}
          </button>
        </div>

        {/* Images */}
        <div style={{ ...cardStyle, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Photos ({active.images.length})</h3>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>These appear in the {active.name} gallery page. Upload, caption, or delete anytime.</p>
            </div>
            <div>
              <input type="file" accept="image/*" multiple ref={imagesRef} style={{ display: "none" }} onChange={(e) => { if (e.target.files && e.target.files.length) handleImagesUpload(e.target.files); }} />
              <button onClick={() => imagesRef.current?.click()} disabled={uploadingImages}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", background: uploadingImages ? "#9ca3af" : "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: uploadingImages ? "not-allowed" : "pointer" }}>
                <Upload size={14} /> {uploadingImages ? "Uploading..." : "Upload Photos"}
              </button>
            </div>
          </div>

          {active.images.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
              <ImageIcon size={32} style={{ margin: "0 auto 10px" }} />
              <p style={{ fontSize: 13 }}>No photos yet. Upload your first photo above.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
              {active.images.map((img) => (
                <div key={img.id} style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                  <img src={img.url} alt={img.caption || ""} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: 10 }}>
                    <input
                      value={img.caption || ""}
                      placeholder="Caption (optional)"
                      onChange={(e) => updateCaption(img.id, e.target.value)}
                      onBlur={(e) => saveCaption(img.id, e.target.value)}
                      style={{ width: "100%", fontSize: 12, padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 6, marginBottom: 8, boxSizing: "border-box" }}
                    />
                    <button onClick={() => deleteImage(img.id)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: 6, padding: "5px 10px", cursor: "pointer", width: "100%", justifyContent: "center" }}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminShell>
    );
  }

  // ── Category list ──────────────────────────────────────────
  return (
    <AdminShell title="Gallery">
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
        Manage photos shown on the public Gallery page — Office, Warehouse, Factory, Events, and Import/Export. Changes reflect immediately, no code changes needed.
      </p>
      {saved && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <CheckCircle size={16} style={{ color: "#15803d" }} />
          <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>Saved!</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveId(cat.id)} style={{ ...cardStyle, padding: 0, textAlign: "left", cursor: "pointer", overflow: "hidden" }}>
            <div style={{ width: "100%", height: 130, background: "#f3f4f6", position: "relative" }}>
              {cat.cover ? (
                <img src={cat.cover} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}><ImageIcon size={28} /></div>
              )}
              {cat.comingSoon && (
                <div style={{ position: "absolute", top: 8, right: 8, background: "#f4a228", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>Coming Soon</div>
              )}
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{cat.images.length} photos{cat.cover ? " · cover set" : ""}</div>
            </div>
          </button>
        ))}
      </div>
    </AdminShell>
  );
}
