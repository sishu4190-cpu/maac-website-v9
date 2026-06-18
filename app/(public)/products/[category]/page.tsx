import Link from "next/link";
import FAQAccordion from "../../../components/FAQAccordion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/app/data/products";
import { ArrowRight, CheckCircle, FlaskConical, Package, FileText } from "lucide-react";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} | Chemical Supplier, Vapi, Gujarat`,
    description: `${cat.description.slice(0, 155)}`,
    alternates: { canonical: `https://mangalamchemicals.com/products/${cat.slug}` },
  };
}

const faqsByCategory: Record<string, Array<{ q: string; a: string }>> = {
  "sulphates-fertilizers": [
    { q: "What grades of ferrous sulphate are available?", a: "Mangalam Acid and Chemicals supplies Ferrous Sulphate Heptahydrate, Semi Dry, and Dried grades. Contact us with your specification for confirmation." },
    { q: "Do you supply zinc sulphate in 21% and 33% grades?", a: "Yes, both Zinc Sulphate Heptahydrate 21% and Zinc Sulphate Monohydrate 33% are available in bulk packaging." },
    { q: "Is COA available for sulphate products?", a: "Yes, Certificate of Analysis (COA) is available for all sulphate and fertilizer products on request." },
    { q: "What packaging sizes are available?", a: "Standard packaging is 25 kg and 50 kg bags. Jumbo bags (500–1000 kg) are also available for bulk orders." },
  ],
  "edta-chelated-products": [
    { q: "What is the difference between EDTA chelates and Fe EDDHA?", a: "EDTA chelates are effective in neutral to slightly acidic pH soils. Fe EDDHA is stable over a wider pH range and is more effective in alkaline and calcareous soils." },
    { q: "Are EDTA chelates suitable for drip irrigation?", a: "Yes, all EDTA chelated products supplied by Mangalam Acid and Chemicals are water-soluble and suitable for drip fertigation and foliar spray." },
    { q: "Is COA available for EDTA products?", a: "Yes, COA is available on request for all EDTA and chelated products." },
  ],
  "fluoride-base-products": [
    { q: "What industries use fluoride base products?", a: "Fluoride compounds are used in metallurgy, aluminium processing, glass and ceramic manufacturing, chemical processing, and industrial surface treatment." },
    { q: "Do you supply both pure and technical grades?", a: "Yes, we supply both pure (higher purity) and technical (industrial) grades for ammonium bifluoride, sodium fluoride, and sodium cryolite." },
    { q: "Is COA available for fluoride products?", a: "Yes, COA is available on request for all fluoride products." },
  ],
  "acids": [
    { q: "What concentrations of phosphoric acid do you supply?", a: "Phosphoric acid is available in 75%, 85%, and technical grade concentrations." },
    { q: "What concentrations of sulphuric acid are available?", a: "Sulphuric acid is available in 70% and 98% concentrations, as well as slurry sulphuric acid for fertilizer manufacturing." },
    { q: "Do you supply acids in bulk tankers?", a: "Yes, liquid acids like sulphuric acid, phosphoric acid, hydrochloric acid, and nitric acid can be supplied in bulk via tanker. Contact us for requirements." },
    { q: "Is MSDS available for acid products?", a: "Yes, Material Safety Data Sheet (MSDS) is available for all acid products on request." },
  ],
  "pharmaceutical-products": [
    { q: "What grade is your zinc sulphate monohydrate?", a: "Zinc Sulphate Monohydrate is available in USP Grade (36%) for pharmaceutical applications." },
    { q: "Do you supply ferrous fumarate in pure grade?", a: "Yes, Ferrous Fumarate is supplied in Pure Grade suitable for pharmaceutical iron formulations." },
    { q: "Are USP specifications available?", a: "Yes, USP specification documentation is available for pharmaceutical grade products on request." },
  ],
  "npk-fertilizers": [
    { q: "What NPK grades are available?", a: "Available grades include 19-19-19, 13-40-13, 12-61-00 (MAP), 00-52-34 (MKP), 13-00-45 (potassium nitrate), 00-00-60, 00-00-50, and 00-00-23." },
    { q: "Are these fertilizers water-soluble?", a: "Yes, all NPK fertilizers supplied by Mangalam Acid and Chemicals are fully water-soluble and suitable for fertigation and foliar use." },
    { q: "Can NPK fertilizers be used in drip irrigation?", a: "Yes, water-soluble NPK fertilizers are specifically formulated for use in drip and sprinkler fertigation systems." },
    { q: "Is bulk packaging available?", a: "Yes, NPK fertilizers are available in 25 kg and 50 kg bags, and jumbo bags for larger orders." },
  ],
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const faqs = faqsByCategory[cat.slug] || [
    { q: "Is COA available for these products?", a: "Yes, COA is available for all products on request." },
    { q: "What packaging options are available?", a: "Standard packaging includes 25 kg and 50 kg bags. Custom/bulk packaging available on request." },
    { q: "Do you supply in bulk?", a: "Yes, bulk supply is available. Contact us with your quantity and delivery location." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section style={{ backgroundColor: "#0f2d1a" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{cat.name}</h1>
              <p className="text-gray-300 mt-1">{cat.tagline} · {cat.products.length} products available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="section-label">Category Overview</div>
              <h2 className="section-title text-2xl">{cat.name}</h2>
              <p className="section-subtitle">{cat.description}</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.applications.map((app) => (
                  <div key={app} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#4caf50" }} />
                    <span className="text-sm text-gray-700">{app}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#f0f9f0", border: "1px solid #bde0bd" }}>
                <h3 className="font-bold text-base mb-3" style={{ color: "#1a4d2e" }}>Industries Served</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.industries.map((ind) => (
                    <span key={ind} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>{ind}</span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="text-orange-600" />
                  <h3 className="font-bold text-sm text-orange-800">Packaging Available</h3>
                </div>
                <p className="text-xs text-orange-700">25 kg bag · 50 kg bag · Jumbo bag (for applicable products) · As per requirement</p>
              </div>
              <div className="p-5 rounded-xl" style={{ backgroundColor: "#f0f9f0", border: "1px solid #bde0bd" }}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} style={{ color: "#1a4d2e" }} />
                  <h3 className="font-bold text-sm" style={{ color: "#1a4d2e" }}>Documents Available</h3>
                </div>
                <p className="text-xs text-gray-600">COA · Product Catalogue · MSDS on request · Specification sheets</p>
              </div>
              <Link href="/contact#enquiry" className="btn-primary block text-center">Send Bulk Enquiry</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a4d2e" }}>Products in this Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cat.products.map((product) => (
              <Link key={product.id} href={`/products/${cat.slug}/${product.id}`} className="product-card card-hover group block">
                <div className="flex items-start gap-3">
                  <FlaskConical size={18} className="shrink-0 mt-0.5" style={{ color: "#4caf50" }} />
                  <div>
                    <div className="font-semibold text-sm mb-1 leading-tight" style={{ color: "#1a2e1c" }}>{product.name}</div>
                    {product.cas && <div className="text-xs text-gray-400">CAS: {product.cas}</div>}
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold" style={{ color: "#1a4d2e" }}>
                      Details <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#1a4d2e" }}>Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section style={{ backgroundColor: "#1a4d2e" }} className="py-10 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Request Bulk Quotation for {cat.name}</h2>
          <p className="text-gray-300 mb-5">Share your product name, grade, quantity, and delivery location. We will respond with pricing and documentation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary">Send Enquiry</Link>
            <Link href="/downloads" className="btn-secondary">Download Catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
