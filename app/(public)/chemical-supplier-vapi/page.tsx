import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, ChevronRight } from 'lucide-react';
import { categories } from '../../data/products';

export const metadata: Metadata = {
  title: 'Industrial Chemical Supplier in Vapi, Gujarat | Mangalam Acid and Chemicals',
  description: 'Mangalam Acid and Chemicals is an industrial and agro chemical supplier based in Vapi, Gujarat. Supplying sulphates, fluorides, EDTA, acids, NPK fertilizers and pharmaceutical chemicals from GIDC Vapi to buyers across India.',
  keywords: 'chemical supplier Vapi, industrial chemical Vapi Gujarat, bulk chemical supplier Vapi, GIDC Vapi chemical, sulphate supplier Vapi, fluoride chemical Vapi, EDTA supplier Gujarat',
};

export default function VapiChemicalSupplierPage() {
  const vapiSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mangalam Acid and Chemicals',
    description: 'Industrial and agro chemical supplier in Vapi, Gujarat. Supplying sulphates, fluorides, EDTA chelated products, acids, pharmaceutical chemicals and NPK fertilizers.',
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
    url: 'https://mangalamchemicals.com',
    areaServed: ['Vapi', 'Gujarat', 'India'],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vapiSchema) }} />

      {/* Hero */}
      <section className="bg-deepGreen text-white py-16 molecule-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-orange" />
            <span className="text-orange font-semibold text-sm">Vapi, Gujarat, India</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">Industrial Chemical Supplier in Vapi, Gujarat</h1>
          <p className="text-lg text-green-200 max-w-xl mb-8">
            Mangalam Acid and Chemicals is based in Vapi — one of India's largest chemical industrial clusters — supplying sulphates, fluorides, EDTA products, acids, pharmaceutical chemicals and NPK fertilizers to industrial and agro buyers across India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Send Bulk Enquiry</Link>
            <Link href="/products" className="btn-secondary">Browse Products</Link>
          </div>
        </div>
      </section>

      {/* Why Vapi */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-2">Location Advantage</p>
              <h2 className="section-title">Why Sourcing from Vapi Makes Sense</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Vapi is home to one of India's largest chemical industrial areas — the GIDC Vapi Industrial Estate — with hundreds of chemical manufacturers, processors and traders operating within the cluster. The location offers significant procurement advantages for industrial buyers across India.
              </p>
              <div className="space-y-3">
                {[
                  'Direct access to chemical manufacturers within the GIDC industrial zone',
                  'Excellent road and rail connectivity to Mumbai, Surat, Ahmedabad and other industrial belts',
                  'Proximity to Hazira Port and Nhava Sheva for export shipments',
                  'Large industrial chemical ecosystem — easier to source specialty and bulk chemicals',
                  'Pan India truck and railway freight connectivity for delivery across India',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-freshGreen mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-gray-900 mb-5">Our Vapi Office</h3>
              <address className="not-italic text-sm text-gray-700 leading-relaxed mb-5">
                PT 209, SH-305, 3rd Floor,<br />
                Girnar Khushboo Plaza, Vapi INA (INA),<br />
                Pardi, Valsad – 396195,<br />
                Gujarat, India
              </address>
              <div className="space-y-2">
                {['+91 96620 88122', '+91 90818 32790', '+91 95379 70043'].map(ph => (
                  <a key={ph} href={`tel:${ph.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-freshGreen hover:underline font-medium">
                    <Phone className="w-3.5 h-3.5" /> {ph}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">Business Hours: Mon–Sat, 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products from Vapi */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Chemical Categories Available from Vapi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/products/${cat.slug}`}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-deepGreen transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                <span className="text-xs font-semibold text-freshGreen">View Products →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">Industries Supplied from Vapi</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Agriculture', 'Fertilizer Manufacturing', 'Water Treatment', 'Pharmaceuticals',
              'Industrial Manufacturing', 'Metallurgy', 'Glass & Ceramics', 'Textile',
              'Dyes & Pigments', 'Chemical Processing', 'Oil & Drilling', 'Detergents & Cleaning',
            ].map(ind => (
              <span key={ind} className="badge">{ind}</span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6 max-w-2xl">
            Mangalam Acid and Chemicals supplies chemicals to industries across Gujarat and India from our Vapi base. Delivery to Ahmedabad, Surat, Rajkot, Vadodara, Mumbai, Pune, Delhi, Hyderabad, Bangalore and other industrial centres.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-deepGreen text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for a Reliable Chemical Supplier in Vapi?</h2>
          <p className="text-green-200 mb-6 text-sm">Send your product requirement, grade, quantity and delivery location. We respond within one business day.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Send Enquiry</Link>
            <a href="tel:+919662088122" className="btn-secondary">Call +91 96620 88122</a>
          </div>
        </div>
      </section>
    </>
  );
}
