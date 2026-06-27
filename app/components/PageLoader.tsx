"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on very first load, not on page navigations
    const hasLoaded = sessionStorage.getItem("maac_loaded");
    if (!hasLoaded) {
      setVisible(true);
      sessionStorage.setItem("maac_loaded", "1");
      const t = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "white",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 0.4s ease",
    }}>
      <img
        src="/assets/maac-media/images/maac-logo-navbar.webp"
        alt="Mangalam Acid and Chemicals"
        style={{ height: 70, objectFit: "contain", marginBottom: 20 }}
      />
      <div style={{
        width: 200, height: 3,
        background: "#e5e7eb", borderRadius: 99, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: "100%",
          background: "linear-gradient(90deg, #1a4d2e, #4caf50, #f4a228)",
          borderRadius: 99,
          animation: "loadbar 0.5s ease forwards",
        }} />
      </div>
      <style>{`@keyframes loadbar { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}
