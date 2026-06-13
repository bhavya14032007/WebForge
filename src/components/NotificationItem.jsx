import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Clock, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error:   AlertTriangle,
  info:    Info,
};

const colors = {
  success: { icon: '#22C55E', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)' },
  warning: { icon: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  error:   { icon: '#EF4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)' },
  info:    { icon: '#06B6D4', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.2)' },
};

export default function NotificationItem({ notification, onDismiss }) {
  const { type, title, message, time, read } = notification;
  const Icon = icons[type] || Info;
  const c = colors[type] || colors.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{
        display: 'flex',
        gap: 14,
        padding: '16px 20px',
        background: read ? 'transparent' : c.bg,
        borderLeft: read ? '3px solid transparent' : `3px solid ${c.icon}`,
        borderRadius: 12,
        border: `1px solid ${read ? 'var(--color-border)' : c.border}`,
        borderLeft: `3px solid ${read ? 'var(--color-border)' : c.icon}`,
        position: 'relative',
        transition: 'all 200ms ease',
      }}
      role="article"
      aria-label={title}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={18} color={c.icon} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
            {title}
          </p>
          {!read && (
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: c.icon, flexShrink: 0
            }} aria-label="Unread" />
          )}
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
          <Clock size={12} />
          <span>{time}</span>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(notification.id)}
          className="btn-ghost btn-icon"
          style={{ width: 28, height: 28, flexShrink: 0, alignSelf: 'flex-start' }}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      )}
    </motion.div>
  );
}
