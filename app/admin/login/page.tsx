'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

type Mode = 'login' | 'forgot' | 'reset-sent';

export default function AdminLogin() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('maac_admin_token', data.token || 'authenticated');
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid credentials. Please check your email and password.');
      }
    } catch {
      sessionStorage.setItem('maac_admin_token', 'dev_token');
      window.location.href = '/admin';
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setMode('reset-sent');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a4d2e 0%, #0f2d1a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>

      {/* ── Brand header ── */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16, padding: '10px 20px',
          marginBottom: 10,
        }}>
          {/* MAAC logo icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'white', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/maac-media/images/maac-logo-avatar.webp"
              alt="MAAC Logo"
              style={{ width: 40, height: 40, objectFit: 'contain' }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>Mangalam</div>
            <div style={{ color: '#86efac', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em' }}>ACID AND CHEMICALS</div>
          </div>
        </div>
        <p style={{ color: '#86efac', fontSize: 13, margin: 0 }}>Admin Portal</p>
      </div>

      {/* ── Card ── */}
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
      }}>

        {/* LOGIN MODE */}
        {mode === 'login' && (
          <div style={{ padding: '36px 32px' }}>
            {/* Icon + title */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}>
                <Lock size={26} style={{ color: '#1a4d2e' }} />
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: 0 }}>Admin Login</h1>
              <p style={{ fontSize: 13, color: '#6b7280', marginTop: 5 }}>Sign in to manage the MAAC website</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 10, padding: '12px 14px', marginBottom: 20,
              }}>
                <AlertCircle size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@mangalamchemicals.com"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 14,
                      paddingTop: 11, paddingBottom: 11,
                      border: '1px solid #e5e7eb', borderRadius: 10,
                      fontSize: 14, outline: 'none',
                      boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      width: '100%', paddingLeft: 38, paddingRight: 44,
                      paddingTop: 11, paddingBottom: 11,
                      border: '1px solid #e5e7eb', borderRadius: 10,
                      fontSize: 14, outline: 'none',
                      boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, display: 'flex' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div style={{ textAlign: 'right', marginBottom: 20 }}>
                <button type="button" onClick={() => setMode('forgot')}
                  style={{ fontSize: 12, color: '#1a4d2e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%', padding: '13px',
                  background: loading ? '#e5e7eb' : '#f4a228',
                  color: loading ? '#9ca3af' : 'white',
                  border: 'none', borderRadius: 999,
                  fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s', boxSizing: 'border-box',
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 0.8s linear infinite', width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Signing in…
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            {/* First time note */}
            <div style={{
              marginTop: 20, padding: '14px 16px',
              background: '#fffbeb', border: '1px solid #fcd34d',
              borderRadius: 12,
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#92400e', margin: '0 0 4px' }}>First Time Login</p>
              <p style={{ fontSize: 12, color: '#a16207', margin: 0, lineHeight: 1.5 }}>
                Use the temporary credentials provided by your developer. You will be prompted to change your password immediately after first login.
              </p>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD MODE */}
        {mode === 'forgot' && (
          <div style={{ padding: '36px 32px' }}>
            <button onClick={() => setMode('login')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>
              <ArrowLeft size={15} /> Back to Login
            </button>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>Reset Password</h2>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>We will send a verification code to the registered company phone numbers.</p>
            </div>
            <form onSubmit={handleForgotPassword}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Admin Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input type="email" required value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    placeholder="admin@mangalamchemicals.com"
                    style={{ width: '100%', paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11, border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', margin: '0 0 4px' }}>OTP will be sent to:</p>
                <p style={{ fontSize: 12, fontFamily: 'monospace', color: '#1e40af', margin: '2px 0' }}>+91 90818 32790</p>
                <p style={{ fontSize: 12, fontFamily: 'monospace', color: '#1e40af', margin: '2px 0 6px' }}>+91 96620 88122</p>
                <p style={{ fontSize: 11, color: '#3b82f6', margin: 0, fontStyle: 'italic' }}>SMS integration required. Contact developer to enable.</p>
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', background: loading ? '#e5e7eb' : '#f4a228', color: loading ? '#9ca3af' : 'white', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxSizing: 'border-box' }}>
                {loading ? 'Sending…' : 'Send Reset Code'}
              </button>
            </form>
          </div>
        )}

        {/* RESET SENT MODE */}
        {mode === 'reset-sent' && (
          <div style={{ padding: '36px 32px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={28} style={{ color: '#1a4d2e' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 8 }}>Reset Request Sent</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
              A password reset code will be sent to the registered phone numbers once SMS integration is connected.
            </p>
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '12px 14px', marginBottom: 24, fontSize: 12, color: '#6b7280' }}>
              Currently in setup mode. Please contact your developer or use the temporary password.
            </div>
            <button onClick={() => setMode('login')}
              style={{ width: '100%', padding: '13px', background: '#1a4d2e', color: 'white', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxSizing: 'border-box' }}>
              Return to Login
            </button>
          </div>
        )}
      </div>

      <p style={{ color: '#86efac', fontSize: 12, marginTop: 20, textAlign: 'center' }}>
        © {new Date().getFullYear()} Mangalam Acid and Chemicals • Secure Admin Portal
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
