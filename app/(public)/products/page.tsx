import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/app/data/products";
import { ArrowRight, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Industrial Chemicals, Sulphates, EDTA, Fluorides, Acids",
  description: "Browse all chemical products from Mangalam Acid and Chemicals — sulphates, EDTA chelates, fluoride compounds, acids, NPK fertilizers, pharmaceutical chemicals. Bulk supply from Vapi, Gujarat.",
  alternates: { canonical: "https://mangalamchemicals.com/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section style={{ backgroundColor: "#0f2d1a" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">All Products</h1>
          <p className="text-gray-300 mt-3 text-lg">Over 80 industrial and agro chemicals across 6 categories. Bulk supply from Vapi, Gujarat.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-14">
            {categories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold" style={{ color: "#1a4d2e" }}>{cat.name}</h2>
                      <p className="text-sm text-gray-500">{cat.tagline} · {cat.products.length} products</p>
                    </div>
                  </div>
                  <Link href={`/products/${cat.slug}`} className="hidden md:flex items-center gap-1 text-sm font-semibold" style={{ color: "#1a4d2e" }}>
                    View Category <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.products.map((product) => (
                    <Link key={product.id} href={`/products/${cat.slug}/${product.id}`} className="product-card card-hover group flex items-start gap-2 p-3">
                      <FlaskConical size={15} className="mt-0.5 shrink-0" style={{ color: "#4caf50" }} />
                      <div>
                        <div className="text-sm font-semibold leading-tight" style={{ color: "#1a2e1c" }}>{product.name}</div>
                        {product.cas && <div className="text-xs text-gray-400 mt-0.5">CAS: {product.cas}</div>}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href={`/products/${cat.slug}`} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#1a4d2e" }}>
                    View {cat.name} details <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="border-t border-gray-100 mt-8"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#1a4d2e" }} className="py-12 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Looking for a Specific Chemical?</h2>
          <p className="text-gray-300 mb-6">If you cannot find your product in the list, contact us. We source and supply a wide range of specialty and industrial chemicals.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#enquiry" className="btn-primary">Send Product Enquiry</Link>
            <Link href="/downloads" className="btn-secondary">Download Full Catalogue</Link>
          </div>
        </div>
      </section>
    </>
  );
}
