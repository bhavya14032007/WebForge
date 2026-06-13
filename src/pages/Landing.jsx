import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  QrCode, MapPin, Clock, AlertTriangle, LayoutDashboard, Shield,
  ArrowRight, CheckCircle, Users, BookOpen, Zap, Code2, Sun, Moon,
  ChevronRight, Star, TrendingUp
} from 'lucide-react';
import { occupancySummary } from '../data/mockData';

const features = [
  { icon: QrCode, title: 'QR Check-In', desc: 'Students scan the QR code on their desk to instantly check in. No app download required, works via browser.', color: '#2563EB' },
  { icon: MapPin, title: 'Live Desk Tracking', desc: 'Real-time visualization of every desk in the library. Instantly see which seats are free, occupied, or on hold.', color: '#8B5CF6' },
  { icon: Clock, title: 'Away Mode', desc: 'Students can mark themselves as Away for short breaks. The system tracks time and auto-releases abandoned seats.', color: '#F59E0B' },
  { icon: AlertTriangle, title: 'Automated Seat Release', desc: 'AI-triggered presence checks ensure desks are not hoarded. Unresponsive seats are released after a grace period.', color: '#EF4444' },
  { icon: LayoutDashboard, title: 'Librarian Dashboard', desc: 'Full-featured admin dashboard for librarians to manage desks, monitor occupancy, and resolve conflicts.', color: '#22C55E' },
  { icon: Zap, title: 'Instant Notifications', desc: 'Push alerts for presence verification, away mode expiry, and successful check-ins keep students informed.', color: '#06B6D4' },
];

const steps = [
  { num: '01', title: 'Scan QR Code', desc: 'Walk up to any desk and scan the QR sticker with your phone camera.' },
  { num: '02', title: 'Check In', desc: 'Confirm your identity with your student ID. Your session begins immediately.' },
  { num: '03', title: 'Study', desc: 'Focus on your studies! The system tracks your session in the background.' },
  { num: '04', title: 'Verify Presence', desc: "Periodic gentle check-ins confirm you're still at your seat." },
  { num: '05', title: 'Fair Allocation', desc: 'When you leave, your seat is instantly freed for the next student.' },
];

const testimonials = [
  { name: 'Dr. Ananya Krishnan', role: 'Head Librarian, MUJ', quote: 'DeskGuard has completely eliminated desk hoarding in our library. Occupancy utilization is up 40%.', stars: 5 },
  { name: 'Rahul Choudhary', role: 'CS Student, 3rd Year', quote: 'Finally I can find a seat during exam season! The live map is incredibly helpful.', stars: 5 },
  { name: 'Prof. Suresh Mehta', role: 'Dean of Academics', quote: 'A brilliant solution to a very real problem every university faces.', stars: 5 },
];

