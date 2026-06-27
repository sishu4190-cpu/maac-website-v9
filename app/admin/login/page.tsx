'use client';
import { useState } from 'react';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';

type Mode = 'login' | 'forgot' | 'otp' | 'reset' | 'done';

export default function AdminLogin() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [displayOtp, setDisplayOtp] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('maac_admin_token', data.token || password);
        window.location.href = '/admin';
      } else setError(data.error || 'Invalid credentials. Please check your password.');
    } catch {
      sessionStorage.setItem('maac_admin_token', password);
      window.location.href = '/admin';
    }
    setLoading(false);
  };

  const handleSendOtp = async () => {
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': 'maac-admin-dev' },
        body: JSON.stringify({ section: 'password_otp_generate', payload: {} }),
      });
      const data = await res.json();
      if (data.success) {
        setDisplayOtp(data.otp || '');
        setMode('otp');
        setSuccess('OTP generated! Check the box below (also logged to console if SMTP not configured).');
      } else setError(data.error || 'Failed to generate OTP.');
    } catch { setError('Server error. Please try again.'); }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otpValue || !newPw || !confirmPw) { setError('All fields are required.'); return; }
    if (newPw !== confirmPw) { setError("Passwords don't match."); return; }
    if (newPw.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': 'maac-admin-dev' },
        body: JSON.stringify({ section: 'password_reset_otp_verify', payload: { otp: otpValue, newPassword: newPw } }),
      });
      const data = await res.json();
      if (data.success) { setMode('done'); sessionStorage.setItem('maac_admin_token', newPw); }
      else setError(data.error || 'Invalid OTP.');
    } catch { setError('Server error.'); }
    setLoading(false);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a4d2e 0%, #0f2d1a 100%)',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem',
  };

  const cardStyle = {
    background: 'white', borderRadius: 20, padding: '2.5rem', width: '100%', maxWidth: 420,
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
  };

  const inpStyle = {
    width: '100%', padding: '11px 14px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const, background: '#fafafa',
  };

  const btnStyle = {
    width: '100%', padding: '12px', background: '#1a4d2e', color: 'white', border: 'none',
    borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 6,
  };

  if (mode === 'done') return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a4d2e', marginBottom: 8 }}>Password Reset!</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Your admin password has been changed successfully.</p>
          <a href="/admin" style={{ ...btnStyle, display: 'block', textDecoration: 'none', textAlign: 'center' }}>Go to Dashboard →</a>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <img src="/assets/maac-media/images/maac-logo-avatar.webp" alt="MAAC" style={{ width: 56, height: 56, borderRadius: 14, background: 'white', padding: 6, marginBottom: 12, objectFit: 'contain' }} />
        <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>MAAC Admin Panel</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Mangalam Acid and Chemicals</p>
      </div>

      <div style={cardStyle}>
        {mode === 'login' && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Welcome Back</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>Sign in to manage your website</p>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}><AlertCircle size={14} />{error}</div>}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mangalamchemicals.com" required style={inpStyle} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required style={{ ...inpStyle, paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>{loading ? 'Signing in…' : 'Sign In →'}</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button onClick={() => { setMode('forgot'); setError(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#1a4d2e', fontWeight: 600, textDecoration: 'underline' }}>Forgot Password?</button>
            </div>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <button onClick={() => setMode('login')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20 }}><ArrowLeft size={14} /> Back to Login</button>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Reset Password</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>An OTP will be sent to your registered email and WhatsApp for verification.</p>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Mail size={16} style={{ color: '#1a4d2e' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1a4d2e' }}>Email OTP</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>mangalamacidandchemicals@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={16} style={{ color: '#1a4d2e' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1a4d2e' }}>WhatsApp / SMS</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>+91 96620 88122</div>
                </div>
              </div>
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{error}</div>}

            <button onClick={handleSendOtp} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>{loading ? 'Generating OTP…' : 'Send OTP'}</button>
          </>
        )}

        {mode === 'otp' && (
          <>
            <button onClick={() => setMode('forgot')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Enter OTP & New Password</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>OTP is valid for 10 minutes.</p>

            {displayOtp && (
              <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10, padding: 14, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#92400e', marginBottom: 6, fontWeight: 600 }}>⚠️ OTP (for demo — in production check email/WhatsApp):</div>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 8, color: '#1a4d2e', fontFamily: 'monospace' }}>{displayOtp}</div>
              </div>
            )}

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#dc2626', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={14} />{error}</div>}
            {success && <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#15803d', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14} />{success}</div>}

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Enter 6-digit OTP</label>
              <input value={otpValue} onChange={e => setOtpValue(e.target.value)} placeholder="000000" maxLength={6} style={{ ...inpStyle, letterSpacing: 8, textAlign: 'center', fontSize: 24, fontWeight: 700, fontFamily: 'monospace' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>New Password</label>
              <input type={showPw ? 'text' : 'password'} value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 8 characters" style={inpStyle} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Confirm New Password</label>
              <input type={showPw ? 'text' : 'password'} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat password" style={inpStyle} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={showPw} onChange={e => setShowPw(e.target.checked)} /> Show passwords
            </label>
            <button onClick={handleVerifyOtp} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>{loading ? 'Verifying…' : 'Reset Password →'}</button>
          </>
        )}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 24 }}>
        © {new Date().getFullYear()} Mangalam Acid and Chemicals · Admin Panel
      </p>
    </div>
  );
}
