import { motion } from 'framer-motion';
import { Clock, BookOpen, Monitor, Award, Calendar } from 'lucide-react';
import { currentStudent, sessionHistory } from '../data/mockData';
import UserProfileCard from '../components/UserProfileCard';
import StatusBadge from '../components/StatusBadge';

function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: { bg: 'rgba(37,99,235,0.08)', text: '#2563EB' },
    green: { bg: 'rgba(34,197,94,0.08)', text: '#22C55E' },
    purple: { bg: 'rgba(139,92,246,0.08)', text: '#8B5CF6' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className="card"
      whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
      style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Icon size={22} color={c.text} />
      </div>
      <div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: '1.625rem', fontWeight: 900, color: c.text, lineHeight: 1 }}>{value}</div>
      </div>
    </motion.div>
  );
}

export default function Profile() {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          My Profile
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Your student information and library usage history.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Left: profile card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <UserProfileCard student={currentStudent} />

          {/* Achievement badges */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-primary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={16} color="#F59E0B" />
              Achievements
            </h3>
            {[
              { label: '📚 Bookworm', desc: '100+ hours studied' },
              { label: '⏰ Punctual', desc: 'Never abandoned a desk' },
              { label: '🌟 Top Student', desc: 'Ranked #3 this month' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stats + history */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <StatCard label="Total Study Hours" value={`${currentStudent.totalHours}h`} icon={Clock} color="blue" />
            <StatCard label="Seats Used" value={currentStudent.seatsUsed} icon={Monitor} color="green" />
            <StatCard label="Avg Session" value={currentStudent.avgSession} icon={BookOpen} color="purple" />
          </div>

          {/* Session History */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} color="var(--color-primary)" />
                Session History
              </h2>
              <span className="badge badge-info">{sessionHistory.length} records</span>
            </div>
            <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
              <table aria-label="Session history table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Desk</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionHistory.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{i + 1}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                          {row.desk}
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{row.date}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Clock size={13} color="var(--color-text-muted)" />
                          <span style={{ fontWeight: 500 }}>{row.duration}</span>
                        </div>
                      </td>
                      <td><StatusBadge status={row.status.toLowerCase()} /></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly chart summary */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 16 }}>
              This Week's Activity
            </h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
              {[
                { day: 'Mon', hours: 3.5 },
                { day: 'Tue', hours: 2.0 },
                { day: 'Wed', hours: 4.5 },
                { day: 'Thu', hours: 1.5 },
                { day: 'Fri', hours: 3.0 },
                { day: 'Sat', hours: 5.0 },
                { day: 'Sun', hours: 0 },
              ].map(({ day, hours }) => (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(hours / 5) * 100}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                      width: '100%', background: hours > 0 ? 'linear-gradient(to top, #2563EB, #7C3AED)' : 'var(--color-border)',
                      borderRadius: '4px 4px 0 0', minHeight: hours > 0 ? 4 : 0,
                    }}
                  />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
