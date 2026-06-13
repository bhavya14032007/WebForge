import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Filter, Trash2 } from 'lucide-react';
import { notifications as initialNotifications } from '../data/mockData';
import NotificationItem from '../components/NotificationItem';

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const filtered = filter === 'all'
    ? notifs
    : filter === 'unread'
    ? notifs.filter(n => !n.read)
    : notifs.filter(n => n.type === filter);

  const filterBtns = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'warning', label: 'Warnings' },
    { key: 'success', label: 'Success' },
    { key: 'info', label: 'Info' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bell size={24} color="var(--color-primary)" />
            Notifications
            {unread > 0 && (
              <span style={{
                background: 'var(--color-danger)', color: 'white',
                borderRadius: 999, padding: '2px 9px',
                fontSize: '0.75rem', fontWeight: 700
              }}>
                {unread} new
              </span>
            )}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Stay updated on your library session status.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            id="mark-all-read-btn"
            className="btn btn-secondary btn-sm"
            onClick={markAllRead}
            disabled={unread === 0}
          >
            <CheckCheck size={15} /> Mark All Read
          </button>
          <button
            id="clear-all-notifs-btn"
            className="btn btn-ghost btn-sm"
            onClick={() => setNotifs([])}
            style={{ color: 'var(--color-danger)' }}
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }} role="group" aria-label="Filter notifications">
        {filterBtns.map(({ key, label }) => (
          <button
            key={key}
            id={`notif-filter-${key}`}
            onClick={() => setFilter(key)}
            style={{
              padding: '7px 16px',
              borderRadius: 999,
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === key ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: filter === key ? 'var(--color-primary)' : 'var(--color-surface)',
              color: filter === key ? 'white' : 'var(--color-text-secondary)',
              transition: 'all 150ms',
            }}
            aria-pressed={filter === key}
          >
            {label}
            {key === 'unread' && unread > 0 && (
              <span style={{ marginLeft: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '0 6px', fontSize: '0.6875rem' }}>
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center', padding: '60px 24px',
                color: 'var(--color-text-muted)',
              }}
            >
              <Bell size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                No notifications
              </p>
              <p style={{ fontSize: '0.9375rem' }}>
                {filter === 'unread' ? "You're all caught up!" : "Nothing to show here."}
              </p>
            </motion.div>
          ) : (
            filtered.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onDismiss={dismiss}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
