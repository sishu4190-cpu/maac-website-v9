import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | Mangalam Acid and Chemicals – Vapi, Gujarat',
  description: 'Mangalam Acid and Chemicals supplies industrial and agro chemicals to agriculture, fertilizer manufacturing, pharmaceuticals, water treatment, metallurgy, glass & ceramics, textile, oil & drilling, and chemical processing industries across India.',
  keywords: 'chemical supplier agriculture India, fertilizer chemical supplier Gujarat, industrial chemical Vapi, pharmaceutical chemical supplier, water treatment chemical Gujarat',
};

const industries = [
  {
    id: 'agriculture',
    name: 'Agriculture',
    headline: 'Micronutrient and Soil Health Chemicals',
    desc: 'Mangalam Acid and Chemicals supplies zinc sulphate, magnesium sulphate, ferrous sulphate, boric acid, copper sulphate and chelated micronutrient products for agricultural soil correction and foliar application. These products support improved crop yield, nutrient availability and soil health across diverse crop types.',
    products: ['Zinc Sulphate Hepta', 'Magnesium Sulphate', 'Ferrous Sulphate Heptahydrate', 'Boric Acid', 'Copper Sulphate Pentahydrate', 'Calcium Nitrate'],
    slug: 'agriculture',
    emoji: '🌾',
  },
  {
    id: 'fertilizer',
    name: 'Fertilizer Manufacturing',
    headline: 'Raw Materials for Fertilizer Producers',
    desc: 'We supply fertilizer-grade sulphates, chelated micronutrients, EDTA mixtures, amino acids and NPK compounds used in the formulation of straight fertilizers, compound fertilizers and micronutrient mixtures. Products are available in bulk suitable for fertilizer blending and manufacturing operations.',
    products: ['NPK 19-19-19', 'Zinc EDTA', 'Iron EDTA', 'Amino Acid 80%', 'Sulphate Mix (MH Grade)', 'Chelated EDTA Mixture'],
    slug: 'fertilizer-manufacturing',
    emoji: '🏭',
  },
  {
    id: 'industrial',
    name: 'Industrial Manufacturing',
    headline: 'Chemicals for Industrial Processes',
    desc: 'Sulfuric acid, hydrochloric acid, phosphoric acid, ferrous sulphate, copper sulphate and fluoride compounds are widely used across industrial manufacturing operations including electroplating, metal treatment, pigment production, battery manufacturing and general industrial processing.',
    products: ['Sulfuric Acid', 'Hydrochloric Acid', 'Phosphoric Acid', 'Copper Sulphate Crystal', 'Ferrous Sulphate', 'Ammonium Fluoride'],
    slug: 'industrial',
    emoji: '⚙️',
  },
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    headline: 'Pharma Grade and USP Grade Chemicals',
    desc: 'We supply pharmaceutical-grade and USP-grade chemicals including ferrous fumarate, ferric pyrophosphate, fumaric acid and zinc sulphate mono hydrate 36% USP grade. These are used in tablet formulations, IV solutions, nutraceuticals and API synthesis. Documentation including COA and MSDS is available on request.',
    products: ['Ferrous Fumarate Pure Grade', 'Ferric Pyrophosphate', 'Fumaric Acid', 'Zinc Sulphate Mono Hydrate 36% USP'],
    slug: 'pharmaceuticals',
    emoji: '💊',
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    headline: 'Chemicals for Water Purification',
    desc: 'Ferrous sulphate, sodium fluoride, sulphuric acid, hydrochloric acid and other compounds are used in water treatment and effluent treatment processes. Mangalam Acid and Chemicals supplies these products in bulk to water treatment plant operators, municipal bodies and industrial effluent treatment systems.',
    products: ['Ferrous Sulphate Heptahydrate', 'Sodium Fluoride', 'Sulfuric Acid', 'Hydrochloric Acid', 'Sodium Bisulphate'],
    slug: 'water-treatment',
    emoji: '💧',
  },
  {
    id: 'metallurgy',
    name: 'Metallurgy & Aluminium',
    headline: 'Fluoride Compounds for Metal Processing',
    desc: 'Our fluoride base products — including potassium fluoride, sodium cryolite, potassium cryolite, sodium fluoborate, ammonium bifluoride and potassium titanium fluoride — are widely used in aluminium smelting, metal surface treatment, soldering flux and electroplating operations.',
    products: ['Potassium Fluoride', 'Sodium Cryolite', 'Potassium Cryolite', 'Ammonium Bi Fluoride', 'Potassium Titanium Fluoride', 'Stannous Fluoride'],
    slug: 'metallurgy',
    emoji: '🔩',
  },
  {
    id: 'glass-ceramic',
    name: 'Glass & Ceramics',
    headline: 'Fluorides and Minerals for Glass and Ceramic Production',
    desc: 'Calcium fluoride, sodium fluoride, potassium silico fluoride, ammonium silico fluoride, barium fluoride and magnesium fluoride are essential raw materials in glass manufacturing, ceramic glazing, and enamel production processes. We supply these in bulk to glass and ceramic manufacturers across India.',
    products: ['Calcium Fluoride', 'Sodium Fluoride', 'Potassium Silico Fluoride', 'Ammonium Silico Fluoride', 'Barium Fluoride', 'Magnesium Fluoride'],
    slug: 'glass-ceramics',
    emoji: '🪟',
  },
  {
    id: 'chemical-processing',
    name: 'Chemical Processing',
    headline: 'Industrial Acids and Specialty Chemicals',
    desc: 'Chemical processors use a wide range of our acids — phosphoric acid, sulfuric acid, nitric acid, acetic acid, oxalic acid, formic acid and citric acid — as raw materials for synthesis, pH adjustment, neutralisation, and formulation processes. We supply in bulk with consistent specification.',
    products: ['Phosphoric Acid', 'Sulfuric Acid', 'Nitric Acid', 'Acetic Acid', 'Oxalic Acid', 'Citric Acid'],
    slug: 'chemical-processing',
    emoji: '⚗️',
  },
  {
    id: 'dyes-pigments',
    name: 'Dyes & Pigments',
    headline: 'Chemicals for Colour and Pigment Formulation',
    desc: 'Cupric oxide, copper sulphate, ferrous sulphate and certain fluoride compounds are used in the manufacture of dyes, pigments, and colourants. Mangalam Acid and Chemicals supplies these to dye and pigment manufacturers with consistent quality and bulk availability.',
    products: ['Cupric Oxide', 'Copper Sulphate Crystal', 'Ferrous Sulphate', 'Sodium Fluoride', 'Iron EDTA'],
    slug: 'dyes-pigments',
    emoji: '🎨',
  },
  {
    id: 'oil-drilling',
    name: 'Oil & Drilling',
    headline: 'Specialty Chemicals for Oil Field Operations',
    desc: 'Mangalam Acid and Chemicals supplies specialty chemicals used in oil field drilling operations, well stimulation, and related oil and gas field applications. Contact us directly with your product specification for availability and bulk pricing.',
    products: ['Contact us for specific products'],
    slug: 'oil-drilling',
    emoji: '🛢️',
  },
  {
    id: 'textile',
    name: 'Textile',
    headline: 'Textile Processing Chemicals',
    desc: 'Textile manufacturing and processing operations use acids, sulphates and specialty chemicals for dyeing, finishing, bleaching and effluent treatment processes. We supply chemicals to textile manufacturers and dyeing units in Gujarat and across India.',
    products: ['Sulfuric Acid', 'Acetic Acid', 'Sodium Acetate', 'Copper Sulphate', 'Ammonium Fluoride'],
    slug: 'textile',
    emoji: '🧵',
  },
  {
    id: 'detergents',
    name: 'Detergents & Cleaning',
    headline: 'Raw Materials for Cleaning Products',
    desc: 'Sodium sulphate, sodium bisulphate, sodium meta bisulphate, di-sodium phosphate and phosphoric acid are used in the formulation of industrial detergents, cleaning compounds, and descaling agents. We supply these chemicals in bulk to cleaning product manufacturers.',
    products: ['Sodium Bisulphate', 'Sodium Meta Bisulphate', 'Di-Sodium Phosphate', 'Phosphoric Acid', 'Citric Acid'],
    slug: 'detergents',
    emoji: '🧼',
  },
];

