import Link from "next/link";
import { CheckCircle, Award, Truck, Users, ArrowRight, Download, Shield, FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import { categories } from "./data/products";

export const metadata: Metadata = {
  title: "Mangalam Acid and Chemicals | Industrial Chemical Supplier, Vapi, Gujarat",
  description: "Mangalam Acid and Chemicals is a Vapi, Gujarat-based manufacturer, supplier and exporter of sulphate, nitrate, chloride, fertilizer, textile, water treatment, fluoride, industrial, EDTA and pharmaceuticals chemicals. ISO 9001:2015 certified. Bulk supply across India.",
  alternates: { canonical: "https://mangalamchemicals.com" },
};

export const dynamic = "force-dynamic";

// Presentation-only metadata (icon / card colour / photo) for each product
// category. The actual category list, product counts and descriptions come
// straight from app/data/products.ts so the homepage can never drift out of
// sync with the real product catalogue — add a category there and it shows
// up here automatically (falls back to a plain colour card with no photo).
const CATEGORY_PRESENTATION: Record<string, { bg: string; image?: string; shortDesc: string }> = {
  "sulphate-chemicals": { bg: "#2d5a1b", image: "/assets/maac-media/images/categories/sulphates-fertilizers.jpg", shortDesc: "Ferrous, zinc, copper, magnesium, manganese, nickel and ammonium sulphates." },
  "nitrate-chemicals": { bg: "#1a4d6b", image: "/assets/maac-media/images/categories/sulphates-fertilizers.jpg", shortDesc: "Calcium nitrate, sodium nitrate and copper nitrate for fertigation and industry." },
  "chloride-chemicals": { bg: "#3d1a1a", shortDesc: "Calcium chloride, nickel chloride and copper chloride for industrial use." },
  "fertilizer-chemicals": { bg: "#1a4d2e", image: "/assets/maac-media/images/categories/npk-fertilizers.png", shortDesc: "NPK grades, MAP, MKP, boron grades, amino acids and biostimulants." },
  "textile-chemicals": { bg: "#4d3d1a", image: "/assets/maac-media/images/categories/acids.png", shortDesc: "Acetic acid, formic acid, oxalic acid and sodium acetate for dyeing & finishing." },
  "water-treatment-chemicals": { bg: "#123a4d", shortDesc: "Sulphates, chlorides and fluorides used across municipal & industrial water treatment." },
  "fluoride-chemicals": { bg: "#3d2d1a", image: "/assets/maac-media/images/categories/fluoride-base-products.png", shortDesc: "Ammonium, potassium, sodium fluoride compounds for metallurgy, glass & ceramics." },
  "industrial-chemicals": { bg: "#2d1a3d", image: "/assets/maac-media/images/categories/acids.png", shortDesc: "Phosphoric, sulphuric, nitric & hydrochloric acid and industrial process salts." },
  "edta-chemicals": { bg: "#1a3d4d", image: "/assets/maac-media/images/categories/edta-chelated-products.jpg", shortDesc: "Iron, zinc, calcium, magnesium EDTA and Fe EDDHA chelated micronutrients." },
  "pharmaceuticals-chemicals": { bg: "#1a2d4d", image: "/assets/maac-media/images/categories/pharmaceutical-products.png", shortDesc: "USP/IP grade ferrous fumarate, zinc sulphate monohydrate, ferric pyrophosphate." },
};

const productCategories = categories.map((cat) => {
  const pres = CATEGORY_PRESENTATION[cat.slug] || { bg: "#1a4d2e", shortDesc: cat.tagline };
  const isCrossRef = Boolean(cat.crossLinks && cat.crossLinks.length > 0);
  return {
    id: cat.id,
    name: cat.name,
    count: isCrossRef ? cat.crossLinks!.length : cat.products.length,
    countLabel: isCrossRef ? "Featured Uses" : "Products",
    desc: pres.shortDesc,
    icon: cat.icon,
    href: `/products/${cat.slug}`,
    bg: pres.bg,
    image: pres.image,
  };
});

const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0);
const totalCategories = categories.length;

const whyUs = [
  { icon: <Award size={26} />, title: "ISO Certified Quality", desc: "ISO 9001:2015 and ISO 45001:2018 certified. Every batch available with COA on request.", color: "#f4a228" },
  { icon: <Shield size={26} />, title: "Verified Supplier", desc: "MSME UDYAM registered. D&B DUNS verified. TrustSEAL certified on IndiaMart.", color: "#4caf50" },
  { icon: <Truck size={26} />, title: "Bulk Supply & On-Time Delivery", desc: "Reliable bulk dispatch from Vapi, Gujarat across India. Timely delivery guaranteed.", color: "#2196f3" },
  { icon: <Users size={26} />, title: "Procurement-Focused Service", desc: "Direct communication. Grade-specific sourcing. Custom packaging and documentation support.", color: "#9c27b0" },
];

const industries = [
  "🌾 Agriculture", "🏭 Fertilizer Manufacturing", "⚙️ Industrial Processing",
  "💊 Pharmaceuticals", "💧 Water Treatment", "🔩 Metallurgy",
  "🏺 Glass & Ceramics", "🎨 Dyes & Pigments", "🧵 Textiles",
  "🛢️ Oil & Drilling", "🧪 Chemical Manufacturing", "🌿 Agrochemicals",
];

