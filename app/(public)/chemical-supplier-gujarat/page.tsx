import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chemical Supplier in Gujarat | Mangalam Acid and Chemicals – Vapi',
  description: 'Mangalam Acid and Chemicals is a Gujarat-based supplier of industrial and agro chemicals. Bulk supply of sulphates, fluorides, EDTA, NPK fertilizers, acids and pharmaceutical chemicals from Vapi, Gujarat to buyers across India.',
  keywords: 'chemical supplier Gujarat, industrial chemical Gujarat, bulk chemical Gujarat, fertilizer chemical Gujarat, sulphate supplier Gujarat, EDTA supplier Gujarat, fluoride chemical supplier Gujarat',
};

export default function GujaratChemicalSupplierPage() {
  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Vapi', 'Bharuch', 'Ankleshwar',
    'Morbi', 'Junagadh', 'Gandhinagar', 'Mehsana', 'Kutch / Bhuj'
  ];

  const gujaratSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mangalam Acid and Chemicals',
    description: 'Gujarat-based industrial and agro chemical supplier. Bulk supply of sulphates, fluorides, EDTA chelated products, acids, pharmaceutical chemicals and NPK fertilizers across Gujarat.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA)',
      addressLocality: 'Pardi',
      addressRegion: 'Gujarat',
      postalCode: '396195',
      addressCountry: 'IN',
    },
    telephone: ['+91-96620-88122', '+91-90818-32790', '+91-95379-70043'],
    email: 'info@mangalamchemicals.com',
    url: 'https://mangalamchemicals.com/chemical-supplier-gujarat',
    areaServed: gujaratCities.concat('Gujarat', 'India'),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gujaratSchema) }} />

      {/* Hero */}
      <section className="bg-deepGreen text-white py-16 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-orange" />
            <span className="text-orange font-semibold text-sm">Gujarat, India</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">Chemical Supplier in Gujarat</h1>
          <p className="text-lg text-green-200 max-w-xl mb-8">
            Mangalam Acid and Chemicals is based in Vapi, Gujarat and supplies industrial and agro chemicals to buyers across Gujarat and India. Bulk supply of sulphates, fluorides, EDTA chelated products, acids, pharmaceutical chemicals and NPK fertilizers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Send Bulk Enquiry</Link>
            <Link href="/products" className="btn-secondary">Browse Products</Link>
          </div>
        </div>
      </section>

      {/* Gujarat Context */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="section-label mb-2">Gujarat Chemical Industry</p>
              <h2 className="section-title">Gujarat's Role in India's Chemical Sector</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Gujarat accounts for a significant portion of India's chemical production and trade. The state hosts major chemical industrial clusters including Vapi, Bharuch, Ankleshwar, Dahej, Surat, Vadodara and Ahmedabad, with thousands of chemical manufacturers, formulators and traders operating within the state.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Mangalam Acid and Chemicals operates from Vapi — one of India's largest chemical industrial areas — and is well-positioned to supply buyers across Gujarat and other Indian states with consistent quality, reliable supply, and proper documentation.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our location in South Gujarat provides easy freight connectivity to Ahmedabad, Surat, Vadodara, Bharuch, Rajkot, and other Gujarati cities, as well as to Maharashtra, Rajasthan, Madhya Pradesh and beyond.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">We Supply to These Gujarat Cities</h3>
              <div className="grid grid-cols-2 gap-2">
                {gujaratCities.map(city => (
                  <div key={city} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                    <MapPin className="w-3 h-3 text-freshGreen flex-shrink-0" />
                    <span className="text-sm text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Supply available to other Gujarat cities and all-India destinations. Contact us for freight details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products for Gujarat buyers */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Chemicals Available for Gujarat Buyers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { cat: 'Sulphates & Fertilizer Chemicals', products: 'Zinc Sulphate, Magnesium Sulphate, Ferrous Sulphate, Copper Sulphate, Boric Acid, Calcium Nitrate and more', slug: 'sulphates-fertilizers' },
              { cat: 'EDTA & Chelated Products', products: 'Iron EDTA, Zinc EDTA, Manganese EDTA, Fe EDDHA, Amino Acid 80%, Chelated EDTA Mixture and more', slug: 'edta-chelated-products' },
              { cat: 'Fluoride Base Products', products: 'Sodium Fluoride, Potassium Fluoride, Ammonium Fluoride, Sodium Cryolite, Calcium Fluoride and more', slug: 'fluoride-base-products' },
              { cat: 'Acids', products: 'Sulfuric Acid, Phosphoric Acid, Hydrochloric Acid, Nitric Acid, Acetic Acid, Formic Acid and more', slug: 'acids' },
              { cat: 'Pharmaceutical Products', products: 'Ferrous Fumarate, Ferric Pyrophosphate, Fumaric Acid, Zinc Sulphate USP Grade', slug: 'pharmaceutical-products' },
              { cat: 'NPK Fertilizers', products: 'NPK 19-19-19, MAP, MKP, Potassium Nitrate, Potassium Sulphate, Potassium Chloride', slug: 'npk-fertilizers' },
            ].map(item => (
              <Link key={item.cat} href={`/products/${item.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-deepGreen transition-colors">{item.cat}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.products}</p>
                <span className="text-xs font-semibold text-freshGreen">View Products →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Why Gujarat Buyers Choose Mangalam Acid and Chemicals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'ISO 9001:2015 Certified', desc: 'Quality management certification ensures consistent product quality across all batches.' },
              { title: 'Located in Vapi Chemical Hub', desc: 'Direct access to chemical manufacturers in one of India\'s largest chemical industrial areas.' },
              { title: 'COA Available on Request', desc: 'Certificate of Analysis provided per batch for all products. MSDS available for hazardous goods.' },
              { title: 'Bulk Supply Capability', desc: 'Packaging in 25kg, 50kg, jumbo bags and bulk loads. Pan India freight available.' },
              { title: 'Multiple Grades Available', desc: 'Technical, Agricultural, Industrial and Pharmaceutical grades — with documentation to match.' },
              { title: 'Verified Business Credentials', desc: 'MSME UDYAM registered, D&B DUNS verified, IndiaMart TrustSEAL verified supplier.' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-freshGreen mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-deepGreen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for a Chemical Supplier in Gujarat?</h2>
          <p className="text-green-200 mb-6 text-sm">Send your requirement with product, grade, quantity and delivery location. Our team responds within one business day.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Send Enquiry</Link>
            <a href="tel:+919662088122" className="btn-secondary">Call +91 96620 88122</a>
          </div>
        </div>
      </section>
    </>
  );
}