export default function IndustriesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industries Served by Mangalam Acid and Chemicals',
    description: 'Chemical supplier to agriculture, pharma, industrial, water treatment, metallurgy, glass, textile and oil industries in India',
    numberOfItems: industries.length,
    itemListElement: industries.map((ind, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ind.name,
      description: ind.headline,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)" }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Industries We Serve</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "white" }}>Chemical Supply Across Diverse Industries</h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>
              Mangalam Acid and Chemicals supplies industrial, agro and specialty chemicals to 12+ industries including agriculture, fertilizer manufacturing, pharmaceuticals, water treatment, metallurgy, glass, textile and more.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Quick Nav */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-20 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {industries.map(ind => (
              <a key={ind.id} href={`#${ind.id}`}
                className="industry-pill text-xs font-medium whitespace-nowrap" style={{ cursor: "pointer" }}>
                {ind.emoji} {ind.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {industries.map((ind, index) => (
              <div key={ind.id} id={ind.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-16 border-b border-gray-100 last:border-0 last:pb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{ind.emoji}</span>
                    <p className="section-label">{ind.name}</p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{ind.headline}</h2>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">{ind.desc}</p>
                  <Link href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-freshGreen hover:text-deepGreen transition-colors">
                    Request bulk enquiry for this industry <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Relevant Products</h3>
                  <ul className="space-y-2">
                    {ind.products.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-3.5 h-3.5 text-freshGreen flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-5 border-t border-gray-200 flex flex-wrap gap-3">
                    <Link href="/products"
                      className="text-xs font-semibold text-deepGreen hover:text-freshGreen transition-colors flex items-center gap-1">
                      View All Products <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link href="/contact"
                      className="text-xs font-semibold text-orange hover:underline flex items-center gap-1">
                      Send Enquiry <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Info */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Pan India Supply', desc: 'We supply bulk chemicals across India. Delivery to Gujarat, Maharashtra, Rajasthan, Punjab, Haryana, Karnataka, Tamil Nadu, and other states.' },
              { title: 'Export Ready', desc: 'We export to international markets. Contact us with product specification and destination for export pricing and documentation.' },
              { title: 'Bulk Packaging', desc: 'Available in 25kg bags, 50kg bags, jumbo bags (500kg–1MT), IBC, drums, and tanker loads depending on product and volume.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 card-hover reveal">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)" }} className="py-14 text-white molecule-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "white" }}>Looking for Chemicals for Your Industry?</h2>
          <p className="mb-8 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.88)" }}>
            Tell us your product, grade, quantity and delivery location. Mangalam Acid and Chemicals serves industrial and agro chemical buyers across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Send Bulk Enquiry</Link>
            <Link href="/products" className="btn-secondary" style={{ borderColor: "white", color: "white" }}>Browse All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
