import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';

export default function Login() {
  const [tab, setTab] = useState('student');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(tab === 'librarian' ? '/librarian' : '/student');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #EFF6FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} aria-hidden="true" />

      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', gap: 0, borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.16)', background: 'var(--color-surface)' }}>

        {/* ── Left panel (illustration) ── */}
        <div style={{
          flex: '0 0 420px',
          background: 'linear-gradient(145deg, #1e40af 0%, #2563EB 50%, #7C3AED 100%)',
          padding: '48px 40px',
          display: 'flex', flexDirection: 'column',
          color: 'white',
          position: 'relative', overflow: 'hidden',
        }}
          aria-hidden="true"
          className="hide-on-mobile"
        >
          {/* Floating shapes */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)'
          }} />
          <div style={{
            position: 'absolute', bottom: 40, left: -30,
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Shield size={22} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>DeskGuard</span>
          </div>

          {/* SVG Illustration */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 320 }}>
              {/* Library shelves */}
              <rect x="20" y="20" width="280" height="240" rx="12" fill="rgba(255,255,255,0.06)" />
              {/* Desks grid */}
              {[0,1,2,3].map(row => [0,1,2].map(col => {
                const x = 40 + col * 80;
                const y = 50 + row * 50;
                const colors = ['#22C55E', '#EF4444', '#22C55E', '#F59E0B', '#22C55E', '#EF4444', '#22C55E', '#22C55E', '#F59E0B', '#EF4444', '#22C55E', '#22C55E'];
                const c = colors[row * 3 + col];
                return (
                  <g key={`${row}-${col}`}>
                    <rect x={x} y={y} width={56} height={32} rx="6" fill={c} opacity="0.85" />
                    <rect x={x+4} y={y+4} width={48} height={8} rx="2" fill="rgba(255,255,255,0.3)" />
                    {c === '#EF4444' && <circle cx={x+48} cy={y+8} r="4" fill="white" opacity="0.9" />}
                    {c === '#22C55E' && <rect x={x+20} y={y+8} width={16} height={4} rx="2" fill="rgba(255,255,255,0.5)" />}
                  </g>
                );
              }))}
              {/* QR Code illustration */}
              <g transform="translate(120, 215)">
                <rect x="0" y="0" width="80" height="80" rx="8" fill="white" opacity="0.15" />
                <rect x="8" y="8" width="28" height="28" rx="2" fill="rgba(255,255,255,0.5)" />
                <rect x="44" y="8" width="28" height="28" rx="2" fill="rgba(255,255,255,0.5)" />
                <rect x="8" y="44" width="28" height="28" rx="2" fill="rgba(255,255,255,0.5)" />
                <rect x="44" y="44" width="12" height="12" rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="60" y="44" width="12" height="12" rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="44" y="60" width="12" height="12" rx="1" fill="rgba(255,255,255,0.5)" />
              </g>
            </svg>
          </div>

          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>
              Smart Library Seats
            </h2>
            <p style={{ fontSize: '0.9375rem', opacity: 0.75, lineHeight: 1.65 }}>
              Join 1,200+ students using DeskGuard to claim fair library seats at Manipal University Jaipur.
            </p>
          </div>
        </div>

        {/* ── Right panel (form) ── */}
        <div style={{ flex: 1, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, color: 'var(--color-text-primary)' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
              Sign in to access the DeskGuard portal
            </p>
          </div>

          {/* Tab switcher */}
          <div className="tab-bar" style={{ marginBottom: 32 }} role="tablist" aria-label="Login type">
            {['student', 'librarian'].map(t => (
              <button
                key={t}
                id={`login-tab-${t}`}
                className={`tab-btn ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}
                role="tab"
                aria-selected={tab === t}
              >
                {t === 'student' ? '🎓 Student' : '📚 Librarian'}
              </button>
            ))}
          </div>

          <motion.form
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            role="tabpanel"
            aria-label={`${tab} login form`}
          >
            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label htmlFor="login-email" className="form-label">
                {tab === 'student' ? 'University Email' : 'Staff Email'}
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: 42 }}
                  placeholder={tab === 'student' ? 'rollno@muj.edu' : 'librarian@muj.edu'}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="login-password" className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <button type="button" id="forgot-password-btn" style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              id="login-submit-btn"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px 20px', fontSize: '0.9375rem' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.8s" from="0 12 12" to="360 12 12" repeatCount="indefinite" />
                    </path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  {tab === 'student' ? 'Sign In as Student' : 'Sign In as Librarian'}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>

            {/* Demo credentials hint */}
            <div style={{
              marginTop: 20, padding: '12px 16px',
              background: 'rgba(37,99,235,0.06)', borderRadius: 10,
              border: '1px solid rgba(37,99,235,0.15)',
              fontSize: '0.8125rem', color: 'var(--color-text-secondary)'
            }}>
              <strong style={{ color: 'var(--color-primary)' }}>Demo:</strong>{' '}
              Use any email and password — this is a prototype.
            </div>
          </motion.form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
