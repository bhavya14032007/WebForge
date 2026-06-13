import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function AnalyticsCard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  const colorMap = {
    blue:   '#2563EB',
    green:  '#22C55E',
    red:    '#EF4444',
    yellow: '#F59E0B',
    purple: '#8B5CF6',
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className="card"
      whileHover={{ y: -3, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
      style={{ padding: '20px 24px', borderTop: `3px solid ${c}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{title}</p>
        {Icon && <Icon size={18} color={c} />}
      </div>
      <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 4 }}>
        {value}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#22C55E' }}>
            <TrendingUp size={13} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{trend}</span>
          </div>
        )}
        {subtitle && (
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{subtitle}</span>
        )}
      </div>
    </motion.div>
  );
}
