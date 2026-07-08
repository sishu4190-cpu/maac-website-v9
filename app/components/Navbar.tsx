"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSiteData } from "../lib/useSiteData";

const SOCIAL_META = [
  { key: "instagram" as const, label: "Instagram", color: "#E1306C", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { key: "facebook" as const, label: "Facebook", color: "#1877F2", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { key: "linkedin" as const, label: "LinkedIn", color: "#0A66C2", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { key: "youtube" as const, label: "YouTube", color: "#FF0000", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

const productCategories = [
  { name: "Sulphates & Fertilizers", href: "/products/sulphates-fertilizers", icon: "🌱" },
  { name: "EDTA & Chelated Products", href: "/products/edta-chelated-products", icon: "🔬" },
  { name: "Fluoride Base Products", href: "/products/fluoride-base-products", icon: "⚗️" },
  { name: "Acids", href: "/products/acids", icon: "🧪" },
  { name: "Pharmaceutical Products", href: "/products/pharmaceutical-products", icon: "💊" },
  { name: "NPK Fertilizers", href: "/products/npk-fertilizers", icon: "🌾" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Quality", href: "/quality" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function NavbarSocials() {
  const { contact } = useSiteData();
  const activeSocials = SOCIAL_META.filter((s) => contact[s.key]);
  if (activeSocials.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5 pl-1 shrink-0" style={{ borderLeft: "1px solid #e5e7eb", marginLeft: 4, paddingLeft: 10 }}>
      {activeSocials.map((s) => (
        <a
          key={s.key}
          href={contact[s.key] || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6b7280", transition: "all 0.2s ease", textDecoration: "none", flexShrink: 0,
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = s.color; el.style.color = "white"; el.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#f3f4f6"; el.style.color = "#6b7280"; el.style.transform = ""; }}
        >
          {s.svg}
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <nav
      className="bg-white sticky top-0 z-50"
      style={{
        borderBottom: "1px solid #e5e7eb",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.09)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[68px]" style={{ gap: 0 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-6" style={{ textDecoration: "none" }}>
            <Image
              src="/assets/maac-media/images/maac-logo-navbar.webp"
              alt="Mangalam Acid and Chemicals Logo"
              width={104}
              height={120}
              style={{ objectFit: "contain", height: 48, width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link px-3.5 py-2 rounded text-sm font-medium whitespace-nowrap">
                {item.label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="nav-link px-3.5 py-2 rounded flex items-center gap-1 bg-transparent border-none cursor-pointer text-sm font-medium"
                style={{ fontFamily: "inherit" }}
                onMouseEnter={() => setProductsOpen(true)}
                onClick={() => setProductsOpen((v) => !v)}
              >
                Products
                <ChevronDown
                  size={14}
                  style={{
                    transition: "transform 0.25s",
                    transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full left-1/2 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50"
                  style={{ width: 260, marginTop: 8, transform: "translateX(-50%)", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link href="/products" className="block px-4 py-2.5 text-sm font-semibold" style={{ color: "#1a4d2e" }} onClick={() => setProductsOpen(false)}>
                    ← All Products
                  </Link>
                  <div style={{ height: 1, background: "#f3f4f6", margin: "4px 12px" }} />
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700"
                      style={{ transition: "background 0.15s, color 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f0fdf4"; (e.currentTarget as HTMLElement).style.color = "#1a4d2e"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = ""; }}
                      onClick={() => setProductsOpen(false)}
                    >
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>{cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery — placed right next to Products */}
            <Link href="/gallery" className="nav-link px-3.5 py-2 rounded text-sm font-medium whitespace-nowrap">
              Gallery
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0 ml-6">
            <Link href="/downloads" className="btn-outline-green text-sm py-2 px-4 whitespace-nowrap">
              Download Catalogue
            </Link>
            <Link href="/contact#enquiry" className="btn-primary text-sm py-2 px-4 whitespace-nowrap">
              Request Quotation
            </Link>
            <NavbarSocials />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              className="p-2 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: "#1a4d2e" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white" style={{ maxHeight: "85vh", overflowY: "auto" }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-700 font-medium text-sm border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div>
              <div className="py-3 text-gray-700 font-medium text-sm border-b border-gray-100">Products</div>
              <div className="pl-3 pt-1 space-y-0.5">
                <Link href="/products" className="block py-2 text-sm font-semibold" style={{ color: "#1a4d2e" }} onClick={() => setMobileOpen(false)}>
                  All Products
                </Link>
                {productCategories.map((cat) => (
                  <Link key={cat.href} href={cat.href} className="flex items-center gap-2 py-2.5 text-sm text-gray-600" onClick={() => setMobileOpen(false)}>
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/gallery"
              className="block py-3 text-gray-700 font-medium text-sm border-b border-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              Gallery
            </Link>

            <div className="pt-4 space-y-2.5 pb-2">
              <Link href="/downloads" className="btn-outline-green block w-full text-center text-sm py-3" onClick={() => setMobileOpen(false)}>
                Download Catalogue
              </Link>
              <Link href="/contact#enquiry" className="btn-primary block w-full text-center text-sm py-3" onClick={() => setMobileOpen(false)} style={{ justifyContent: "center" }}>
                Request Quotation
              </Link>
              <a
                href="https://wa.me/919662088122?text=Hello%20Mangalam%20Acid%20and%20Chemicals%2C%20I%20am%20interested%20in%20your%20chemical%20products."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm text-white"
                style={{ background: "#25D366" }}
                onClick={() => setMobileOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
