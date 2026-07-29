"use client";
import { useEffect } from "react";

// Last-resort error boundary — only fires if the root layout itself throws
// (very rare). Next.js requires this file to render its own <html>/<body>
// since it replaces the entire root layout when active.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[MAAC] Fatal app error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", padding: 20 }}>
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>⚠️</div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1a4d2e", marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Please try again, or reload the page.</p>
            <button
              onClick={() => reset()}
              style={{ background: "#1a4d2e", color: "white", border: "none", padding: "10px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
