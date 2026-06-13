import { motion } from 'framer-motion';

export default function OccupancyCard({ title, value, total, color, icon: Icon, trend }) {
  const pct = total ? Math.round((value / total) * 100) : 0;

  const colorMap = {
    blue:   { bg: 'rgba(37,99,235,0.08)',  text: '#2563EB', bar: '#2563EB' },
    green:  { bg: 'rgba(34,197,94,0.08)',  text: '#22C55E', bar: '#22C55E' },
    red:    { bg: 'rgba(239,68,68,0.08)',  text: '#EF4444', bar: '#EF4444' },
    yellow: { bg: 'rgba(245,158,11,0.08)', text: '#F59E0B', bar: '#F59E0B' },
    purple: { bg: 'rgba(139,92,246,0.08)', text: '#8B5CF6', bar: '#8B5CF6' },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className="card stat-card"
      whileHover={{ y: -3, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      style={{ padding: '20px 24px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
            {title}
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: c.text, lineHeight: 1 }}>
            {value}
          </p>
          {total && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
              of {total} total
            </p>
          )}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={22} color={c.text} />
        </div>
      </div>

      {total && (
        <div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{ background: c.bar }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{pct}%</span>
            {trend && (
              <span style={{ fontSize: '0.75rem', color: trend > 0 ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs yesterday
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
