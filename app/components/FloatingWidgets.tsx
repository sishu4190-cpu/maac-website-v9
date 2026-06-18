"use client";
import { useState, useEffect, useRef } from "react";
import { useSiteData } from "../lib/useSiteData";

// ── WhatsApp floating button ──────────────────────────────
export function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  const { contact } = useSiteData();
  const wa = contact.whatsapp.replace(/\D/g, "") || "919662088122";
  useEffect(() => { const t = setTimeout(() => setShow(true), 1200); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return (
    <a
      href={`https://wa.me/${wa}?text=Hello%20Mangalam%20Acid%20and%20Chemicals%2C%20I%20am%20interested%20in%20your%20chemical%20products.%20Please%20share%20more%20details.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
      style={{ opacity: show ? 1 : 0, transition: "opacity 0.5s" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {/* Tooltip */}
      <span style={{
        position: "absolute", right: "calc(100% + 10px)", top: "50%",
        transform: "translateY(-50%)", background: "#1a1a1a", color: "white",
        padding: "6px 12px", borderRadius: 8, fontSize: 12, whiteSpace: "nowrap",
        pointerEvents: "none", opacity: 0, transition: "opacity 0.2s",
      }} className="wa-tooltip">Chat on WhatsApp</span>
    </a>
  );
}

// ── AI Chatbot ────────────────────────────────────────────
const COMPANY_SYSTEM = `You are MaacBot, the helpful AI assistant for Mangalam Acid and Chemicals — an ISO 9001:2015 and ISO 45001:2018 certified bulk chemical supplier based in Vapi, Gujarat, India.

Company info:
- Name: Mangalam Acid and Chemicals (MAAC)
- Location: PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA, Pardi, Valsad – 396195, Gujarat, India
- Phones: +91 96620 88122 / +91 90818 32790 / +91 95379 70043
- Emails: mangalamacidandchemicals@gmail.com / info_maac@yahoo.com
- Website: mangalamchemicals.com
- Certifications: ISO 9001:2015 (IN59785A), ISO 45001:2018 (IN59785C-1), MSME UDYAM (GJ-25-0006759), D&B DUNS (813884357), IndiaMART TrustSEAL (July 2024), IEC (ABPFM7919L)

Products supplied:
1. Sulphates & Fertilizer Chemicals: Ferrous Sulphate Heptahydrate, Ferrous Sulphate Semi Dry, Magnesium Sulphate, Zinc Sulphate Hepta, Zinc Sulphate Mono 33%, Copper Sulphate Pentahydrate, Boric Acid, Sodium Nitrate, Calcium Nitrate, Sodium Acetate Tri-Hydrate, and more
2. EDTA & Chelated Products: Iron EDTA, Zinc EDTA, Calcium EDTA, Magnesium EDTA, Manganese EDTA, Copper EDTA, Fe EDDHA, Boron EDTA, Amino Acid 80%, and more
3. Fluoride Base Products: Ammonium Bi Fluoride (Pure & Tech), Ammonium Fluoride, Potassium Fluoride, Sodium Fluoride (Pure & Tech), Sodium Cryolite, Potassium Cryolite, Calcium Fluoride, and 20+ more
4. Acids: Phosphoric Acid (75%, 85%), Sulfuric Acid (70%, 98%), Hydrochloric Acid, Nitric Acid, Acetic Acid, Formic Acid, Oxalic Acid, Citric Acid
5. Pharmaceutical Products: Ferrous Fumarate Pure Grade, Ferric Pyrophosphate, Fumaric Acid, Zinc Sulphate Mono Hydrate 36% USP Grade
6. NPK Fertilizers: 19-19-19, 12-61-00 (MAP), 00-52-34 (MKP), 13-00-45 (Potassium Nitrate), 00-00-50 (Potassium Sulphate), 00-00-60 (Potassium Chloride), 13-40-13, and more

Industries served: Agriculture, Fertilizer Manufacturing, Industrial Processing, Pharmaceuticals, Water Treatment, Metallurgy, Glass & Ceramics, Dyes & Pigments, Textiles, Oil & Drilling, Chemical Manufacturing

Rules:
- Answer in the same language the user writes in (Hindi, English, Hinglish, Gujarati, etc.)
- Be friendly, professional, concise
- NEVER invent prices, CAS numbers, exact purity %, HSN codes, stock availability, delivery timelines, or client names
- For price, exact spec, COA, MSDS, bulk order, delivery — redirect to WhatsApp: wa.me/919662088122
- After 3-4 questions or if unsure, proactively suggest WhatsApp contact
- Keep responses short (2-4 sentences max usually)
- For WhatsApp link, format as: [WhatsApp us here](https://wa.me/919662088122)`;

interface Message { role: "user" | "bot"; text: string; }

export function ChatbotFAB() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm MaacBot 👋 I can help you with information about Mangalam Acid and Chemicals — our products, certifications, bulk enquiry process, and more. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setShow(true), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    // After 4 questions, add redirect suggestion
    const redirectHint = newCount >= 4
      ? "\n\nFor exact quotation, grade confirmation or document request, please connect with our team directly: [WhatsApp us here](https://wa.me/919662088122)"
      : "";

    try {
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" as const : "assistant" as const,
        content: m.text
      }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          system: COMPANY_SYSTEM,
          messages: [...history, { role: "user", content: userMsg + redirectHint }],
        }),
      });
      const data = await res.json();
      const botText = data.content?.[0]?.text || "I'm having trouble connecting. Please WhatsApp us at +91 96620 88122 for assistance.";
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "bot",
        text: "I'm having trouble connecting right now. Please [WhatsApp us here](https://wa.me/919662088122) or call +91 96620 88122 for quick assistance."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderText = (text: string) => {
    // Simple markdown-ish link renderer
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!show) return null;

  return (
    <>
      {/* Chatbot window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
            }}>
              <img
                src="/assets/maac-media/images/maac-logo-avatar.webp"
                alt="MAAC"
                style={{ width: 34, height: 34, objectFit: "contain" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>MaacBot</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>Mangalam Acid & Chemicals · Online</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "white", cursor: "pointer", opacity: 0.7, padding: 4 }}
            >✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "bot" ? "chatbot-msg-bot" : "chatbot-msg-user"}>
                {renderText(msg.text)}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg-bot" style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div style={{ padding: "0 0.75rem 0.5rem", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Products we supply", "How to place bulk order?", "Our certifications", "Contact details"].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 999,
                    border: "1px solid #d1d5db", background: "white",
                    cursor: "pointer", color: "#1a4d2e", fontWeight: 500,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { (e.currentTarget).style.background = "#1a4d2e"; (e.currentTarget).style.color = "white"; }}
                  onMouseLeave={e => { (e.currentTarget).style.background = "white"; (e.currentTarget).style.color = "#1a4d2e"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-row">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about products, delivery, COA..."
              disabled={loading}
            />
            <button className="chatbot-send-btn" onClick={sendMessage} disabled={loading} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Chatbot FAB */}
      <button
        className="chatbot-fab"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        title="Chat with MaacBot"
        style={{ padding: 0, overflow: "hidden" }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <img
            src="/assets/maac-media/images/maac-logo-avatar.webp"
            alt="MAAC"
            style={{ width: 58, height: 58, objectFit: "cover", borderRadius: "50%" }}
          />
        )}
      </button>
    </>
  );
}

// ── Page Loader ───────────────────────────────────────────
export function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page-loader${visible ? "" : " hidden"}`} style={{ zIndex: 99999 }}>
      <div className="loader-logo">
        <img
          src="/assets/maac-media/images/maac-logo-navbar.webp"
          alt="Mangalam Acid and Chemicals"
          style={{ height: 80, objectFit: "contain" }}
        />
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", letterSpacing: "0.05em" }}>
        Loading…
      </div>
    </div>
  );
}

// ── Scroll Reveal Script ──────────────────────────────────
export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
