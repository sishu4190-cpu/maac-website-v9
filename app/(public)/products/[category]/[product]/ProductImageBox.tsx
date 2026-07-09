"use client";
import { useState, useEffect } from "react";
import { FlaskConical, X, ShieldCheck, ZoomIn } from "lucide-react";

export default function ProductImageBox({ image, productName }: { image: string | null; productName: string }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [zoomed]);

  return (
    <>
      <button
        onClick={() => image && setZoomed(true)}
        className="product-image-box"
        aria-label={image ? `View larger photo of ${productName}` : undefined}
        style={{
          position: "relative", flexShrink: 0, borderRadius: 16, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.15)", background: image ? "white" : "#1a4d2e",
          padding: 0, cursor: image ? "pointer" : "default", boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FlaskConical size={32} style={{ color: "#81c784" }} />
          </div>
        )}

        {/* Quality badge */}
        <div style={{
          position: "absolute", bottom: 6, right: 6, width: 24, height: 24, borderRadius: "50%",
          background: "#1a4d2e", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center",
        }} title="ISO Certified Supplier">
          <ShieldCheck size={13} style={{ color: "#81c784" }} />
        </div>

        {image && (
          <div className="product-image-zoom-hint" style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex",
            alignItems: "center", justifyContent: "center", transition: "background 0.2s ease", opacity: 0,
          }}>
            <ZoomIn size={22} style={{ color: "white" }} />
          </div>
        )}
      </button>

      <style>{`
        .product-image-box { width: 90px; height: 90px; }
        .product-image-box:hover .product-image-zoom-hint { opacity: 1; background: rgba(0,0,0,0.35) !important; }
        @media (min-width: 640px) {
          .product-image-box { width: 110px; height: 110px; }
        }
        @media (min-width: 1024px) {
          .product-image-box { width: 140px; height: 140px; }
        }
      `}</style>

      {zoomed && image && (
        <div
          role="dialog" aria-modal="true" onClick={() => setZoomed(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,20,10,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <button onClick={() => setZoomed(false)} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <X size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={productName} onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
        </div>
      )}
    </>
  );
}
