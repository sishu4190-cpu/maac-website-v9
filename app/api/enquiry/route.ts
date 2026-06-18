import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// MAAC Enquiry API Route
// ─────────────────────────────────────────────────────────────────────────────
// This route is ready to connect to:
//   1. Firebase Firestore  (set NEXT_PUBLIC_FIREBASE_* env vars)
//   2. Supabase            (set NEXT_PUBLIC_SUPABASE_* env vars)
//   3. Nodemailer / SMTP   (set SMTP_* env vars)
//   4. Google Sheets       (set GOOGLE_SHEET_ID + service account)
// ─────────────────────────────────────────────────────────────────────────────

export interface EnquiryPayload {
  name: string;
  company: string;
  mobile: string;
  email?: string;
  product: string;
  grade?: string;
  quantity: string;
  packaging?: string;
  deliveryLocation: string;
  application?: string;
  message?: string;
  fileName?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryPayload = await request.json();

    // ── Validate required fields ──────────────────────────────────────────────
    const required: (keyof EnquiryPayload)[] = ['name', 'company', 'mobile', 'product', 'quantity', 'deliveryLocation'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const enquiry = {
      ...body,
      createdAt: new Date().toISOString(),
      source: 'website-contact-form',
      status: 'new',
    };

    // ── 1. Firebase Firestore integration (connect when ready) ────────────────
    // import { getFirestore, collection, addDoc } from 'firebase/firestore';
    // import { initializeApp } from 'firebase/app';
    // const app = initializeApp({ ... }); // use env vars
    // const db = getFirestore(app);
    // await addDoc(collection(db, 'enquiries'), enquiry);

    // ── 2. Supabase integration (connect when ready) ──────────────────────────
    // import { createClient } from '@supabase/supabase-js';
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    // await supabase.from('enquiries').insert([enquiry]);

    // ── 3. Nodemailer / SMTP email notification (connect when ready) ──────────
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: 587, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: 'mangalamacidandchemicals@gmail.com',
    //   subject: `New Enquiry: ${body.product} – ${body.company}`,
    //   text: JSON.stringify(enquiry, null, 2),
    // });

    // ── 4. Google Sheets integration (connect when ready) ─────────────────────
    // Use Google Sheets API with service account credentials
    // Sheet ID: set GOOGLE_SHEET_ID in env vars

    // ── Console log for development ───────────────────────────────────────────
    console.log('[MAAC Enquiry Received]', JSON.stringify(enquiry, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. Our team will respond within one business day.',
      enquiryId: `MAAC-${Date.now()}`,
    });

  } catch (error) {
    console.error('[MAAC Enquiry Error]', error);
    return NextResponse.json({ error: 'Internal server error. Please try again or call us directly.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'MAAC Enquiry API is running.' });
}
