import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, CheckCircle, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Mangalam Acid and Chemicals, Vapi, Gujarat",
  description: "Learn about Mangalam Acid and Chemicals — a Vapi, Gujarat-based supplier and exporter of industrial and agro chemicals. ISO 9001:2015 & ISO 45001:2018 certified. MSME registered.",
  alternates: { canonical: "https://mangalamchemicals.com/about" },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Mangalam Acid and Chemicals',
    url: 'https://mangalamchemicals.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Mangalam Acid and Chemicals',
      legalName: 'Mangalam Acid and Chemicals',
      foundingLocation: 'Vapi, Gujarat, India',
      description: 'ISO 9001:2015 and ISO 45001:2018 certified manufacturer, supplier and exporter of industrial, agro, fertilizer and specialty chemicals based in Vapi, Gujarat, India.',
      url: 'https://mangalamchemicals.com',
      logo: 'https://mangalamchemicals.com/assets/maac-media/images/maac-logo-full.jpeg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA)',
        addressLocality: 'Pardi',
        addressRegion: 'Gujarat',
        postalCode: '396195',
        addressCountry: 'IN',
      },
      email: 'info@mangalamchemicals.com',
      telephone: '+91-96620-88122',
      sameAs: [
        'https://www.instagram.com/mangalamchemicals',
        'https://www.facebook.com/share/1GK11G4kCK/',
        'https://www.linkedin.com/in/ravi-patel-4b51912b2',
        'https://youtube.com/@mangalamchemicals',
        'https://www.indiamart.com/mangalam-acid-chemicals/',
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <section style={{ backgroundColor: "#0f2d1a" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">About Mangalam Acid and Chemicals</h1>
          <p className="text-gray-300 mt-3 text-lg">Supplier and exporter of industrial, agro, fertilizer and specialty chemicals from Vapi, Gujarat, India.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">Your Trusted Chemical Procurement Partner</h2>
              <div className="prose text-gray-600 leading-relaxed space-y-4 mt-5">
                <p>Mangalam Acid and Chemicals is a Vapi, Gujarat-based supplier and exporter of industrial-grade and agro chemicals, serving buyers across India. The company operates from GIDC Vapi (396195), one of India&apos;s largest and most established chemical industrial clusters.</p>
                <p>We specialize in the supply and distribution of sulphate chemicals, nitrate chemicals, chloride chemicals, fertilizer chemicals, EDTA and chelated products, fluoride base compounds, industrial acids, pharmaceutical-grade chemicals, and NPK fertilizers.</p>
                <p>Our supply chain covers pan-India distribution with documentation support including COA (Certificate of Analysis), MSDS, and product specifications available on request. Export enquiries are welcome.</p>
                <p>Mangalam Acid and Chemicals is registered under MSME UDYAM (GJ-25-0006759), certified under ISO 9001:2015 (IN59785A) and ISO 45001:2018 (IN59785C-1), and verified by Dun &amp; Bradstreet (DUNS: 813884357) and IndiaMart TrustSEAL.</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#f0f9f0", border: "1px solid #bde0bd" }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: "#1a4d2e" }}>Company at a Glance</h3>
                <div className="space-y-3">
                  {[
                    { label: "Business Type", value: "Supplier & Exporter" },
                    { label: "Location", value: "Vapi (GIDC), Gujarat, India" },
                    { label: "Pincode", value: "396195" },
                    { label: "ISO Certification", value: "ISO 9001:2015 · ISO 45001:2018" },
                    { label: "MSME UDYAM", value: "GJ-25-0006759" },
                    { label: "D&B DUNS", value: "813884357" },
                    { label: "Business Hours", value: "Mon–Sat, 9:00 AM – 7:00 PM IST" },
                    { label: "Supply Reach", value: "Pan India · Export enquiries welcome" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start gap-3 py-2 border-b border-green-100 last:border-0">
                      <span className="text-sm font-semibold w-40 shrink-0" style={{ color: "#1a4d2e" }}>{label}</span>
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                <h3 className="font-semibold text-base mb-3 text-orange-800">Contact Information</h3>
                <div className="space-y-2 text-sm text-orange-900">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India</span>
                  </div>
                  {["+91 96620 88122", "+91 90818 32790", "+91 95379 70043"].map(ph => (
                    <div key={ph} className="flex items-center gap-2">
                      <Phone size={14} />
                      <a href={`tel:${ph.replace(/\s/g,"")}`} className="hover:underline">{ph}</a>
                    </div>
                  ))}
                  {["info@mangalamchemicals.com", "inquiry@mangalamchemicals.com"].map(em => (
                    <div key={em} className="flex items-center gap-2">
                      <Mail size={14} />
                      <a href={`mailto:${em}`} className="hover:underline">{em}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-label">Verified & Registered</div>
            <h2 className="section-title">Certifications & Registrations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "GST Certificate", no: "24ABPFM7919L1ZK", desc: "Goods & Services Tax Registration Certificate issued by Govt. of India. Regular registration since 18 Jan 2021.", file: "/assets/maac-media/certificates/GST-Certificate.pdf", icon: "🇮🇳" },
              { name: "ISO 9001:2015", no: "IN59785A", desc: "Quality Management System certification ensuring consistent quality standards across all supply and distribution operations.", file: "/assets/maac-media/certificates/ISO-9001-2015.pdf", icon: "🏆" },
              { name: "ISO 45001:2018", no: "IN59785C-1", desc: "Occupational Health and Safety Management System certification for workplace safety standards.", file: "/assets/maac-media/certificates/ISO-45001-2018.pdf", icon: "🛡️" },
              { name: "MSME UDYAM", no: "GJ-25-0006759", desc: "Registered under the Ministry of Micro, Small and Medium Enterprises, Government of India.", file: "/assets/maac-media/certificates/MSME-UDYAM.pdf", icon: "🏛️" },
              { name: "IEC Certificate", no: "ABPFM7919L", desc: "Import-Export Code issued by DGFT, Ministry of Commerce & Industry, Government of India.", file: "/assets/maac-media/certificates/IEC-certificate.pdf", icon: "🌏" },
              { name: "TrustSEAL IndiaMart", no: "Certified July 2024", desc: "IndiaMart TrustSEAL verified supplier — indicating verified business details and buyer protection.", file: "/assets/maac-media/certificates/IndiaMART-TrustSEAL.pdf", icon: "🔏" },
            ].map((cert) => (
              <div key={cert.name} className="cert-card reveal" style={{ display: "flex", flexDirection: "column" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ fontSize: 26 }}>{cert.icon}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "#1a4d2e" }}>{cert.name}</div>
                    {cert.no && <div className="text-xs font-mono text-gray-500">{cert.no}</div>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ flex: 1, marginBottom: 12 }}>{cert.desc}</p>
                {cert.file && (
                  <a href={cert.file} download
                    className="inline-flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-full border transition-all about-cert-dl-btn"
                    style={{ borderColor: "#1a4d2e", color: "#1a4d2e", width: "fit-content", textDecoration: "none" }}
                  >
                    ↓ Download Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="section-label">What We Supply</div>
            <h2 className="section-title">Chemical Categories</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["Sulphate Chemicals", "Nitrate Chemicals", "Chloride Chemicals", "Fertilizer Chemicals", "Textile Chemicals", "Water Treatment Chemicals", "Fluoride Chemicals", "Industrial Chemicals", "EDTA Chemicals", "Pharmaceutical Chemicals", "Oil & Drilling Chemicals", "NPK Fertilizers"].map((cat) => (
              <span key={cat} className="industry-pill">{cat}</span>
            ))}
          </div>
          <div className="text-center">
            <Link href="/products" className="btn-primary">Browse All Products</Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#1a4d2e" }} className="py-12 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Discuss Your Chemical Requirements?</h2>
          <p className="text-gray-300 mb-6">Reach us via phone, email, or WhatsApp. Share your product name, grade, quantity, and delivery location to receive a quotation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary">Send Enquiry</Link>
            <Link href="/downloads" className="btn-secondary">Download Catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
