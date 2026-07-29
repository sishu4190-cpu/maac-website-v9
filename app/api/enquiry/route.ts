import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData, Enquiry } from '@/app/lib/dataStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ['name', 'company', 'mobile', 'product', 'quantity', 'deliveryLocation'];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const enquiry: Enquiry = {
      id: `MAAC-${Date.now()}`,
      name: body.name,
      company: body.company,
      mobile: body.mobile,
      email: body.email || '',
      product: body.product,
      grade: body.grade || '',
      quantity: body.quantity,
      packaging: body.packaging || '',
      deliveryLocation: body.deliveryLocation,
      application: body.application || '',
      message: body.message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to admin-data.json
    const data = await readData();
    data.enquiries.unshift(enquiry);
    await writeData(data);

    // Console log for development
    console.log('[MAAC Enquiry]', enquiry.id, enquiry.product, enquiry.company);

    // Send email + WhatsApp notifications in parallel — neither blocks/fails
    // the enquiry save if it errors, and one failing doesn't stop the other.
    const [emailResult, whatsappResult] = await Promise.allSettled([
      (async () => {
        const { sendEnquiryEmail } = await import('@/app/lib/email');
        return sendEnquiryEmail(enquiry);
      })(),
      (async () => {
        const { sendEnquiryWhatsApp } = await import('@/app/lib/whatsapp');
        return sendEnquiryWhatsApp(enquiry);
      })(),
    ]);

    if (emailResult.status === 'rejected') {
      console.warn('[MAAC Enquiry] Email notification threw:', emailResult.reason);
    } else if (!emailResult.value.success) {
      console.warn('[MAAC Enquiry] Email notification failed:', emailResult.value.error);
    }

    if (whatsappResult.status === 'rejected') {
      console.warn('[MAAC Enquiry] WhatsApp notification threw:', whatsappResult.reason);
    } else if (!whatsappResult.value.success) {
      console.warn('[MAAC Enquiry] WhatsApp notification failed for all numbers:', whatsappResult.value.results);
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. Our team will respond within one business day.',
      enquiryId: enquiry.id,
    });

  } catch (error) {
    console.error('[Enquiry Error]', error);
    return NextResponse.json({ error: 'Server error. Please try again or call us directly.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'MAAC Enquiry API running' });
}