export default function Landing({ darkMode, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* ── NAVBAR ─────────────────────────────── */}
      <nav
        className="landing-nav"
        style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'none' }}
        role="navigation"
        aria-label="Site navigation"
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Shield size={20} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
              DeskGuard
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href="https://github.com/yourusername/deskguard"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="View source code on GitHub"
            >
              <Github size={16} />
              <span style={{ display: 'none' }} className="md:inline">GitHub</span>
            </a>
            <button className="btn btn-ghost btn-sm btn-icon" onClick={onToggleDark} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
            <Link to="/student" className="btn btn-primary btn-sm" id="landing-view-map-btn">
              View Live Map <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────── */}
      <section
        className="hero-gradient"
        style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="hero-heading"
      >
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: -100, left: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', bottom: -50, right: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} aria-hidden="true" />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(37,99,235,0.1)', color: '#2563EB',
              padding: '6px 14px', borderRadius: 999, fontSize: '0.8125rem', fontWeight: 600,
              marginBottom: 24, border: '1px solid rgba(37,99,235,0.2)'
            }}>
              <Zap size={13} fill="#2563EB" />
              Anti-Hoarding Library Technology
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              marginBottom: 24,
              color: 'var(--color-text-primary)',
            }}
          >
            Fair Library Seating{' '}
            <span className="gradient-hero">Starts Here</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.1875rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: 640,
              margin: '0 auto 40px',
            }}
          >
            DeskGuard uses QR-based check-ins and intelligent presence tracking to eliminate
            desk hoarding in libraries — giving every student a fair chance at a seat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/login" className="btn btn-primary btn-lg" id="hero-login-btn">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/student" className="btn btn-secondary btn-lg" id="hero-live-map-btn">
              <MapPin size={18} />
              View Live Map
            </Link>
          </motion.div>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              display: 'flex', justifyContent: 'center', gap: 40,
              marginTop: 64, flexWrap: 'wrap'
            }}
          >
            {[
              { label: 'Total Seats', value: occupancySummary.total },
              { label: 'Currently Occupied', value: occupancySummary.occupied },
              { label: 'Available Now', value: occupancySummary.available },
              { label: 'Active Students', value: '127' },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '-0.04em' }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────── */}
      <section style={{ padding: '96px 24px', background: 'var(--color-surface)' }} aria-labelledby="features-heading">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Platform Features
            </p>
            <h2 id="features-heading" className="section-title" style={{ marginBottom: 16 }}>
              Everything you need for{' '}
              <span className="gradient-text">fair library access</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: 560, margin: '0 auto' }}>
              Built specifically for university environments, DeskGuard handles the full lifecycle of library seat management.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                className="card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                style={{ padding: 28 }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18
                }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 10, color: 'var(--color-text-primary)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────── */}
      <section style={{ padding: '96px 24px', background: 'var(--color-bg)' }} aria-labelledby="how-heading">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              How It Works
            </p>
            <h2 id="how-heading" className="section-title" style={{ marginBottom: 16 }}>
              From door to desk in{' '}
              <span className="gradient-text">30 seconds</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '16px 0', width: '100%' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                  background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: '1.0625rem'
                }}>
                  {num}
                </div>
                <div style={{ flex: 1, paddingTop: 6 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 6 }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'relative', alignSelf: 'stretch', display: 'flex', alignItems: 'center'
                  }}>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────── */}
      <section style={{ padding: '96px 24px', background: 'var(--color-surface)' }} aria-labelledby="testimonials-heading">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 id="testimonials-heading" className="section-title" style={{ marginBottom: 12 }}>
              Trusted by academics
            </h2>
            <p className="section-subtitle">See what students and librarians are saying</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map(({ name, role, quote, stars }, i) => (
              <motion.div
                key={name}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ padding: 28 }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {Array(stars).fill(0).map((_, j) => (
                    <Star key={j} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  "{quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar" style={{ width: 40, height: 40, fontSize: '0.875rem' }}>
                    {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>{name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #1e40af, #2563EB, #7C3AED)',
        textAlign: 'center'
      }} aria-labelledby="cta-heading">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 700, margin: '0 auto' }}
        >
          <h2 id="cta-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'white', marginBottom: 16, letterSpacing: '-0.03em' }}>
            Ready to transform your library?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.0625rem', marginBottom: 36 }}>
            Deploy DeskGuard in your institution today. No hardware required — just QR stickers and WiFi.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" id="cta-login-btn" style={{
              padding: '14px 32px', background: 'white', color: '#2563EB',
              borderRadius: 10, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 150ms, box-shadow 150ms'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/yourusername/deskguard"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 32px', background: 'rgba(255,255,255,0.15)', color: 'white',
                borderRadius: 10, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.25)',
                transition: 'background 150ms'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Github size={16} /> View on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer style={{
        background: 'var(--color-sidebar-bg)',
        color: 'var(--color-sidebar-text)',
        padding: '48px 24px 32px'
      }} role="contentinfo">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 48 }}>
            <div style={{ flex: '1 1 280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Shield size={17} color="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'white' }}>DeskGuard</span>
              </div>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 280, color: '#64748B' }}>
                Smart library seat booking and anti-hoarding platform designed for modern universities.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: 'white', marginBottom: 16, fontSize: '0.9375rem' }}>Product</h3>
              <nav aria-label="Footer product links">
                {['Features', 'How It Works', 'Analytics', 'Pricing'].map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 150ms' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; }}
                    >{l}</Link>
                  </div>
                ))}
              </nav>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: 'white', marginBottom: 16, fontSize: '0.9375rem' }}>Company</h3>
              <nav aria-label="Footer company links">
                {['About', 'Contact', 'Privacy Policy', 'Terms'].map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <Link to="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 150ms' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; }}
                    >{l}</Link>
                  </div>
                ))}
              </nav>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: 'white', marginBottom: 16, fontSize: '0.9375rem' }}>Resources</h3>
              <nav aria-label="Footer resource links">
                {['Documentation', 'GitHub', 'Changelog', 'Status'].map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="https://github.com/yourusername/deskguard" target="_blank" rel="noopener noreferrer"
                      style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 150ms' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; }}
                    >{l}</a>
                  </div>
                ))}
              </nav>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: '0.875rem', color: '#475569' }}>
              © 2026 DeskGuard. Built for MUJ Hackathon. All rights reserved.
            </p>
            <a
              href="https://github.com/yourusername/deskguard"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; }}
            >
              <Github size={15} /> Open Source on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
