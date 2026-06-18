"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ { q: string; a: string; }

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={q}
          className="faq-item"
          style={{
            border: `1px solid ${open === i ? "#1a4d2e" : "#e5e7eb"}`,
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color 0.25s, box-shadow 0.25s",
            boxShadow: open === i ? "0 4px 16px rgba(26,77,46,0.1)" : "none",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", textAlign: "left",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px",
              background: open === i ? "#f0fdf4" : "white",
              border: "none", cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a4d2e", lineHeight: 1.4, paddingRight: 16 }}>
              {q}
            </span>
            <ChevronDown
              size={18}
              style={{
                color: "#1a4d2e", flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
          <div
            style={{
              maxHeight: open === i ? 400 : 0,
              overflow: "hidden",
              transition: "max-height 0.35s ease",
            }}
          >
            <div style={{
              padding: "4px 20px 18px",
              fontSize: 14, color: "#4b5563", lineHeight: 1.7,
              borderTop: "1px solid #e5e7eb",
              paddingTop: 14,
            }}>
              {a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
