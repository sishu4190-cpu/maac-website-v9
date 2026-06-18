import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mangalam Acid and Chemicals',
  description: 'Privacy Policy for Mangalam Acid and Chemicals website. How we collect, use and protect your information when you submit enquiries or use our website.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'June 2025';

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Last updated: {lastUpdated}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy explains how Mangalam Acid and Chemicals (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses and protects your personal information when you visit <strong>mangalamchemicals.com</strong> and submit enquiries through our contact form.
          </p>
        </div>

        <div className="space-y-10">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 text-sm mb-3">We collect information you provide voluntarily through our enquiry form, including:</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {['Full name', 'Company name', 'Mobile number', 'Email address', 'Product requirements', 'Delivery location', 'Application / end use', 'Message or uploaded documents'].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm mt-3">We also collect standard website analytics data (page views, device type, browser, location at city level) through analytics tools if enabled.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 text-sm mb-3">The information you provide is used to:</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {[
                'Respond to your product enquiry with pricing and availability',
                'Send quotations and product documentation',
                'Follow up on pending enquiries',
                'Improve our website and product information based on enquiry patterns',
                'Maintain records of business correspondence',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm mt-3">We do not use your information for unsolicited marketing campaigns beyond the scope of your original enquiry.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Sharing</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              We do not sell, rent, or trade your personal information to third parties. Your information is shared only with our internal team members who need it to respond to your enquiry. If we use a third-party service to store enquiry data (such as Firebase, Supabase, or Google Sheets), your data is stored on those platforms under their respective privacy policies. We do not share customer data with advertising networks or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Storage and Security</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Enquiry data submitted through our contact form is stored securely. We implement reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. Uploaded documents are handled with care and not retained beyond the duration necessary to respond to your enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our website may use standard session cookies and analytics cookies to understand how visitors use the site. No tracking cookies linked to personal profiles are used. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 text-sm mb-3">You have the right to:</p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {[
                'Request access to the personal information we hold about you',
                'Request correction of inaccurate information',
                'Request deletion of your information from our records',
                'Withdraw consent for future contact',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-freshGreen mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm mt-3">To exercise any of these rights, contact us at <a href="mailto:mangalamacidandchemicals@gmail.com" className="text-freshGreen hover:underline">mangalamacidandchemicals@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Third Party Links</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our website contains links to external sites including IndiaMart, Google Maps, and social media platforms. We are not responsible for the privacy practices of those websites. We recommend reviewing their privacy policies separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be published on this page with an updated date. Continued use of the website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p className="text-gray-700 text-sm mb-3">For any privacy-related questions or requests:</p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700">
              <p className="font-semibold">Mangalam Acid and Chemicals</p>
              <p className="mt-1">PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India</p>
              <p className="mt-1">Email: <a href="mailto:mangalamacidandchemicals@gmail.com" className="text-freshGreen hover:underline">mangalamacidandchemicals@gmail.com</a></p>
              <p>Phone: <a href="tel:+919662088122" className="text-freshGreen hover:underline">+91 96620 88122</a></p>
            </div>
          </section>

        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-freshGreen hover:underline">← Back to Home</Link>
          <Link href="/terms-conditions" className="text-freshGreen hover:underline">Terms & Conditions</Link>
          <Link href="/contact" className="text-freshGreen hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
