import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Mangalam Acid and Chemicals',
  description: 'Terms and Conditions for use of the Mangalam Acid and Chemicals website and chemical supply enquiry services.',
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Last updated: June 2025</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 leading-relaxed">
            Please read these Terms and Conditions carefully before using the Mangalam Acid and Chemicals website located at <strong>mangalamchemicals.com</strong>. By accessing or using this website, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-10 text-sm text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Website Use</h2>
            <p className="leading-relaxed mb-2">This website is operated by Mangalam Acid and Chemicals for the purpose of providing information about our chemical products and services, and for facilitating B2B enquiries from industrial and agro chemical buyers.</p>
            <p className="leading-relaxed">You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Product Information Accuracy</h2>
            <p className="leading-relaxed mb-2">Product information on this website — including product names, descriptions, applications, and specifications — is provided for general informational purposes. While we make reasonable efforts to keep information accurate and current:</p>
            <ul className="space-y-1.5 ml-4">
              {[
                'Specific product specifications, purity levels, CAS numbers, and technical parameters should be confirmed via formal quotation and COA before any purchase decision',
                'Product availability and pricing are subject to change without notice',
                'We do not warrant that product information on the website is error-free or complete',
                'Buyers are responsible for verifying that the chemical product meets their specific application requirements',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5 flex-shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Enquiry and Quotation</h2>
            <p className="leading-relaxed mb-2">Submission of an enquiry form on this website does not constitute a binding purchase order or contract. A business relationship is established only when:</p>
            <ul className="space-y-1.5 ml-4">
              {[
                'A formal written quotation has been issued by Mangalam Acid and Chemicals',
                'A purchase order has been confirmed by both parties',
                'Payment terms have been agreed in writing',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5 flex-shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p className="leading-relaxed">All content on this website including text, product descriptions, product lists, logo, design, images, and other materials are the property of Mangalam Acid and Chemicals or licensed to us. You may not reproduce, distribute, modify, or republish any content from this website without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Chemical Safety and Liability</h2>
            <p className="leading-relaxed mb-2">Industrial and specialty chemicals carry inherent hazards. By using our products, buyers acknowledge:</p>
            <ul className="space-y-1.5 ml-4">
              {[
                'It is the buyer\'s responsibility to obtain and read the MSDS/SDS for any chemical product before handling, storage, or use',
                'Chemicals must be used only for their stated purpose and in accordance with applicable regulations',
                'Mangalam Acid and Chemicals is not liable for misuse, improper handling, or inappropriate application of chemical products',
                'Buyers in regulated industries (pharma, food, agriculture) are responsible for ensuring products meet applicable regulatory standards for their end use',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5 flex-shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="leading-relaxed">To the maximum extent permitted by law, Mangalam Acid and Chemicals shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or the information provided herein. Our total liability for any claim arising out of or in connection with this website shall not exceed the value of any purchase order placed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Links to External Sites</h2>
            <p className="leading-relaxed">This website may contain links to external websites (including IndiaMart, Google Maps, social media platforms). These links are provided for convenience only. We do not endorse or accept responsibility for the content of external websites.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p className="leading-relaxed">These Terms and Conditions are governed by the laws of India. Any disputes arising from the use of this website or products purchased from Mangalam Acid and Chemicals shall be subject to the jurisdiction of the courts in Valsad, Gujarat, India.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to These Terms</h2>
            <p className="leading-relaxed">We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting to this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="font-semibold text-gray-900">Mangalam Acid and Chemicals</p>
              <p className="mt-1">PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India</p>
              <p className="mt-1">Email: <a href="mailto:mangalamacidandchemicals@gmail.com" className="text-freshGreen hover:underline">mangalamacidandchemicals@gmail.com</a></p>
              <p>Phone: <a href="tel:+919662088122" className="text-freshGreen hover:underline">+91 96620 88122</a></p>
            </div>
          </section>

        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-freshGreen hover:underline">← Back to Home</Link>
          <Link href="/privacy-policy" className="text-freshGreen hover:underline">Privacy Policy</Link>
          <Link href="/contact" className="text-freshGreen hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
