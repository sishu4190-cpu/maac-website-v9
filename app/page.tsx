import Link from "next/link";
import { CheckCircle, Award, Truck, Users, ArrowRight, Download, Shield, FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";

export const metadata: Metadata = {
  title: "Mangalam Acid and Chemicals | Industrial Chemical Supplier, Vapi, Gujarat",
  description: "Mangalam Acid and Chemicals is a Vapi, Gujarat-based supplier and exporter of industrial and agro chemicals. Sulphates, EDTA chelates, fluoride compounds, acids, NPK fertilizers. ISO 9001:2015 certified. Bulk supply across India.",
  alternates: { canonical: "https://mangalamchemicals.com" },
};

const productCategories = [
  {
    id: "sulphates-fertilizers",
    name: "Sulphates & Fertilizers",
    count: 20,
    desc: "Ferrous sulphate, zinc sulphate, magnesium sulphate, copper sulphate, nitrates, and more.",
    icon: "🌱",
    href: "/products/sulphates-fertilizers",
    bg: "#2d5a1b",
    image: "/assets/maac-media/images/categories/sulphates-fertilizers.jpg",
  },
  {
    id: "edta-chelated",
    name: "EDTA & Chelated Products",
    count: 18,
    desc: "Iron EDTA, zinc EDTA, Fe EDDHA, amino acids, and specialty chelated micronutrients.",
    icon: "🔬",
    href: "/products/edta-chelated-products",
    bg: "#1a3d4d",
    image: "/assets/maac-media/images/categories/edta-chelated-products.jpg",
  },
  {
    id: "fluoride-base",
    name: "Fluoride Base Products",
    count: 23,
    desc: "Ammonium, potassium, sodium fluoride compounds for metallurgy, glass, and ceramics.",
    icon: "⚗️",
    href: "/products/fluoride-base-products",
    bg: "#3d2d1a",
    image: "/assets/maac-media/images/categories/fluoride-base-products.png",
  },
  {
    id: "acids",
    name: "Acids",
    count: 10,
    desc: "Phosphoric acid, sulphuric acid, hydrochloric acid, nitric acid, formic acid, and more.",
    icon: "🧪",
    href: "/products/acids",
    bg: "#2d1a3d",
    image: "/assets/maac-media/images/categories/acids.png",
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical Products",
    count: 4,
    desc: "USP grade ferrous fumarate, zinc sulphate monohydrate, ferric pyrophosphate.",
    icon: "💊",
    href: "/products/pharmaceutical-products",
    bg: "#1a2d4d",
    image: "/assets/maac-media/images/categories/pharmaceutical-products.png",
  },
  {
    id: "npk-fertilizers",
    name: "NPK Fertilizers",
    count: 8,
    desc: "19-19-19, potassium nitrate, MAP, MKP, potassium sulphate, and balanced NPK grades.",
    icon: "🌾",
    href: "/products/npk-fertilizers",
    bg: "#1a4d2e",
    image: "/assets/maac-media/images/categories/npk-fertilizers.png",
  },
];

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
  { name: "Zinc Sulphate Heptahydrate 21%", category: "Sulphates & Fertilizers", use: "Zinc micronutrient for crops", href: "/products/sulphates-fertilizers/zinc-sulphate-hepta", icon: "🌱" },
  { name: "Ferrous Sulphate Heptahydrate", category: "Sulphates & Fertilizers", use: "Iron fertilizer & water treatment", href: "/products/sulphates-fertilizers/ferrous-sulphate-heptahydrate", icon: "⚗️" },
  { name: "Iron EDTA", category: "EDTA & Chelated", use: "Chelated iron for foliar & drip use", href: "/products/edta-chelated-products/iron-edta", icon: "🔬" },
  { name: "NPK 19-19-19", category: "NPK Fertilizers", use: "Balanced water-soluble NPK for fertigation", href: "/products/npk-fertilizers/npk-19-19-19", icon: "🌾" },
  { name: "Phosphoric Acid", category: "Acids", use: "Fertilizer, food & industrial processes", href: "/products/acids/phosphoric-acid", icon: "🧪" },
  { name: "Calcium Nitrate", category: "Sulphates & Fertilizers", use: "Water-soluble Ca+N for fertigation", href: "/products/sulphates-fertilizers/calcium-nitrate", icon: "💧" },
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

export default function Home() {
  return (
    <>
      {/* ── Hero section with video background ─────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        {/* Hero background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/maac-media/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
          }}
        />
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
        whyUs={whyUs}
        industries={industries}
        featuredProducts={featuredProducts}
        enquirySteps={enquirySteps}
        blogPosts={blogPosts}
      />
    </>
  );
}
