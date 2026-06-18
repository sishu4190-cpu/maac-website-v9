"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSiteData } from "../lib/useSiteData";

const categories = [
  { name: "Sulphates & Fertilizers", href: "/products/sulphates-fertilizers" },
  { name: "EDTA & Chelated Products", href: "/products/edta-chelated-products" },
  { name: "Fluoride Base Products", href: "/products/fluoride-base-products" },
  { name: "Acids", href: "/products/acids" },
  { name: "Pharmaceutical Products", href: "/products/pharmaceutical-products" },
  { name: "NPK Fertilizers", href: "/products/npk-fertilizers" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "All Products", href: "/products" },
  { name: "Industries We Serve", href: "/industries" },
  { name: "Quality & Documentation", href: "/quality" },
  { name: "Downloads", href: "/downloads" },
  { name: "Blog / Knowledge Centre", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mangalamchemicals",
    color: "#E1306C",
    svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EHD6Jciom/",
    color: "#1877F2",
    svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ravi-patel-4b51912b2",
    color: "#0A66C2",
    svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "YouTube (coming soon)",
    href: "#",
    color: "#FF0000",
    svg: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

export default function Footer() {
  const { contact } = useSiteData();
  const wa = contact.whatsapp.replace(/\D/g, "");
  return (
    <footer style={{ backgroundColor: "#0f2d1a" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company info — logo removed, text branding only */}
        <div className="lg:col-span-1">
          <p className="text-white font-bold text-base mb-4">Mangalam Acid and Chemicals</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Supplier and exporter of industrial, agro, fertilizer, and specialty chemicals from Vapi, Gujarat, India. ISO 9001:2015 & ISO 45001:2018 certified.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#f4a228" }} />
              <span className="text-gray-400">PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA, Pardi, Valsad – 396195, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: "#f4a228" }} />
              <span className="text-gray-400">Mon–Sat: 9:00 AM – 7:00 PM</span>
            </div>
          </div>

          {/* Social links with brand colours */}
          <div className="flex items-center gap-3 mt-5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href === "#" ? undefined : "_blank"}
                rel={s.href === "#" ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                title={s.label}
                style={{
                  width: 36, height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                  opacity: s.href === "#" ? 0.4 : 1,
                }}
                onMouseEnter={e => {
                  if (s.href === "#") return;
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = s.color;
                  el.style.color = "white";
                  el.style.transform = "translateY(-3px) scale(1.1)";
                  el.style.boxShadow = `0 6px 18px ${s.color}55`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.08)";
                  el.style.color = "rgba(255,255,255,0.6)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Product categories */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: "#f4a228", fontSize: 10 }}>▸</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <a
              href="/assets/maac-media/certificates/MAAC-Product-Catalogue.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-full border transition-all"
              style={{ borderColor: "#f4a228", color: "#f4a228" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#f4a228";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "";
                (e.currentTarget as HTMLElement).style.color = "#f4a228";
              }}
            >
              ↓ Download Catalogue
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                  style={{ textDecoration: "none" }}
                >
                  <span style={{ color: "#f4a228", fontSize: 10 }}>▸</span>
                  {link.name}
                </Link>
              </li>
            ))}
            <li><Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ textDecoration: "none" }}>Privacy Policy</Link></li>
            <li><Link href="/terms-conditions" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ textDecoration: "none" }}>Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h3>
          <div className="space-y-3 text-sm">
            {contact.phones.map(p => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                style={{ textDecoration: "none" }}
              >
                <Phone size={13} style={{ color: "#f4a228", flexShrink: 0 }} /> {p}
              </a>
            ))}
            {contact.emails.map(e => (
              <a key={e} href={`mailto:${e}`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors break-all"
                style={{ textDecoration: "none", fontSize: 12 }}
              >
                <Mail size={13} style={{ color: "#f4a228", flexShrink: 0 }} /> {e}
              </a>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Certifications</div>
            <div className="flex flex-wrap gap-2">
              {["ISO 9001", "ISO 45001", "MSME", "D&B", "IndiaMart", "IEC"].map((cert) => (
                <span key={cert} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "#81c784", border: "1px solid rgba(129,199,132,0.2)" }}>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${wa}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20chemicals.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold py-2.5 px-5 rounded-full transition-all"
            style={{ backgroundColor: "#25D366", color: "white", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(37,211,102,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,211,102,0.35)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Enquiry
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Mangalam Acid and Chemicals. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-2 justify-center">
            <a href="https://www.indiamart.com/mangalam-acid-chemicals/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" style={{ textDecoration: "none" }}>IndiaMart TrustSEAL Verified</a>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors" style={{ textDecoration: "none" }}>Privacy</Link>
            <span>·</span>
            <Link href="/terms-conditions" className="hover:text-gray-300 transition-colors" style={{ textDecoration: "none" }}>Terms</Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors" style={{ textDecoration: "none" }}>Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
