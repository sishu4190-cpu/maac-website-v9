"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSiteData } from "../lib/useSiteData";

// ── WhatsApp floating button ──────────────────────────────
export function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  const { contact } = useSiteData();
  const wa = (contact.whatsapp || "+91 96620 88122").replace(/\D/g, "") || "919662088122";
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
      <span style={{ position: "absolute", right: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)", background: "#1a1a1a", color: "white", padding: "6px 12px", borderRadius: 8, fontSize: 12, whiteSpace: "nowrap", pointerEvents: "none", opacity: 0, transition: "opacity 0.2s" }} className="wa-tooltip">Chat on WhatsApp</span>
    </a>
  );
}

// ── AI Chatbot ────────────────────────────────────────────
const WA_LINK = "https://wa.me/919662088122";
const WA_PREFILL = `${WA_LINK}?text=Hello%20MAAC%2C%20I%20need%20help%20with%20a%20chemical%20enquiry.`;

const COMPANY_SYSTEM = `You are MaacBot, the expert AI assistant for Mangalam Acid and Chemicals (MAAC) — an ISO 9001:2015 and ISO 45001:2018 certified bulk chemical supplier and exporter based in Vapi, Gujarat, India.

=== COMPANY INFO ===
- Name: Mangalam Acid and Chemicals (MAAC)
- Location: PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA, Pardi, Valsad – 396195, Gujarat, India
- Phones: +91 96620 88122 / +91 90818 32790 / +91 95379 70043
- WhatsApp: +91 96620 88122
- Email: info@mangalamchemicals.com / inquiry@mangalamchemicals.com
- Website: mangalamchemicals.com
- Hours: Monday–Saturday, 9 AM – 7 PM IST
- Certifications: ISO 9001:2015 (IN59785A), ISO 45001:2018 (IN59785C-1), MSME UDYAM (GJ-25-0006759), D&B DUNS (813884357), IndiaMART TrustSEAL, IEC (ABPFM7919L)

=== PRODUCTS SUPPLIED ===

CATEGORY 1: Sulphates & Fertilizer Chemicals
- Ferrous Sulphate Heptahydrate (FeSO4·7H2O, CAS 7782-63-0): Blue-green crystals, used as iron source in fertilizers, water treatment, pharmaceutical iron supplements, cement coloring. Available in 25kg/50kg bags and jumbo bags.
- Ferrous Sulphate Semi Dry / Super Dry: Lower moisture content, for fertilizer blending and industrial iron source.
- Dried Ferrous Sulphate: Monohydrate form, higher iron content, industrial applications.
- Magnesium Sulphate Heptahydrate (Epsom Salt, MgSO4·7H2O): Used in agriculture for magnesium deficiency, bath salts, industrial processes.
- Zinc Sulphate Heptahydrate 21% (ZnSO4·7H2O): Key micronutrient for crops, used in fertilizers, animal feed, galvanizing.
- Zinc Sulphate Monohydrate 33% (ZnSO4·H2O): Higher zinc content, feed grade and industrial grade.
- Copper Sulphate Pentahydrate (CuSO4·5H2O): Fungicide, algaecide, electroplating, animal feed supplement.
- Boric Acid (H3BO3): Boron micronutrient for crops, glass manufacturing, preservatives, antiseptics.
- Sodium Nitrate (NaNO3): Fertilizer, food preservation, glass manufacturing, explosives.
- Calcium Nitrate (Ca(NO3)2): Fast-acting nitrogen+calcium fertilizer, suitable for fertigation, hydroponic farming.
- Mono Ammonium Phosphate (MAP 12-61-00): High phosphorus fertilizer, water-soluble, used in fertigation.
- Sodium Acetate Trihydrate: Food industry, heating pads, textile dyeing, chemical synthesis.
- And more sulphate compounds.

CATEGORY 2: EDTA & Chelated Products
- Iron EDTA (Fe-EDTA): Chelated iron for foliar spray and drip irrigation, prevents iron chlorosis in plants.
- Zinc EDTA: Chelated zinc micronutrient, highly bioavailable for crops.
- Calcium EDTA: Chelated calcium for plant nutrition, prevents blossom end rot.
- Magnesium EDTA: Chelated magnesium, fixes magnesium deficiency in alkaline soils.
- Manganese EDTA: Chelated manganese micronutrient.
- Copper EDTA: Chelated copper, used in foliar application.
- Boron EDTA: Chelated boron for fruiting crops.
- Fe EDDHA (6%): Superior iron chelate effective in high pH/alkaline soils where EDTA fails.
- Amino Acid 80%: Plant-derived amino acids, biostimulant for crop growth.
- Seaweed Extract: Natural biostimulant, improves plant immunity and growth.

CATEGORY 3: Fluoride Base Products (23+ products)
- Ammonium Bifluoride (NH4HF2): Pure and Technical grades. Used in metal surface treatment, glass etching, cleaning agents.
- Ammonium Fluoride (NH4F): Used in glass etching, cleaning, semiconductor manufacturing.
- Potassium Fluoride (KF): Used in organic synthesis, glass frosting, metallurgy.
- Sodium Fluoride (NaF): Pure and Technical grades. Dental products, glass etching, wood preservation, pest control.
- Sodium Cryolite (Na3AlF6): Aluminium smelting flux, insecticide, glass manufacturing.
- Potassium Cryolite: Aluminium manufacturing, abrasives.
- Calcium Fluoride (CaF2): Fluorspar, used in steelmaking, aluminium, glass, ceramic industries.
- Sodium Hexafluorosilicate: Glass manufacturing, fluoridation of water, ceramics.
- Potassium Hexafluorosilicate: Glass etching, ceramics.
- Aluminium Fluoride (AlF3): Aluminium smelting, ceramic flux.
- Sodium Silicofluoride: Water fluoridation, glass, cement, ceramics.
- And 10+ more fluoride compounds.

CATEGORY 4: Acids
- Phosphoric Acid (H3PO4): Available in 75% and 85% concentrations. Used in fertilizer manufacturing, food industry (E338), metal treatment, cleaning agents, water treatment.
- Sulphuric Acid (H2SO4): 70% and 98% concentrations. Used in fertilizer production (superphosphate), battery acid, industrial processes, metal pickling.
- Hydrochloric Acid (HCl): Industrial cleaning, pH control, steel pickling, chemical synthesis.
- Nitric Acid (HNO3): Fertilizer production (ammonium nitrate), explosives, metal etching.
- Acetic Acid (CH3COOH): Solvent, chemical synthesis, food preservative (vinegar), textile industry.
- Formic Acid (HCOOH): Leather tanning, textile dyeing, rubber manufacturing, preservative.
- Oxalic Acid (C2H2O4): Metal cleaning, rust removal, bleaching, chemical synthesis.
- Citric Acid: Food and beverage (E330), cleaning, pharmaceutical, personal care.
- Lactic Acid: Food preservative, biodegradable plastics, pharmaceutical.
- Tartaric Acid: Food and wine industry, baking powder, pharmaceutical.

CATEGORY 5: Pharmaceutical Products
- Ferrous Fumarate (Pure Grade): Iron supplement in pharmaceutical formulations. High elemental iron content (~33%).
- Ferric Pyrophosphate: Iron source for food fortification and pharmaceutical use. Non-constipating iron form.
- Fumaric Acid: Food acidulant, pharmaceutical excipient, polymer production.
- Zinc Sulphate Monohydrate USP Grade 36%: Pharmaceutical grade zinc, used in zinc supplements, eye drops, antifungal formulations.

CATEGORY 6: NPK Fertilizers (Water-Soluble)
- NPK 19-19-19: Balanced N-P-K, most popular for fertigation and foliar spray in all crops.
- NPK 13-40-13: High phosphorus formula for root development, flowering stage.
- MAP 12-61-00 (Mono Ammonium Phosphate): High phosphorus, used in drip and sprinkler irrigation.
- MKP 00-52-34 (Mono Potassium Phosphate): High P+K, used in ripening and fruiting stage.
- Potassium Nitrate 13-00-45 (NOP): Nitrogen + Potassium, chloride-free, for quality crops.
- Potassium Sulphate 00-00-50 (SOP): Premium potassium, chloride-free, for quality-sensitive crops.
- Potassium Chloride 00-00-60 (MOP): Standard potassium fertilizer.
- Potassium Chloride 00-00-23: Lower K concentration variant.

=== INDUSTRIES SERVED ===
Agriculture, Fertilizer Manufacturing, Industrial Processing, Pharmaceuticals, Water Treatment, Metallurgy & Steel, Glass & Ceramics, Dyes & Pigments, Textiles, Oil & Drilling, Chemical Manufacturing, Agrochemicals, Food Processing

=== DOCUMENTATION AVAILABLE ===
- COA (Certificate of Analysis): Available on request for every product and batch
- MSDS (Material Safety Data Sheet): Available for hazardous chemicals on request
- Product Catalogue: Available for download at mangalamchemicals.com/downloads
- ISO Certificates: ISO 9001:2015 and ISO 45001:2018
- GST Certificate, IEC, MSME, D&B registration documents

=== PACKAGING OPTIONS ===
- 25 kg bags (standard)
- 50 kg bags
- Jumbo bags / FIBC bags (500–1000 kg)
- Bulk tanker supply (for liquid acids)
- Custom packaging as per buyer requirement

=== HOW TO ORDER / ENQUIRY PROCESS ===
1. Share product name, grade, quantity, delivery location via WhatsApp or email
2. Team confirms availability and provides quotation
3. Order confirmation and payment terms
4. Dispatch from Vapi, Gujarat with COA
Typical response time: Same business day

=== RESPONSE RULES ===
1. LANGUAGE: Always respond in the SAME language the user writes — Hindi, English, Hinglish (mix), Gujarati. If Hinglish, reply in Hinglish.
2. TONE: Friendly, helpful, professional. Like a knowledgeable chemical expert and salesperson.
3. KNOWLEDGE: Use your chemical industry knowledge to give genuinely useful answers about products, uses, grades, applications, industries.
4. NEVER invent: prices, exact purity %, CAS numbers not listed, stock availability, client names, delivery dates.
5. FOR PRICING/QUOTE/COA/SPECIFIC SPECS: Always say these need to be confirmed with our team and provide WhatsApp link: [WhatsApp karo yahan](https://wa.me/919662088122) 
6. WHATSAPP FALLBACK: If you cannot answer properly, if question is too specific/technical, or if user seems unsatisfied — immediately suggest: "Yeh sawaal ke liye aap seedha hamare team se baat karo: [WhatsApp par Message Karo →](https://wa.me/919662088122?text=Hello%20MAAC%2C%20I%20need%20help)"
7. QUICK HELPFUL ANSWERS: For common questions like "ferrous sulphate kya hai", "zinc sulphate uses", "COA kya hota hai" — give a clear, 2-4 sentence answer.
8. AFTER 3 QUESTIONS: Proactively offer WhatsApp connection for quotation.
9. FORMAT: Keep responses concise. Use bullet points only when listing multiple items. No long essays.
10. CHEMICAL EXPERTISE: You know chemistry. Help users understand which product is right for their need — which grade, which application, which concentration.`;

