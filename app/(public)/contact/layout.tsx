import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Mangalam Acid and Chemicals – Vapi, Gujarat',
  description: 'Send an enquiry to Mangalam Acid and Chemicals. Call +91 96620 88122, WhatsApp us, or fill the bulk chemical enquiry form. ISO-certified supplier, Vapi, Gujarat.',
  keywords: ['contact chemical supplier India', 'bulk chemical enquiry', 'Mangalam Acid Chemicals contact', 'chemical supplier Vapi phone'],
  openGraph: {
    title: 'Contact Mangalam Acid and Chemicals',
    description: 'Reach our team for bulk chemical enquiries, COA requests, or pricing. Based in Vapi, Gujarat – serving India and international markets.',
    url: 'https://mangalamchemicals.com/contact',
  },
  alternates: {
    canonical: 'https://mangalamchemicals.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
