import { motion } from 'framer-motion';
import { Mail, Hash, Building, GraduationCap } from 'lucide-react';

export default function UserProfileCard({ student }) {
  if (!student) return null;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: 24, overflow: 'hidden', position: 'relative' }}
    >
      {/* Background blob */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 120, height: 120, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))',
        pointerEvents: 'none'
      }} aria-hidden="true" />

      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div className="avatar" style={{
          width: 64, height: 64, fontSize: '1.5rem',
          boxShadow: '0 0 0 4px rgba(37,99,235,0.15)'
        }}>
          {student.avatar}
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2 }}>
            {student.name}
          </h3>
          <span className="badge badge-info">{student.dept}</span>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { icon: Hash, label: 'Roll Number', value: student.rollNo },
          { icon: Building, label: 'Department', value: student.dept },
          { icon: Mail, label: 'Email', value: student.email },
          { icon: GraduationCap, label: 'Role', value: 'Undergraduate Student' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Icon size={15} color="var(--color-text-muted)" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
