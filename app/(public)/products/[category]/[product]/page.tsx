import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getProductById, getAllProducts } from "@/app/data/products";
import { getCoaUrl } from "@/app/data/coaMapping";
import FAQAccordion from "@/app/components/FAQAccordion";
import { CheckCircle, Package, FileText, ArrowRight, FlaskConical, Phone, Download } from "lucide-react";

async function getProductOverride(productId: string) {
  try {
    const { readData } = await import("@/app/lib/dataStore");
    const data = await readData();
    return (data.productOverrides || {})[productId] || null;
  } catch {}
  return null;
}

export async function generateStaticParams() {
  return categories.flatMap((c) =>
    c.products.map((p) => ({ category: c.slug, product: p.id }))
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }): Promise<Metadata> {
  const { category, product: productId } = await params;
  const cat = getCategoryBySlug(category);
  const product = cat?.products.find((p) => p.id === productId);
  if (!cat || !product) return { title: "Product Not Found" };
  const override = await getProductOverride(productId);
  const name = override?.name || product.name;
  const desc = override?.description || product.description;
  return {
    title: `${name} | ${cat.name} Supplier, Vapi, Gujarat`,
    description: `${desc.slice(0, 155)}`,
    alternates: { canonical: `https://mangalamchemicals.com/products/${cat.slug}/${product.id}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productId } = await params;
  const cat = getCategoryBySlug(category);
  const baseProduct = cat?.products.find((p) => p.id === productId);
  if (!cat || !baseProduct) notFound();
  const override = await getProductOverride(productId);
  const product = {
    ...baseProduct,
    name: override?.name || baseProduct.name,
    description: override?.description || baseProduct.description,
    cas: override?.cas || baseProduct.cas,
    hsn: override?.hsn || baseProduct.hsn,
    specifications: override?.specifications || baseProduct.specifications,
    applications: override?.applications || baseProduct.applications,
    packaging: override?.packaging || baseProduct.packaging,
  };

  const relatedProducts = product.relatedProducts
    ?.map((id) => getAllProducts().find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4) || [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: cat.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Mangalam Acid and Chemicals",
        url: "https://mangalamchemicals.com",
      },
    },
    ...(product.cas ? { identifier: product.cas } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mangalamchemicals.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://mangalamchemicals.com/products" },
      { "@type": "ListItem", position: 3, name: cat.name, item: `https://mangalamchemicals.com/products/${cat.slug}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://mangalamchemicals.com/products/${cat.slug}/${product.id}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `What is ${product.name} used for?`, acceptedAnswer: { "@type": "Answer", text: product.applications.join(", ") + "." } },
      { "@type": "Question", name: "Is COA available?", acceptedAnswer: { "@type": "Answer", text: "Yes, Certificate of Analysis (COA) is available on request for every batch." } },
      { "@type": "Question", name: "Do you supply in bulk?", acceptedAnswer: { "@type": "Answer", text: "Yes, Mangalam Acid and Chemicals supplies in bulk. Available packaging includes 25 kg and 50 kg bags, with jumbo bags for applicable products." } },
      { "@type": "Question", name: "What packaging options are available?", acceptedAnswer: { "@type": "Answer", text: product.packaging.join(", ") + "." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ backgroundColor: "#0f2d1a" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-xs text-gray-400 mb-4 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white">Products</Link>
            <span>/</span>
            <Link href={`/products/${cat.slug}`} className="hover:text-white">{cat.name}</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: "#1a4d2e" }}>
              <FlaskConical size={28} style={{ color: "#81c784" }} />
            </div>
            <div>
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "rgba(244,162,40,0.2)", color: "#f9c06a" }}>{cat.name}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">{product.name}</h1>
              {product.cas && <p className="text-gray-400 text-sm mt-1">CAS Number: {product.cas}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "#1a4d2e" }}>Product Overview</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#1a4d2e" }}>Specifications</h2>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val], i) => (
                          <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-4 py-3 font-semibold text-gray-700 w-1/2">{key}</td>
                            <td className="px-4 py-3 text-gray-600">{String(val)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Fields marked [Admin-editable] are maintained in the CMS and confirmed per batch. Contact us for specific grade requirements.</p>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "#1a4d2e" }}>Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.applications.map((app: string) => (
                    <div key={app} className="flex items-start gap-2">
                      <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: "#4caf50" }} />
                      <span className="text-sm text-gray-700">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "#1a4d2e" }}>Frequently Asked Questions</h2>
                <FAQAccordion faqs={[
                  { q: `What is ${product.name} used for?`, a: `${product.name} is used for: ${product.applications.join("; ")}.` },
                  { q: "Is COA available?", a: "Yes, Certificate of Analysis (COA) is available on request for every batch supplied." },
                  { q: "Do you supply in bulk?", a: "Yes, we supply in bulk. Contact us with your quantity and delivery requirements for a quotation." },
                  { q: "What packaging options are available?", a: `Available packaging: ${product.packaging.join(", ")}.` },
                  { q: "Can I request a quotation by grade/specification?", a: "Yes. Please share your required grade, purity, CAS number or specification, and we will provide a quotation accordingly." },
                ]} />
              </div>
            </div>

            <div className="space-y-5">
              <div className="p-5 rounded-xl border" style={{ backgroundColor: "#f0f9f0", borderColor: "#bde0bd" }}>
                <h3 className="font-bold text-base mb-4" style={{ color: "#1a4d2e" }}>Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div><span className="font-semibold text-gray-700">Category:</span> <span className="text-gray-600">{cat.name}</span></div>
                  {product.cas && <div><span className="font-semibold text-gray-700">CAS No.:</span> <span className="text-gray-600 font-mono">{product.cas}</span></div>}
                  {product.hsn && <div><span className="font-semibold text-gray-700">HSN Code:</span> <span className="text-gray-600 font-mono">{product.hsn}</span></div>}
                  <div><span className="font-semibold text-gray-700">Supply Location:</span> <span className="text-gray-600">Vapi, Gujarat, India</span></div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} style={{ color: "#1a4d2e" }} />
                  <h3 className="font-bold text-sm" style={{ color: "#1a4d2e" }}>Packaging Options</h3>
                </div>
                <ul className="space-y-1.5">
                  {product.packaging.map((pkg: string) => (
                    <li key={pkg} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#4caf50" }}></span>
                      {pkg}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} style={{ color: "#1a4d2e" }} />
                  <h3 className="font-bold text-sm" style={{ color: "#1a4d2e" }}>Documents</h3>
                </div>
                {/* COA Download or Request button */}
                {(() => {
                  const coaUrl = getCoaUrl(product.id);
                  return coaUrl ? (
                    <a
                      href={coaUrl}
                      download
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold text-sm mb-3 transition-all"
                      style={{ background: "#1a4d2e", color: "white", textDecoration: "none" }}
                    >
                      <Download size={14} /> Download COA
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/919662088122?text=Hello%2C%20I%20need%20the%20COA%20for%20${encodeURIComponent(product.name)}.%20Please%20share%20it.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold text-sm mb-3 border transition-all"
                      style={{ borderColor: "#1a4d2e", color: "#1a4d2e", textDecoration: "none" }}
                    >
                      <FileText size={14} /> Request COA
                    </a>
                  );
                })()}
                <ul className="space-y-1.5">
                  {product.documentsAvailable.filter(d => d !== "COA").map((doc) => (
                    <li key={doc} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle size={12} style={{ color: "#4caf50" }} />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn-primary block text-center">Request Bulk Quotation</Link>
              <a href={`https://wa.me/919662088122?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20share%20pricing%20and%20availability.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded font-semibold text-white text-sm" style={{ backgroundColor: "#25D366" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Enquiry
              </a>
              <a href="tel:+919662088122" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded font-semibold text-sm border" style={{ color: "#1a4d2e", borderColor: "#bde0bd" }}>
                <Phone size={15} /> +91 96620 88122
              </a>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-5" style={{ color: "#1a4d2e" }}>Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => {
                if (!rp) return null;
                const rpCat = categories.find(c => c.id === rp.categoryId);
                return (
                  <Link key={rp.id} href={`/products/${rpCat?.slug || category}/${rp.id}`} className="product-card card-hover group block">
                    <FlaskConical size={16} className="mb-2" style={{ color: "#4caf50" }} />
                    <div className="font-semibold text-sm mb-1" style={{ color: "#1a2e1c" }}>{rp.name}</div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "#1a4d2e" }}>
                      View <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
