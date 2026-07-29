"use client";
import { useEffect } from "react";
import Link from "next/link";

// Route-group error boundary for every public page (Home, Products, Quality,
// Gallery, Blog, Contact, etc).
//
// Why this exists: without an error.tsx, an unexpected error thrown while
// Next.js is rendering the *next* page during a client-side <Link>
// navigation has nowhere to go — the browser URL updates but the screen can
// be left showing a blank or stale section until the user does a full page
// refresh. This boundary catches that failure immediately and shows a
// friendly recovery screen with a "Try Again" button (calls reset(), which
// re-attempts rendering the segment without a full reload) and a way back
// home, so a visitor is never stuck looking at a broken page.
export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[MAAC] Page error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "white", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>⚠️</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1a4d2e", marginBottom: 8 }}>Something went wrong loading this page</h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>
          This is usually temporary. Try again, or head back to the homepage. If it keeps happening, please contact us.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => reset()}
            style={{ background: "#1a4d2e", color: "white", border: "none", padding: "10px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{ background: "#f3f4f6", color: "#1a4d2e", padding: "10px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
