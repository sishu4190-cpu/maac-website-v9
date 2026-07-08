import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ConditionalLayout from "./components/ConditionalLayout";
import ClientOnlyWidgets from "./components/ClientOnlyWidgets";

export const metadata: Metadata = {
  metadataBase: new URL("https://mangalamchemicals.com"),
  title: {
    default: "Mangalam Acid and Chemicals | Industrial Chemical Supplier Vapi, Gujarat",
    template: "%s | Mangalam Acid and Chemicals",
  },
  description:
    "Mangalam Acid and Chemicals — ISO 9001:2015 certified bulk chemical supplier in Vapi, Gujarat. Sulphates, EDTA chelates, fluoride compounds, acids, NPK fertilizers, pharmaceutical chemicals. Pan-India supply. COA available.",
  keywords: [
    "chemical supplier vapi gujarat",
    "industrial chemical supplier india",
    "bulk chemical supplier gujarat",
    "ferrous sulphate supplier india",
    "zinc sulphate supplier vapi",
    "EDTA chelated products india",
    "NPK fertilizer supplier gujarat",
    "fluoride chemicals supplier india",
    "ISO certified chemical supplier",
    "mangalam acid chemicals",
    "chemical exporter vapi gujarat",
    "sulphate chemicals wholesale india",
    "phosphoric acid supplier india",
    "copper sulphate supplier gujarat",
  ],
  authors: [{ name: "Mangalam Acid and Chemicals" }],
  creator: "Mangalam Acid and Chemicals",
  publisher: "Mangalam Acid and Chemicals",
  category: "Chemical Supplier",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mangalamchemicals.com",
    siteName: "Mangalam Acid and Chemicals",
    title: "Mangalam Acid and Chemicals | Chemical Supplier, Vapi Gujarat",
    description: "ISO 9001:2015 certified bulk chemical supplier in Vapi, Gujarat. 80+ products across 6 categories. Pan-India supply with COA.",
    images: [{ url: "/assets/maac-media/images/maac-logo-full.webp", width: 1200, height: 630, alt: "Mangalam Acid and Chemicals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mangalam Acid and Chemicals | Chemical Supplier, Vapi Gujarat",
    description: "ISO certified bulk chemical supplier in Vapi, Gujarat. Sulphates, EDTA, Acids, NPK, Fluorides. COA available.",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: "https://mangalamchemicals.com" },
  verification: { google: "" },
};

// ── Structured Data Schemas ────────────────────────────────
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mangalamchemicals.com/#organization",
  name: "Mangalam Acid and Chemicals",
  alternateName: ["MAAC", "Mangalam Chemicals"],
  url: "https://mangalamchemicals.com",
  logo: { "@type": "ImageObject", url: "https://mangalamchemicals.com/assets/maac-media/images/maac-logo-full.webp", width: 400, height: 160 },
  description: "ISO 9001:2015 and ISO 45001:2018 certified supplier and exporter of industrial, agro, fertilizer, and specialty chemicals from Vapi, Gujarat, India.",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi",
    addressLocality: "Vapi",
    addressRegion: "Gujarat",
    postalCode: "396195",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 20.3714, longitude: 72.9091 },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-96620-88122", contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi", "Gujarati"], hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "19:00" } },
    { "@type": "ContactPoint", telephone: "+91-90818-32790", contactType: "customer service", areaServed: "IN" },
    { "@type": "ContactPoint", telephone: "+91-95379-70043", contactType: "technical support", areaServed: "IN" },
  ],
  email: "info@mangalamchemicals.com",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
  sameAs: [
    "https://www.instagram.com/mangalamchemicals",
    "https://www.facebook.com/share/1GK11G4kCK/",
    "https://www.linkedin.com/in/ravi-patel-4b51912b2",
    "https://www.indiamart.com/mangalam-acid-chemicals/",
    "https://youtube.com/@mangalamchemicals",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 9001:2015", recognizedBy: { "@type": "Organization", name: "Bureau Veritas" }, validThrough: "2028-05-11" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "ISO 45001:2018", recognizedBy: { "@type": "Organization", name: "Bureau Veritas" }, validThrough: "2028-05-11" },
  ],
  knowsAbout: [
    "Sulphates & Fertilizer Chemicals", "EDTA Chelated Micronutrients", "Fluoride Compounds",
    "Industrial Acids", "Pharmaceutical Chemicals", "NPK Fertilizers", "Chemical Export India",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ChemicalStore"],
  "@id": "https://mangalamchemicals.com/#localbusiness",
  name: "Mangalam Acid and Chemicals",
  image: "https://mangalamchemicals.com/assets/maac-media/images/maac-logo-full.webp",
  url: "https://mangalamchemicals.com",
  telephone: "+91-96620-88122",
  email: "info@mangalamchemicals.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi",
    addressLocality: "Vapi",
    addressRegion: "Gujarat",
    postalCode: "396195",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 20.3714, longitude: 72.9091 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "09:00", closes: "19:00",
  },
  priceRange: "$$",
  currenciesAccepted: "INR",
  paymentAccepted: "NEFT, RTGS, Cheque, Online Transfer",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "State", name: "Rajasthan" },
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "State", name: "Punjab" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120", bestRating: "5" },
  hasMap: "https://maps.google.com/?q=Vapi+INA+Gujarat+India",
  keywords: "chemical supplier vapi, industrial chemicals gujarat, sulphate supplier, EDTA chelated products, bulk chemical exporter india",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mangalamchemicals.com/#website",
  url: "https://mangalamchemicals.com",
  name: "Mangalam Acid and Chemicals",
  description: "ISO certified bulk chemical supplier in Vapi, Gujarat. 80+ industrial and agro chemicals.",
  publisher: { "@id": "https://mangalamchemicals.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://mangalamchemicals.com/products?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1a4d2e" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Vapi, Gujarat, India" />
        <meta name="geo.position" content="20.3714;72.9091" />
        <meta name="ICBM" content="20.3714, 72.9091" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <PageLoader />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <ClientOnlyWidgets />
      </body>
    </html>
  );
}
