import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, BarChart3, Bell, User,
  Shield, LogOut, Menu, X, ChevronRight, BookOpen
} from 'lucide-react';

const studentNav = [
  { to: '/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/student/map', icon: Map, label: 'Library Map' },
  { to: '/student/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/student/notifications', icon: Bell, label: 'Notifications' },
  { to: '/student/profile', icon: User, label: 'Profile' },
];

const librarianNav = [
  { to: '/librarian', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/librarian/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/librarian/notifications', icon: Bell, label: 'Notifications' },
];

export default function Sidebar({ role = 'student', open, onClose }) {
  const location = useLocation();
  const navItems = role === 'librarian' ? librarianNav : studentNav;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`sidebar ${open ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Shield size={20} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'white', letterSpacing: '-0.02em' }}>
                  DeskGuard
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {role === 'librarian' ? 'Admin Panel' : 'Student Portal'}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-icon lg:hidden"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Role badge */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 9999,
            background: role === 'librarian' ? 'rgba(124,58,237,0.18)' : 'rgba(37,99,235,0.18)',
            color: role === 'librarian' ? '#A78BFA' : '#93C5FD',
            fontSize: '0.75rem', fontWeight: 600
          }}>
            <BookOpen size={12} />
            {role === 'librarian' ? 'Librarian' : 'Student'}
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '8px 12px', flex: 1 }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 4px', marginBottom: 4 }}>
            Navigation
          </div>
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
              <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <NavLink to="/" className="sidebar-link">
            <LogOut size={18} />
            <span>Sign Out</span>
          </NavLink>
          <div style={{ padding: '12px 16px 4px', fontSize: '0.6875rem', color: '#475569' }}>
            DeskGuard v1.0 • MUJ Library
          </div>
        </div>
      </aside>
    </>
  );
}
