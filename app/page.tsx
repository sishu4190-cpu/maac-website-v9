import { Award, Truck, Users, Shield } from "lucide-react";
import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import HomeHero from "./components/HomeHero";

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
  },
  {
    id: "edta-chelated",
    name: "EDTA & Chelated Products",
    count: 18,
    desc: "Iron EDTA, zinc EDTA, Fe EDDHA, amino acids, and specialty chelated micronutrients.",
    icon: "🔬",
    href: "/products/edta-chelated-products",
    bg: "#1a3d4d",
  },
  {
    id: "fluoride-base",
    name: "Fluoride Base Products",
    count: 23,
    desc: "Ammonium, potassium, sodium fluoride compounds for metallurgy, glass, and ceramics.",
    icon: "⚗️",
    href: "/products/fluoride-base-products",
    bg: "#3d2d1a",
  },
  {
    id: "acids",
    name: "Acids",
    count: 10,
    desc: "Phosphoric acid, sulphuric acid, hydrochloric acid, nitric acid, formic acid, and more.",
    icon: "🧪",
    href: "/products/acids",
    bg: "#2d1a3d",
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical Products",
    count: 4,
    desc: "USP grade ferrous fumarate, zinc sulphate monohydrate, ferric pyrophosphate.",
    icon: "💊",
    href: "/products/pharmaceutical-products",
    bg: "#1a2d4d",
  },
  {
    id: "npk-fertilizers",
    name: "NPK Fertilizers",
    count: 8,
    desc: "19-19-19, potassium nitrate, MAP, MKP, potassium sulphate, and balanced NPK grades.",
    icon: "🌾",
    href: "/products/npk-fertilizers",
    bg: "#1a4d2e",
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
      {/* ── Hero section with Framer Motion animations ──────── */}
      <HomeHero />

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
