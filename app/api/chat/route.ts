import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        // API key injected server-side — never exposed to browser
        ...(process.env.ANTHROPIC_API_KEY
          ? { 'x-api-key': process.env.ANTHROPIC_API_KEY }
          : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    console.error('[Chat API Error]', e);
    return NextResponse.json(
      { error: 'Chat service unavailable', content: [{ type: 'text', text: 'I am having trouble connecting. Please WhatsApp us at +91 96620 88122 for assistance.' }] },
      { status: 500 }
    );
  }
}
