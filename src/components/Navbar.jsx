import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, Menu, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notifications } from '../data/mockData';
import { currentStudent } from '../data/mockData';

export default function Navbar({ role = 'student', onToggleSidebar, darkMode, onToggleDark }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar" role="banner">
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          id="navbar-menu-btn"
          className="btn-icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          style={{ display: 'flex' }}
        >
          <Menu size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, userSelect: 'none' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Shield size={15} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
            DeskGuard
          </span>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        {/* Dark mode */}
        <button
          id="navbar-darkmode-btn"
          className="btn-icon"
          onClick={onToggleDark}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <Link
          id="navbar-notif-btn"
          to={role === 'librarian' ? '/librarian/notifications' : '/student/notifications'}
          style={{ position: 'relative' }}
          className="btn-icon"
          aria-label={`${unread} unread notifications`}
        >
          <Bell size={17} />
          {unread > 0 && <span className="notif-dot" aria-hidden="true" />}
        </Link>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            id="navbar-profile-btn"
            onClick={() => setShowDropdown(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 10px 6px 6px',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 10, cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            aria-expanded={showDropdown}
            aria-label="Profile menu"
          >
            <div className="avatar" style={{ width: 30, height: 30, fontSize: '0.75rem' }}>
              {currentStudent.avatar}
            </div>
            <div style={{ textAlign: 'left', display: 'none' }} className="md:block">
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                {currentStudent.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', lineHeight: 1.2 }}>
                {role === 'librarian' ? 'Librarian' : currentStudent.rollNo}
              </div>
            </div>
            <ChevronDown size={14} color="var(--color-text-muted)" />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12, boxShadow: 'var(--shadow-lg)',
                  minWidth: 180, zIndex: 100, overflow: 'hidden',
                }}
                role="menu"
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{currentStudent.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{currentStudent.email}</div>
                </div>
                {role !== 'librarian' && (
                  <Link
                    to="/student/profile"
                    role="menuitem"
                    onClick={() => setShowDropdown(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '0.875rem', color: 'var(--color-text-primary)', textDecoration: 'none', transition: 'background 150ms' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    View Profile
                  </Link>
                )}
                <Link
                  to="/"
                  role="menuitem"
                  onClick={() => setShowDropdown(false)}
                  style={{ display: 'block', padding: '10px 16px', fontSize: '0.875rem', color: 'var(--color-danger)', textDecoration: 'none', transition: 'background 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Sign Out
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
