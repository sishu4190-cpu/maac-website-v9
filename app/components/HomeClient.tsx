"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";
import type { ReactNode } from "react";

interface Category { id: string; name: string; count: number; countLabel?: string; desc: string; icon: string; href: string; bg: string; image?: string; }
interface WhyUsItem { icon: ReactNode; title: string; desc: string; color: string; }
interface FeaturedProduct { name: string; category: string; use: string; href: string; icon: string; }
interface EnquiryStep { step: string; title: string; desc: string; tooltip: string; icon: string; }
interface BlogPost { title: string; slug: string; date: string; readTime: string; tag: string; }

interface Props {
  productCategories: Category[];
  totalProducts: number;
  totalCategories: number;
  whyUs: WhyUsItem[];
  industries: string[];
  featuredProducts: FeaturedProduct[];
  enquirySteps: EnquiryStep[];
  blogPosts: BlogPost[];
}

// Count-up hook
function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [start, target, duration]);
  return count;
}

export default function HomeClient({ productCategories, totalProducts, totalCategories, whyUs, industries, featuredProducts, enquirySteps, blogPosts }: Props) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const cats = useCountUp(totalCategories, 1200, statsVisible);
  const prods = useCountUp(totalProducts, 1400, statsVisible);
  const inds = useCountUp(12, 1200, statsVisible);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="py-3">
              <div className="text-3xl font-bold" style={{ color: "#1a4d2e" }}>{cats}+</div>
              <div className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Product Categories</div>
            </div>
            <div className="py-3">
              <div className="text-3xl font-bold" style={{ color: "#1a4d2e" }}>{prods}+</div>
              <div className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Chemical Products</div>
            </div>
            <div className="py-3">
              <div className="text-3xl font-bold" style={{ color: "#1a4d2e" }}>{inds}+</div>
              <div className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Industries Served</div>
            </div>
            <div className="py-3">
              <div className="text-3xl font-bold" style={{ color: "#f4a228" }}>Pan India</div>
              <div className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Supply Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Categories ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-label">What We Supply</div>
            <h2 className="section-title">{totalCategories} Major Product Categories</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Manufacturer, supplier and exporter of sulphate, nitrate, chloride, fertilizer, textile, water treatment, fluoride, industrial, EDTA and pharmaceuticals chemicals — all under one verified supplier.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {productCategories.map((cat) => (
              <Link key={cat.id} href={cat.href} className="category-card reveal-scale block" style={{ textDecoration: "none" }}>
                {/* Background colour block simulating a photo card */}
                <div style={{
                  backgroundImage: cat.image ? `linear-gradient(135deg, rgba(15,45,26,0.78) 0%, rgba(10,28,18,0.85) 100%), url('${cat.image}')` : `linear-gradient(135deg, ${cat.bg} 0%, #0f2d1a 100%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 220, padding: "2rem",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  position: "relative", borderRadius: 14, overflow: "hidden",
                }}>
                  {/* Subtle molecule pattern */}
                  {!cat.image && <div className="molecule-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                      background: "rgba(244,162,40,0.2)", color: "#f9c06a",
                      border: "1px solid rgba(244,162,40,0.3)",
                    }}>
                      {cat.count}+ {cat.countLabel || "Products"}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-3 leading-snug">{cat.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>{cat.desc}</p>
                  </div>
                  <div className="category-card-arrow" style={{ position: "relative", zIndex: 1, marginTop: 16 }}>
                    View Products <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link href="/products" className="btn-outline-green">
              Browse All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured / Popular Products ─────────────────────── */}
      <section className="py-20" style={{ background: "#f8fdf9" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-label">Popular Products</div>
            <h2 className="section-title">Most Enquired Chemicals</h2>
            <p className="section-subtitle max-w-xl mx-auto">Frequently ordered products by bulk buyers across agriculture, fertilizer, and industrial sectors.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {featuredProducts.map((p) => (
              <Link key={p.name} href={p.href} className="product-card card-hover reveal block group" style={{ textDecoration: "none" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#4caf50", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      {p.category}
                    </div>
                    <h3 style={{ fontWeight: 700, color: "#1a4d2e", fontSize: "0.95rem", lineHeight: 1.4 }}>{p.name}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{p.use}</p>
                    <div className="flex items-center gap-1.5 mt-3" style={{ color: "#f4a228", fontSize: 13, fontWeight: 600, transition: "gap 0.2s" }}>
                      View Product <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Mangalam ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <div className="section-label">Why Choose Us</div>
              <h2 className="section-title">Your Trusted B2B Chemical Partner</h2>
              <p className="section-subtitle">
                From Vapi's industrial heartland, we supply verified, grade-specific chemicals with full documentation support — COA, ISO certificates, and procurement assistance.
              </p>
              <div className="mt-8 space-y-5">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 card-hover" style={{ background: "#fafafa" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `${item.color}18`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.color, flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 700, color: "#1a4d2e", fontSize: "0.95rem" }}>{item.title}</h3>
                      <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6, marginTop: 4 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/about" className="btn-green">About the Company <ArrowRight size={15} /></Link>
                <Link href="/quality" className="btn-outline-green">Quality & Certifications</Link>
              </div>
            </div>

            {/* Certifications card */}
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden" style={{
                background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)",
                padding: "2rem", boxShadow: "0 20px 60px rgba(26,77,46,0.25)",
              }}>
                <div className="molecule-bg" style={{ position: "absolute", opacity: 0.3 }} />
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f4a228", marginBottom: 8 }}>
                  Certifications & Registrations
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", marginBottom: 24 }}>
                  Verified. Certified. Trusted.
                </h3>
                {[
                  { label: "ISO 9001:2015", no: "IN59785A", icon: "🏆", desc: "Quality Management System" },
                  { label: "ISO 45001:2018", no: "IN59785C-1", icon: "🛡️", desc: "Occupational Health & Safety" },
                  { label: "MSME UDYAM", no: "GJ-25-0006759", icon: "🏛️", desc: "Ministry of MSME, Govt. of India" },
                  { label: "D&B DUNS", no: "813884357", icon: "✅", desc: "Dun & Bradstreet Verified" },
                  { label: "IndiaMART TrustSEAL", no: "July 2024", icon: "🔏", desc: "Verified Supplier" },
                  { label: "IEC — Import/Export", no: "ABPFM7919L", icon: "🌏", desc: "DGFT Govt. of India" },
                ].map((cert) => (
                  <div key={cert.label}
                    className="flex items-center gap-3 p-3 rounded-xl mb-3 transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(129,199,132,0.4)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <span style={{ fontSize: 22 }}>{cert.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{cert.label}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{cert.desc}</div>
                    </div>
                    <span style={{ color: "#f9c06a", fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>{cert.no}</span>
                  </div>
                ))}
                <Link href="/quality" className="btn-primary mt-4 w-full text-center" style={{ justifyContent: "center" }}>
                  View All Certifications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#f0fdf4" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <div className="section-label">Market Reach</div>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle max-w-xl mx-auto">From agriculture to pharmaceuticals — our chemicals power diverse industries across India.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center reveal">
            {industries.map((ind) => (
              <span key={ind} className="industry-pill">{ind}</span>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link href="/industries" className="btn-green">
              View Industries We Serve <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Enquiry Process ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">Bulk Enquiry in 4 Steps</h2>
            <p className="section-subtitle max-w-xl mx-auto">Fast, transparent, and hassle-free procurement for B2B chemical buyers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {enquirySteps.map((s, i) => (
              <div key={s.step} className="tooltip-wrap reveal">
                <div className="rounded-2xl p-6 text-center border border-gray-100 card-hover" style={{ background: i % 2 === 0 ? "#fafafa" : "white" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a4d2e, #2d6e47)",
                    color: "white", fontWeight: 800, fontSize: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px",
                    boxShadow: "0 4px 14px rgba(26,77,46,0.35)",
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1a4d2e", fontSize: "1rem", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
                <div className="tooltip-box">{s.tooltip}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10 reveal">
            <Link href="/contact#enquiry" className="btn-primary">
              Send Product Enquiry <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/919662088122?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20chemical%20product." target="_blank" rel="noopener noreferrer"
              className="btn-outline-green flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* ── Blog / Knowledge Centre ─────────────────────────── */}
      <section className="py-20" style={{ background: "#f8fdf9" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 reveal">
            <div>
              <div className="section-label">Knowledge Centre</div>
              <h2 className="section-title">Chemical Procurement Insights</h2>
            </div>
            <Link href="/blog" className="btn-outline-green flex-shrink-0">View All Articles <ArrowRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-2xl border border-gray-200 bg-white card-hover reveal overflow-hidden" style={{ textDecoration: "none" }}>
                <div style={{ height: 6, background: "linear-gradient(90deg, #1a4d2e, #4caf50)" }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "#dcfce7", color: "#1a4d2e" }}>
                      {post.tag}
                    </span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.readTime} read</span>
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1a2e1c", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 12 }}>{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
                    <span style={{ color: "#f4a228", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      Read Article <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 60%, #2d6e47 100%)" }}>
        <div className="molecule-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center reveal">
          <div className="section-label" style={{ color: "#f9c06a" }}>Start Today</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Looking for a Bulk Chemical Supplier?</h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 32 }}>
            Share your product, grade, quantity and delivery location. Our team responds within the same business day with pricing and availability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary text-base py-3 px-8">
              Send Bulk Enquiry <ArrowRight size={16} />
            </Link>
            <a href="/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf" download className="btn-secondary text-base py-3 px-8">
              <Download size={16} /> Product Catalogue
            </a>
            <a href="tel:+919662088122" className="btn-secondary text-base py-3 px-8">
              <Phone size={16} /> +91 96620 88122
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
