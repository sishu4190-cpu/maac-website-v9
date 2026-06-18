'use client';

import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, Upload, ChevronDown, CheckCircle, Star
} from 'lucide-react';
import { useSiteData } from '../../lib/useSiteData';
import { FadeUp, StaggerList, StaggerItem } from '@/app/components/animations';


const products = [
  'Ferrous Sulphate Heptahydrate', 'Ferrous Sulphate Semi Dry', 'Magnesium Sulphate',
  'Zinc Sulphate Hepta', 'Zinc Sulphate Mono 33%', 'Copper Sulphate Pentahydrate',
  'Boric Acid', 'Calcium Nitrate', 'Sodium Nitrate', 'Sodium Acetate Tri-Hydrate',
  'Iron EDTA', 'Zinc EDTA', 'Calcium EDTA', 'Magnesium EDTA', 'Manganese EDTA',
  'Copper EDTA', 'Fe EDDHA', 'Boron EDTA', 'Chelated EDTA', 'Amino Acid 80%',
  'Ammonium Bi Fluoride Pure', 'Ammonium Fluoride', 'Potassium Fluoride',
  'Sodium Fluoride', 'Sodium Cryolite', 'Potassium Cryolite', 'Calcium Fluoride',
  'Phosphoric Acid', 'Sulfuric Acid', 'Hydrochloric Acid', 'Nitric Acid',
  'Acetic Acid', 'Formic Acid', 'Oxalic Acid', 'Citric Acid',
  'Ferrous Fumarate Pure Grade', 'Ferric Pyrophosphate', 'Fumaric Acid',
  'Zinc Sulphate Mono Hydrate 36% USP Grade',
  '19-19-19 NPK', '12-61-00 MAP', '00-52-34 MKP', '13-00-45 Potassium Nitrate',
  '00-00-50 Potassium Sulphate', '00-00-60 Potassium Chloride',
  'Other / Not Listed'
];

const packagingOptions = ['25 kg Bag', '50 kg Bag', 'Jumbo Bag (500 kg)', 'Jumbo Bag (1000 kg)', 'IBC / Drum', 'Bulk / Tanker', 'As Per Requirement'];

