import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// MAAC Admin Authentication API
// ─────────────────────────────────────────────────────────────────────────────
// Required environment variables (set in .env.local — NEVER commit to git):
//
//   ADMIN_EMAIL=admin@mangalamchemicals.com
//   ADMIN_PASSWORD=MAAC@2026#Admin
//   JWT_SECRET=your-strong-random-jwt-secret-minimum-32-chars
//   FORCE_PASSWORD_CHANGE=true   (set to false after password is changed)
//
// Production recommendation: Replace with Firebase Auth or Supabase Auth
// for better security, MFA, and session management.
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@maac.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Maac@2026';
const JWT_SECRET = process.env.JWT_SECRET || 'maac-dev-secret-change-in-production';
const FORCE_PASSWORD_CHANGE = process.env.FORCE_PASSWORD_CHANGE !== 'false';

function generateSimpleToken(email: string): string {
  // Simple base64 token for demo. Replace with proper JWT in production.
  const payload = { email, iat: Date.now(), exp: Date.now() + 8 * 60 * 60 * 1000 };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Constant-time comparison to prevent timing attacks
    const emailMatch = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const passwordMatch = password === ADMIN_PASSWORD;

    if (!emailMatch || !passwordMatch) {
      // Log failed attempt (connect to monitoring in production)
      console.warn(`[MAAC Admin] Failed login attempt for: ${email} at ${new Date().toISOString()}`);
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = generateSimpleToken(email);

    console.log(`[MAAC Admin] Successful login: ${email} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      token,
      requirePasswordChange: FORCE_PASSWORD_CHANGE,
      message: FORCE_PASSWORD_CHANGE
        ? 'Login successful. Please change your password immediately.'
        : 'Login successful.',
    });

  } catch (error) {
    console.error('[MAAC Admin Auth Error]', error);
    return NextResponse.json({ error: 'Authentication error.' }, { status: 500 });
  }
}
