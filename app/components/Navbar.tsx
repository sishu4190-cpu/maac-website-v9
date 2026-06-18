"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const productCategories = [
  { name: "Sulphates & Fertilizers", href: "/products/sulphates-fertilizers", icon: "🌱" },
  { name: "EDTA & Chelated Products", href: "/products/edta-chelated-products", icon: "🔬" },
  { name: "Fluoride Base Products", href: "/products/fluoride-base-products", icon: "⚗️" },
  { name: "Acids", href: "/products/acids", icon: "🧪" },
  { name: "Pharmaceutical Products", href: "/products/pharmaceutical-products", icon: "💊" },
  { name: "NPK Fertilizers", href: "/products/npk-fertilizers", icon: "🌾" },
];

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

  return (
    <motion.nav
      className="bg-white sticky top-0 z-50"
      style={{
        borderBottom: "1px solid #e5e7eb",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.09)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        transition: "box-shadow 0.3s ease, backdrop-filter 0.3s ease",
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo — actual MAAC logo */}
          <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
            <Image
              src="/assets/maac-media/images/maac-logo-navbar.webp"
              alt="Mangalam Acid and Chemicals Logo"
              width={130}
              height={54}
              style={{ objectFit: "contain", height: 54, width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Industries", href: "/industries" },
              { label: "Quality", href: "/quality" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="nav-link px-3 py-2 rounded">
                {item.label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="nav-link px-3 py-2 rounded flex items-center gap-1 bg-transparent border-none cursor-pointer"
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
                  className="absolute top-full right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50"
                  style={{ width: 260, marginTop: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href="/products"
                    className="block px-4 py-2.5 text-sm font-semibold"
                    style={{ color: "#1a4d2e" }}
                    onClick={() => setProductsOpen(false)}
                  >
                    ← All Products
                  </Link>
                  <div style={{ height: 1, background: "#f3f4f6", margin: "4px 12px" }} />
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700"
                      style={{ transition: "background 0.15s, color 0.15s" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
                        (e.currentTarget as HTMLElement).style.color = "#1a4d2e";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "";
                        (e.currentTarget as HTMLElement).style.color = "";
                      }}
                      onClick={() => setProductsOpen(false)}
                    >
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="/downloads" className="btn-outline-green text-sm py-2 px-5">
              Download Catalogue
            </Link>
            <Link
              href="/contact#enquiry"
              className="btn-primary text-sm py-2 px-5"
              style={{ fontSize: "0.88rem" }}
            >
              Request Quotation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "#1a4d2e" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white" style={{ maxHeight: "85vh", overflowY: "auto" }}>
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Logo */}
            <div className="py-2 mb-2">
              <Image
                src="/assets/maac-media/images/maac-logo-navbar.webp"
                alt="Mangalam Acid and Chemicals"
                width={120}
                height={50}
                style={{ objectFit: "contain", height: 44, width: "auto" }}
              />
            </div>
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Industries", href: "/industries" },
              { label: "Quality", href: "/quality" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2.5 text-gray-700 font-medium text-sm border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div>
              <div className="py-2.5 text-gray-700 font-medium text-sm border-b border-gray-100">Products</div>
              <div className="pl-3 pt-1 space-y-0.5">
                <Link
                  href="/products"
                  className="block py-2 text-sm font-semibold"
                  style={{ color: "#1a4d2e" }}
                  onClick={() => setMobileOpen(false)}
                >
                  All Products
                </Link>
                {productCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center gap-2 py-2 text-sm text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 space-y-2.5">
              <Link
                href="/downloads"
                className="btn-outline-green block w-full text-center text-sm py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                Download Catalogue
              </Link>
              <Link
                href="/contact#enquiry"
                className="btn-primary block w-full text-center text-sm py-2.5"
                onClick={() => setMobileOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Request Quotation
              </Link>
              <a
                href="https://wa.me/919662088122?text=Hello%20Mangalam%20Acid%20and%20Chemicals%2C%20I%20am%20interested%20in%20your%20chemical%20products.%20Please%20share%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-sm text-white"
                style={{ background: "#25D366" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
            <div className="pt-2 pb-1 text-xs text-gray-400 text-center">
              +91 96620 88122 · mangalamacidandchemicals@gmail.com
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