export default function ContactPage() {
  const { contact } = useSiteData();
  const wa = contact.whatsapp.replace(/\D/g, "");
  const [formData, setFormData] = useState({
    name: '', company: '', mobile: '', email: '',
    product: '', grade: '', quantity: '', packaging: '',
    deliveryLocation: '', application: '', message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, fileName: file?.name || null }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // fallback: show success for demo
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f2d1a 0%, #1a4d2e 100%)" }} className="molecule-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="max-w-2xl">
            <p className="section-label mb-3">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "white" }}>Contact Mangalam Acid and Chemicals</h1>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.88)" }}>
              Send us your product requirement, grade, quantity and delivery location. Our team will respond within one business day with pricing and availability.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 card-hover reveal">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-deepGreen" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Our Office</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                PT 209, SH-305, 3rd Floor,<br />
                Girnar Khushboo Plaza, Vapi INA (INA),<br />
                Pardi, Valsad – 396195,<br />
                Gujarat, India
              </p>
            </div>

            {/* Phones */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 card-hover reveal">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-deepGreen" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Numbers</h3>
              <div className="space-y-1">
                {['+91 96620 88122', '+91 90818 32790', '+91 95379 70043'].map(ph => (
                  <a key={ph} href={`tel:${ph.replace(/\s/g, '')}`}
                    className="block text-sm font-medium transition-colors" style={{ color: "#1a4d2e" }}>
                    {ph}
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 card-hover reveal">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-deepGreen" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Addresses</h3>
              <div className="space-y-1">
                {['mangalamacidandchemicals@gmail.com', 'info_maac@yahoo.com'].map(em => (
                  <a key={em} href={`mailto:${em}`}
                    className="block text-xs font-medium transition-colors break-all" style={{ color: "#1a4d2e" }}>
                    {em}
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 card-hover reveal">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-deepGreen" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-sm text-gray-600">Monday – Saturday</p>
              <p className="text-sm font-semibold text-deepGreen">9:00 AM – 7:00 PM</p>
              <p className="text-xs text-gray-500 mt-2">Sunday: Closed</p>
              <a
                href="https://wa.me/919662088122?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20chemical%20supply%20from%20Mangalam%20Acid%20and%20Chemicals."
                target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 text-xs font-semibold text-white bg-[#25D366] px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-colors w-fit">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form */}
            <FadeUp className="lg:col-span-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Product Enquiry</h2>
              <p className="text-gray-600 mb-8 text-sm">Fill in your requirement details. The more specific you are, the faster we can respond with accurate pricing and availability.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-freshGreen mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-deepGreen mb-2">Enquiry Received</h3>
                  <p className="text-gray-600 text-sm">Thank you for contacting Mangalam Acid and Chemicals. Our team will review your requirement and respond within one business day.</p>
                  <p className="text-xs text-gray-500 mt-3">For urgent requirements, call us directly at <a href="tel:+919662088122" className="text-freshGreen font-semibold">+91 96620 88122</a></p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                      <input type="text" name="company" required value={formData.company} onChange={handleChange}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                  </div>

                  {/* Mobile + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                  </div>

                  {/* Product */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Required <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select name="product" required value={formData.product} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent appearance-none bg-white">
                        <option value="">Select a product</option>
                        {products.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Grade + Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade / Specification</label>
                      <input type="text" name="grade" value={formData.grade} onChange={handleChange}
                        placeholder="e.g. Technical / USP / 98%"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity Required <span className="text-red-500">*</span></label>
                      <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange}
                        placeholder="e.g. 500 kg / 5 MT / 1 FCL"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                  </div>

                  {/* Packaging + Delivery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Packaging Preference</label>
                      <div className="relative">
                        <select name="packaging" value={formData.packaging} onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent appearance-none bg-white">
                          <option value="">Select packaging</option>
                          {packagingOptions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Delivery Location <span className="text-red-500">*</span></label>
                      <input type="text" name="deliveryLocation" required value={formData.deliveryLocation} onChange={handleChange}
                        placeholder="City / State / Country"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                    </div>
                  </div>

                  {/* Application */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Application / End Use</label>
                    <input type="text" name="application" value={formData.application} onChange={handleChange}
                      placeholder="e.g. Fertilizer manufacturing / Water treatment / Industrial use"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent" />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Additional Message</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                      placeholder="Any specific requirements, certifications needed, delivery timeline, or other details..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-freshGreen focus:border-transparent resize-none" />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Upload Requirement Sheet (Optional)</label>
                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-freshGreen transition-colors">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {file ? file.name : 'Click to upload PDF, XLSX, or DOC (max 5MB)'}
                      </span>
                      <input type="file" className="hidden"
                        accept=".pdf,.doc,.docx,.xlsx,.xls"
                        onChange={e => setFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="submit" disabled={loading}
                      className="flex-1 btn-primary flex items-center justify-center gap-2">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Enquiry
                        </>
                      )}
                    </button>
                    <a
                      href="https://wa.me/919662088122?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20chemical%20supply."
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>

                  <p className="text-xs text-gray-500">
                    By submitting this form, you agree to our <a href="/privacy-policy" className="text-freshGreen hover:underline">Privacy Policy</a>. We do not share your data with third parties.
                  </p>
                </form>
              )}
            </div>
            </FadeUp>

            {/* Map + Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Placeholder */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Find Us</h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4!2d72.9016!3d20.3720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDIyJzE5LjIiTiA3MsKwNTQnMDUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mangalam Acid and Chemicals Location - Vapi, Gujarat"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat
                </p>
              </div>

              {/* Quick Contact */}
              <div className="rounded-xl p-6" style={{ background: "linear-gradient(135deg, #0f2d1a, #1a4d2e)", color: "white" }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: "white" }}>Quick Contact</h3>
                <div className="space-y-3">
                  {contact.phones.map(ph => (
                    <a key={ph} href={`tel:${ph.replace(/\s/g,"")}`} className="flex items-center gap-3 transition-colors" style={{ color: "white", textDecoration: "none" }}>
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#f4a228" }} />
                      <span className="text-sm" style={{ color: "white" }}>{ph}</span>
                    </a>
                  ))}
                  {contact.emails.map(em => (
                    <a key={em} href={`mailto:${em}`} className="flex items-center gap-3 transition-colors" style={{ color: "white", textDecoration: "none" }}>
                      <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#f4a228" }} />
                      <span className="text-xs break-all" style={{ color: "white" }}>{em}</span>
                    </a>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${wa}?text=Hello%2C%20I%20would%20like%20to%20get%20a%20bulk%20quote%20from%20Mangalam%20Acid%20and%20Chemicals.`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#1ebe5d] transition-colors text-sm w-full">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>

              {/* IndiaMART Reviews */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">TrustSEAL Verified</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Mangalam Acid and Chemicals is a TrustSEAL verified supplier on IndiaMART. View buyer reviews and ratings.
                </p>
                <a
                  href="https://www.indiamart.com/mangalam-acid-chemicals/testimonial.html"
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold text-orange hover:underline flex items-center gap-1">
                  View IndiaMART Testimonials →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Process */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How the Enquiry Process Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit Enquiry', desc: 'Fill the form with your product, grade, quantity and delivery location.' },
              { step: '02', title: 'Team Reviews', desc: 'Our team checks current stock, pricing and dispatch availability.' },
              { step: '03', title: 'Receive Quote', desc: 'We respond within 1 business day with pricing, lead time, and packaging options.' },
              { step: '04', title: 'Confirm & Dispatch', desc: 'Confirm your order and we arrange bulk dispatch with COA documentation.' },
            ].map(item => (
              <div key={item.step} className="text-center p-5 rounded-xl border border-gray-100 card-hover reveal" style={{ background: "white" }}>
                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3" style={{ background: "linear-gradient(135deg, #1a4d2e, #2d6e47)" }}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
