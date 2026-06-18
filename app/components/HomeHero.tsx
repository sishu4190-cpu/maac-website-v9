"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import ChemicalParticles from "./ChemicalParticles";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const headlineWords = "Reliable Industrial Chemical Supplier in".split(" ");
const accentWords = ["Vapi,", "Gujarat"];

const wordVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const trustItems = [
  "Bulk supply across India",
  "COA available on request",
  "Grade-specific sourcing",
  "WhatsApp enquiry support",
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        poster="/assets/maac-media/images/hero-poster.webp"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/assets/maac-media/videos/chemical-industry-hero.mp4" type="video/mp4" />
        <source src="/assets/maac-media/videos/chemical-industry-hero.webm" type="video/webm" />
      </video>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(135deg, rgba(10,26,16,0.94) 0%, rgba(15,45,26,0.88) 55%, rgba(26,77,46,0.7) 100%)",
      }} />

      {/* Molecule pattern */}
      <div className="molecule-bg" style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.4 }} />

      {/* Floating chemical particles */}
      <ChemicalParticles />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 w-full" style={{ zIndex: 3 }}>
        <div className="max-w-3xl">

          {/* Certification badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(244,162,40,0.15)", color: "#f9c06a", border: "1px solid rgba(244,162,40,0.3)", backdropFilter: "blur(8px)" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f4a228", display: "inline-block" }} />
              ISO 9001:2015 · ISO 45001:2018 · MSME · D&amp;B Verified · IEC Holder
            </div>
          </motion.div>

          {/* Headline — word-by-word stagger */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
            }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ display: "inline-block", marginRight: "0.28em" }}
              >
                {word}
              </motion.span>
            ))}
            <span style={{ color: "#81c784" }}>
              {accentWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{
                    display: "inline-block",
                    marginRight: i < accentWords.length - 1 ? "0.28em" : 0,
                    color: "#81c784",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            style={{ color: "rgba(255,255,255,0.82)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.88 }}
          >
            Bulk supply of sulphates, fertilizers, acids, fluoride base chemicals, EDTA &amp; chelated products, pharmaceutical chemicals, and specialty chemicals for industrial and agricultural applications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.05 }}
          >
            <Link href="/contact#enquiry" className="btn-primary text-base py-3 px-7">
              Request Bulk Quotation <ArrowRight size={16} />
            </Link>
            <a
              href="/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf"
              download
              className="btn-secondary text-base py-3 px-7"
            >
              <Download size={16} /> Download Catalogue
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap gap-6 mt-10 text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.28 }}
          >
            {trustItems.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: "#81c784" }} />
                {t}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-10 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)", zIndex: 4 }}
      />
    </section>
  );
}
