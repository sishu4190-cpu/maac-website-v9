"use client";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export default function GalleryGrid({ images, title }: { images: GalleryImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className="reveal card-hover"
            style={{
              position: "relative", width: "100%", aspectRatio: "1/1",
              borderRadius: 14, overflow: "hidden", border: "1px solid #f1f5f9",
              cursor: "pointer", padding: 0, background: "#f3f4f6",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.caption || title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }} />
            <div style={{
              position: "absolute", inset: 0, background: "rgba(15,45,26,0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.25s ease", opacity: 0,
            }} className="gallery-hover-overlay">
              <ZoomIn size={22} style={{ color: "white" }} />
            </div>
            {img.caption && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)", color: "white", fontSize: 11, padding: "16px 8px 6px", textAlign: "left" }}>
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
        button.card-hover:hover .gallery-hover-overlay { opacity: 1 !important; background: rgba(15,45,26,0.35) !important; }
        button.card-hover:hover img { transform: scale(1.06); }
      `}</style>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,20,10,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, animation: "fadeInLightbox 0.2s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].caption || title}
              style={{ maxWidth: "90vw", maxHeight: "75vh", objectFit: "contain", borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            />
            {images[activeIndex].caption && (
              <p style={{ color: "white", fontSize: 14, textAlign: "center" }}>{images[activeIndex].caption}</p>
            )}
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{activeIndex + 1} / {images.length}</span>
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}

      <style>{`@keyframes fadeInLightbox { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>
  );
}
