"use client";
import { useEffect } from "react";

// Error boundary for the whole /admin section. Without this, an error while
// navigating between admin pages (Products, Gallery, Settings, etc.) could
// leave the panel stuck on stale content until a hard refresh — this
// catches it immediately and offers a one-click retry.
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[MAAC Admin] Page error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", maxWidth: 440, background: "white", border: "1px solid #f1f5f9", borderRadius: 14, padding: 32 }}>
        <div style={{ fontSize: 38, marginBottom: 10 }}>⚠️</div>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1a4d2e", marginBottom: 8 }}>This admin page hit an error</h1>
        <p style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
          Your data is safe — this is just a display error. Click below to try loading this section again.
        </p>
        <button
          onClick={() => reset()}
          style={{ background: "#1a4d2e", color: "white", border: "none", padding: "10px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
