import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import SocialEmbed from "@/app/components/SocialEmbed";

// lucide-react (pinned to v1.18.0 in this project) doesn't ship brand icons,
// so Instagram/LinkedIn use the same inline SVGs as the Navbar/Footer for
// visual consistency.
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Social Media | Mangalam Acid and Chemicals",
  description: "Latest Instagram and LinkedIn posts, reels and updates from Mangalam Acid and Chemicals — Vapi, Gujarat.",
  alternates: { canonical: "https://mangalamchemicals.com/social" },
};

export default async function SocialPage() {
  const { readData } = await import("@/app/lib/dataStore");
  const data = await readData();
  const embedCode = data.socialEmbedCode || "";
  const { instagram, linkedin } = data.contact;

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)" }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl reveal">
            <div className="section-label mb-3" style={{ color: "#f4a228" }}>Social Media</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Follow Us for Updates</h1>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
              New posts and reels from our Instagram and LinkedIn appear here automatically — trade fairs, dispatches, plant updates, and more.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <InstagramIcon /> Instagram
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <LinkedinIcon /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {embedCode ? (
            <SocialEmbed code={embedCode} />
          ) : (
            <div className="text-center py-16 px-6 rounded-2xl" style={{ background: "#f8fdf9", border: "1px dashed #bde0bd" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📱</div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#1a4d2e" }}>Live feed coming soon</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Our latest Instagram and LinkedIn posts will appear on this page automatically once the feed is connected. In the meantime, follow us directly:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <InstagramIcon /> View on Instagram <ExternalLink size={13} />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <LinkedinIcon /> View on LinkedIn <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: "#1a4d2e" }} className="py-12 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have a Bulk Requirement?</h2>
          <p className="text-gray-300 mb-6">Send us your product name, grade, quantity, and delivery location — we respond within one business day.</p>
          <Link href="/contact#enquiry" className="btn-primary">Send Product Enquiry</Link>
        </div>
      </section>
    </>
  );
}