const featuredProducts = [
  { name: "Zinc Sulphate Heptahydrate 21%", category: "Sulphate Chemicals", use: "Zinc micronutrient for crops", href: "/products/sulphate-chemicals/zinc-sulphate-hepta", icon: "🌱" },
  { name: "Ferrous Sulphate Heptahydrate", category: "Sulphate Chemicals", use: "Iron fertilizer & water treatment", href: "/products/sulphate-chemicals/ferrous-sulphate-heptahydrate", icon: "⚗️" },
  { name: "Iron EDTA", category: "EDTA Chemicals", use: "Chelated iron for foliar & drip use", href: "/products/edta-chemicals/iron-edta", icon: "🔬" },
  { name: "NPK 19-19-19", category: "Fertilizer Chemicals", use: "Balanced water-soluble NPK for fertigation", href: "/products/fertilizer-chemicals/npk-19-19-19", icon: "🌾" },
  { name: "Phosphoric Acid", category: "Industrial Chemicals", use: "Fertilizer, food & industrial processes", href: "/products/industrial-chemicals/phosphoric-acid", icon: "🧪" },
  { name: "Calcium Nitrate", category: "Nitrate Chemicals", use: "Water-soluble Ca+N for fertigation", href: "/products/nitrate-chemicals/calcium-nitrate", icon: "💧" },
];

const enquirySteps = [
  { step: "1", title: "Contact Us", desc: "Call, WhatsApp, email, or fill our product enquiry form with your requirement.", tooltip: "Use our enquiry form, WhatsApp, phone, or email — we respond within the same business day.", icon: "📞" },
  { step: "2", title: "Share Requirements", desc: "Provide product name, grade/specification, quantity, and delivery location.", tooltip: "Include: product name, desired purity/grade, quantity in MT/KG, packaging preference, and pin code for delivery.", icon: "📋" },
  { step: "3", title: "Receive Quotation", desc: "We respond with pricing, availability, packaging options, and documentation.", tooltip: "You'll receive: price per unit, min order qty, available grades, packaging types, and turnaround timeline.", icon: "📄" },
  { step: "4", title: "Confirm & Dispatch", desc: "Confirm order, documents issued, goods dispatched from Vapi, Gujarat.", tooltip: "After confirmation: PI issued, payment processed, COA prepared, goods dispatched from Vapi, Gujarat.", icon: "🚚" },
];

const blogPosts = [
  { title: "What is COA in Chemical Procurement?", slug: "what-is-coa-in-chemical-procurement", date: "June 2025", readTime: "4 min", tag: "Documentation" },
  { title: "Zinc Sulphate Heptahydrate 21%: Uses, Specifications & Packaging", slug: "zinc-sulphate-heptahydrate-uses-specifications", date: "May 2025", readTime: "6 min", tag: "Product Guide" },
  { title: "Difference Between Industrial Grade and Fertilizer Grade Chemicals", slug: "industrial-grade-vs-fertilizer-grade-chemicals", date: "May 2025", readTime: "5 min", tag: "Buying Guide" },
];

export default async function Home() {
  const { readData } = await import("./lib/dataStore");
  const { heroImage, heroVideo } = await readData();

  return (
    <>
      {/* ── Hero section with video background ─────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        {/* Hero background: video if the admin has uploaded one, else the static image */}
        {heroVideo ? (
          <video
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
            }}
          />
        )}
        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, rgba(5,20,10,0.90) 0%, rgba(10,35,18,0.85) 50%, rgba(15,45,26,0.75) 100%)",
        }} />
        {/* Molecule pattern */}
        <div className="molecule-bg" style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.4 }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 w-full" style={{ zIndex: 3 }}>
          <div className="max-w-3xl">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(244,162,40,0.15)", color: "#f9c06a", border: "1px solid rgba(244,162,40,0.3)", backdropFilter: "blur(8px)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f4a228", display: "inline-block" }}></span>
                ISO 9001:2015 · ISO 45001:2018 · MSME · D&B Verified · IEC Holder
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 animate-fade-in delay-200">
              Reliable Industrial Chemical Supplier in{" "}
              <span style={{ color: "#81c784" }}>Vapi, Gujarat</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in delay-300" style={{ color: "rgba(255,255,255,0.82)" }}>
              Bulk supply of sulphates, fertilizers, acids, fluoride base chemicals, EDTA &amp; chelated products, pharmaceutical chemicals, and specialty chemicals for industrial and agricultural applications.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-fade-in delay-400">
              <Link href="/contact#enquiry" className="btn-primary text-base py-3 px-7">
                Request Bulk Quotation <ArrowRight size={16} />
              </Link>
              <a href="/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf" download className="btn-secondary text-base py-3 px-7">
                <Download size={16} /> Download Catalogue
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm animate-fade-in delay-500" style={{ color: "rgba(255,255,255,0.65)" }}>
              {["Bulk supply across India", "COA available on request", "Grade-specific sourcing", "WhatsApp enquiry support"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle size={14} style={{ color: "#81c784" }} />{t}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)", zIndex: 4 }} />
      </section>

      {/* ── Stats section with count-up ─────────────────────── */}
      <HomeClient
        productCategories={productCategories}
        totalProducts={totalProducts}
        totalCategories={totalCategories}
        whyUs={whyUs}
        industries={industries}
        featuredProducts={featuredProducts}
        enquirySteps={enquirySteps}
        blogPosts={blogPosts}
      />
    </>
  );
}
