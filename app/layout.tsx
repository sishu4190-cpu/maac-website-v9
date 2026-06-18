import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PageLoader } from "./components/FloatingWidgets";
import ConditionalLayout from "./components/ConditionalLayout";
import ClientOnlyWidgets from "./components/ClientOnlyWidgets";

export const metadata: Metadata = {
  metadataBase: new URL("https://mangalamchemicals.com"),
  title: {
    default: "Mangalam Acid and Chemicals | Industrial Chemical Supplier, Vapi, Gujarat",
    template: "%s | Mangalam Acid and Chemicals",
  },
  description:
    "Mangalam Acid and Chemicals is a Vapi, Gujarat-based supplier and exporter of industrial and agro chemicals — sulphates, EDTA chelates, fluoride compounds, acids, NPK fertilizers, and pharmaceutical chemicals. ISO 9001:2015 certified. Bulk supply across India.",
  keywords: ["industrial chemical supplier vapi", "chemical supplier gujarat", "sulphate chemicals supplier", "EDTA chelated products india", "fluoride chemicals supplier", "NPK fertilizer supplier", "bulk chemical exporter gujarat"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mangalamchemicals.com",
    siteName: "Mangalam Acid and Chemicals",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: "https://mangalamchemicals.com" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mangalam Acid and Chemicals",
  alternateName: "MAAC",
  url: "https://mangalamchemicals.com",
  logo: { "@type": "ImageObject", url: "https://mangalamchemicals.com/assets/maac-media/images/maac-logo-full.webp" },
  description: "Supplier and exporter of industrial, agro, fertilizer, and specialty chemicals from Vapi, Gujarat, India. ISO 9001:2015 & ISO 45001:2018 certified.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi",
    addressLocality: "Valsad", addressRegion: "Gujarat", postalCode: "396195", addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-96620-88122", contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi", "Gujarati"] },
    { "@type": "ContactPoint", telephone: "+91-90818-32790", contactType: "customer service", areaServed: "IN" },
  ],
  email: "mangalamacidandchemicals@gmail.com",
  sameAs: [
    "https://www.instagram.com/mangalamchemicals",
    "https://www.facebook.com/share/1EHD6Jciom/",
    "https://www.linkedin.com/in/ravi-patel-4b51912b2",
    "https://www.indiamart.com/mangalam-acid-chemicals/",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://mangalamchemicals.com/#localbusiness",
  name: "Mangalam Acid and Chemicals",
  image: "https://mangalamchemicals.com/assets/maac-media/images/maac-logo-full.webp",
  url: "https://mangalamchemicals.com",
  telephone: "+91-96620-88122",
  email: "mangalamacidandchemicals@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi",
    addressLocality: "Valsad", addressRegion: "Gujarat", postalCode: "396195", addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 20.3714, longitude: 72.9091 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "09:00", closes: "19:00",
  },
  priceRange: "$$",
  areaServed: ["India", "Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className="antialiased">
        <PageLoader />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <ClientOnlyWidgets />
      </body>
    </html>
  );
}