interface Message {
  role: "user" | "bot";
  text: string;
  isWhatsApp?: boolean;
}

const QUICK_REPLIES = [
  "Products kya supply karte ho?",
  "Bulk order kaise kare?",
  "COA milega?",
  "Ferrous Sulphate ke uses?",
  "Certifications kya hain?",
];

export function ChatbotFAB() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Namaste! 👋 Main MaacBot hoon — Mangalam Acid and Chemicals ka AI assistant.\n\nMain aapki help kar sakta hoon:\n• Product information (sulphates, EDTA, acids, NPK, fluorides)\n• Chemical uses aur applications\n• Order enquiry process\n• COA, MSDS, certifications\n\nAap kya jaanna chahte hain?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const t = setTimeout(() => setShow(true), 1500); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      if (inputRef.current) inputRef.current.focus();
    }
  }, [messages, open]);

  const addWhatsAppFallback = () => {
    setMessages(prev => [...prev, {
      role: "bot",
      text: "Is sawaal ke liye hamare team se seedha baat karna best rahega. Woh aapki poori help kar sakte hain! 👇",
      isWhatsApp: true,
    }]);
  };

  const sendMessage = async (msgText?: string) => {
    const userMsg = (msgText || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    const proactiveWA = newCount >= 3
      ? "\n\nNote: After this response, also mention that for specific pricing, quotation, or COA requests, user should contact via WhatsApp: [WhatsApp par Message Karo →](https://wa.me/919662088122?text=Hello%20MAAC%2C%20I%20need%20a%20quotation)"
      : "";

    try {
      const history = messages
        .filter(m => !m.isWhatsApp)
        .map(m => ({ role: m.role === "user" ? "user" as const : "assistant" as const, content: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 400,
          system: COMPANY_SYSTEM,
          messages: [...history, { role: "user", content: userMsg + proactiveWA }],
        }),
      });

      if (!res.ok) { addWhatsAppFallback(); return; }
      const data = await res.json();
      const botText = data.content?.[0]?.text;
      if (!botText) { addWhatsAppFallback(); return; }
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch {
      addWhatsAppFallback();
    } finally {
      setLoading(false);
    }
  };

  const renderText = (text: string, isWhatsApp?: boolean) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return (
      <span>
        {parts.map((part, i) => {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer"
                style={{ color: isWhatsApp ? "#25D366" : "#1a4d2e", fontWeight: 600, textDecoration: "underline" }}>
                {match[1]}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
        {isWhatsApp && (
          <div style={{ marginTop: 10 }}>
            <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25D366", color: "white", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp par Message Karo →
            </a>
          </div>
        )}
      </span>
    );
  };

  if (!show) return null;

  return (
    <>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              <img src="/assets/maac-media/images/maac-logo-avatar.webp" alt="MAAC" style={{ width: 34, height: 34, objectFit: "contain" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>MaacBot</div>
              <div style={{ fontSize: 11, opacity: 0.75, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Mangalam Chemicals · Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", opacity: 0.8, padding: 4, fontSize: 18 }}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "bot" ? "chatbot-msg-bot" : "chatbot-msg-user"}>
                {renderText(msg.text, msg.isWhatsApp)}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg-bot" style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies — show only at start */}
          {messages.length <= 2 && (
            <div style={{ padding: "0 0.75rem 0.5rem", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, border: "1px solid #d1d5db", background: "white", cursor: "pointer", color: "#1a4d2e", fontWeight: 500, transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget).style.background = "#1a4d2e"; (e.currentTarget).style.color = "white"; (e.currentTarget).style.borderColor = "#1a4d2e"; }}
                  onMouseLeave={e => { (e.currentTarget).style.background = "white"; (e.currentTarget).style.color = "#1a4d2e"; (e.currentTarget).style.borderColor = "#d1d5db"; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Chemical ke baare mein kuch puchho..."
              disabled={loading}
            />
            <button className="chatbot-send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}

      <button
        className="chatbot-fab"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        title="Chat with MaacBot"
        style={{ padding: 0, overflow: "hidden" }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <img src="/assets/maac-media/images/maac-logo-avatar.webp" alt="MAAC" style={{ width: 58, height: 58, objectFit: "cover", borderRadius: "50%" }} />
        )}
      </button>
    </>
  );
}

// ── Page Loader (fixes first-load rendering) ──────────────
export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`page-loader${visible ? "" : " hidden"}`}
      style={{ zIndex: 99999, transition: "opacity 0.4s ease", opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none" }}
    >
      <div className="loader-logo">
        <img src="/assets/maac-media/images/maac-logo-navbar.webp" alt="Mangalam Acid and Chemicals" style={{ height: 70, objectFit: "contain" }} />
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", letterSpacing: "0.05em", marginTop: 8 }}>Loading…</div>
    </div>
  );
}

// ── Scroll Reveal ─────────────────────────────────────────
//
// Root cause of the "page looks blank/stuck until I refresh" bug (reported
// repeatedly on /quality, /gallery, /blog, /social — every page that (a)
// uses the .reveal / .reveal-scale CSS classes AND (b) fetches data with
// `await readData()` before rendering):
//
// The old version below scanned for .reveal elements exactly once, on the
// next animation frame after each pathname change, and gave up permanently
// after a fixed 700ms "safety" timeout. On a client-side <Link> navigation,
// Next.js briefly shows the route's loading.tsx fallback while the target
// page's async data fetch (readData() hitting Vercel Blob) resolves. If
// that fetch took longer than ~700ms, the *real* page content only got
// inserted into the DOM AFTER this effect had already disconnected its
// observer and cleared its timers — so those elements never received the
// "revealed" class and stayed at opacity:0 forever, i.e. invisible, until a
// full page reload reset everything. Pages with no .reveal usage (Home,
// Products) never showed the symptom, which is why it looked page-specific.
//
// Fix: a MutationObserver keeps watching the page for as long as it's
// mounted (not just for one fixed window), so no matter when the real
// content actually lands in the DOM, newly-added .reveal elements are
// always picked up and revealed. A generous 4s safety net still exists as
// an absolute last resort, but the MutationObserver means it should never
// actually be needed.
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const SELECTOR = ".reveal, .reveal-left, .reveal-scale";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const scanAndObserve = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains("revealed")) io.observe(el);
      });
    };

    // Initial scan covers content that's already in the DOM by the time
    // this effect runs (the common case — most pages resolve well within a
    // frame).
    scanAndObserve();

    // Keep scanning whenever the DOM changes underneath us, so content that
    // streams in later (e.g. the real page replacing a loading.tsx
    // fallback after a slow data fetch) is never missed, no matter how long
    // it takes.
    const mo = new MutationObserver(scanAndObserve);
    mo.observe(document.body, { childList: true, subtree: true });

    // Absolute last resort: force everything visible after 4s so content
    // can never be stuck invisible even in a scenario nobody anticipated.
    const safety = setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("revealed"));
    }, 4000);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
  }, [pathname]);
  return null;
}
