import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, CheckCircle, Clock, XCircle, Users, Monitor,
  ZapOff, Wifi, Battery, Info, QrCode, RefreshCw
} from 'lucide-react';
import { mockDesks, currentSession, occupancySummary, DESK_STATUS } from '../data/mockData';
import OccupancyCard from '../components/OccupancyCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

// ─── Desk color map ────────────────────────────────────────────────────────
const deskColors = {
  [DESK_STATUS.AVAILABLE]: { fill: '#22C55E', stroke: '#16A34A', shadow: '0 0 10px rgba(34,197,94,0.5)' },
  [DESK_STATUS.OCCUPIED]:  { fill: '#EF4444', stroke: '#DC2626', shadow: '0 0 10px rgba(239,68,68,0.5)' },
  [DESK_STATUS.AWAY]:      { fill: '#F59E0B', stroke: '#D97706', shadow: '0 0 10px rgba(245,158,11,0.5)' },
  [DESK_STATUS.ABANDONED]: { fill: '#8B5CF6', stroke: '#7C3AED', shadow: '0 0 10px rgba(139,92,246,0.5)' },
};

// ─── SVG Library Map ───────────────────────────────────────────────────────
function LibraryMap({ desks, onSelectDesk, selectedDesk }) {
  const [hovered, setHovered] = useState(null);

  // Layout: 3 sections (A, B, C), each 4 rows × 4 cols of desks
  // We place them in a 1000×600 SVG
  const deskWidth = 52;
  const deskHeight = 32;
  const gap = 16;
  const colSpacing = deskWidth + gap;
  const rowSpacing = deskHeight + 20;

  const sections = [
    { label: 'Section A', x: 40, y: 80, cols: 4, rows: 4, deskOffset: 0 },
    { label: 'Section B', x: 340, y: 80, cols: 4, rows: 4, deskOffset: 16 },
    { label: 'Section C', x: 640, y: 80, cols: 4, rows: 4, deskOffset: 32 },
  ];

  return (
    <div style={{ overflowX: 'auto', padding: 8 }}>
      <svg
        viewBox="0 0 940 440"
        style={{ width: '100%', maxWidth: 940, display: 'block', margin: '0 auto' }}
        role="img"
        aria-label="Interactive library seating map"
      >
        {/* Background */}
        <rect x="0" y="0" width="940" height="440" rx="12" fill="var(--color-surface-2)" />

        {/* Library walls */}
        <rect x="8" y="8" width="924" height="424" rx="10" fill="none" stroke="var(--color-border)" strokeWidth="2" />

        {/* Entry */}
        <rect x="420" y="400" width="100" height="24" rx="4" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="470" y="416" textAnchor="middle" fontSize="11" fill="#2563EB" fontWeight="600">ENTRANCE</text>

        {/* Librarian desk */}
        <rect x="730" y="14" width="190" height="50" rx="8" fill="rgba(124,58,237,0.12)" stroke="#7C3AED" strokeWidth="1.5" />
        <text x="825" y="36" textAnchor="middle" fontSize="11" fill="#7C3AED" fontWeight="700">LIBRARIAN DESK</text>
        <text x="825" y="52" textAnchor="middle" fontSize="10" fill="#7C3AED" opacity="0.7">Staff Only</text>

        {/* Sections */}
        {sections.map(({ label, x, y, cols, rows, deskOffset }) => (
          <g key={label}>
            {/* Section label */}
            <text
              x={x + (cols * colSpacing) / 2 - gap / 2}
              y={y - 12}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--color-text-secondary)"
            >
              {label}
            </text>

            {/* Section background */}
            <rect
              x={x - 10}
              y={y - 28}
              width={cols * colSpacing + 4}
              height={rows * rowSpacing + 36}
              rx="10"
              fill="rgba(255,255,255,0.04)"
              stroke="var(--color-border)"
              strokeWidth="1"
            />

            {/* Desks */}
            {Array(rows).fill(0).map((_, row) =>
              Array(cols).fill(0).map((_, col) => {
                const deskIdx = deskOffset + row * cols + col;
                const desk = desks[deskIdx];
                if (!desk) return null;
                const dx = x + col * colSpacing;
                const dy = y + row * rowSpacing;
                const c = deskColors[desk.status] || deskColors[DESK_STATUS.AVAILABLE];
                const isHovered = hovered === desk.id;
                const isSelected = selectedDesk?.id === desk.id;

                return (
                  <g
                    key={desk.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Desk ${desk.number}, ${desk.status}`}
                    onClick={() => onSelectDesk(desk)}
                    onKeyDown={e => e.key === 'Enter' && onSelectDesk(desk)}
                    onMouseEnter={() => setHovered(desk.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                    className="desk-cell"
                  >
                    {/* Glow / selected ring */}
                    {(isHovered || isSelected) && (
                      <rect
                        x={dx - 3} y={dy - 3}
                        width={deskWidth + 6} height={deskHeight + 6}
                        rx="9"
                        fill="none"
                        stroke={isSelected ? '#2563EB' : c.stroke}
                        strokeWidth="2.5"
                        opacity="0.8"
                      />
                    )}

                    {/* Desk body */}
                    <rect
                      x={dx} y={dy}
                      width={deskWidth} height={deskHeight}
                      rx="7"
                      fill={c.fill}
                      opacity={isHovered || isSelected ? 1 : 0.85}
                      style={{
                        filter: isHovered ? `drop-shadow(${c.shadow})` : undefined,
                        transition: 'all 0.15s ease'
                      }}
                    />

                    {/* Desk surface line */}
                    <rect
                      x={dx + 4} y={dy + 5}
                      width={deskWidth - 8} height={5}
                      rx="2"
                      fill="rgba(255,255,255,0.3)"
                    />

                    {/* Desk number */}
                    <text
                      x={dx + deskWidth / 2}
                      y={dy + deskHeight - 8}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="white"
                    >
                      {desk.number}
                    </text>

                    {/* Student initials if occupied */}
                    {desk.student && (
                      <text
                        x={dx + deskWidth / 2}
                        y={dy + 16}
                        textAnchor="middle"
                        fontSize="8"
                        fontWeight="600"
                        fill="rgba(255,255,255,0.9)"
                      >
                        {desk.student.avatar}
                      </text>
                    )}
                  </g>
                );
              })
            )}
          </g>
        ))}

        {/* Legend */}
        {[
          { label: 'Available', color: '#22C55E', x: 30 },
          { label: 'Occupied', color: '#EF4444', x: 130 },
          { label: 'Away', color: '#F59E0B', x: 220 },
          { label: 'Abandoned', color: '#8B5CF6', x: 290 },
        ].map(({ label, color, x }) => (
          <g key={label}>
            <rect x={x} y={390} width={12} height={12} rx="3" fill={color} />
            <text x={x + 17} y={401} fontSize="11" fill="var(--color-text-muted)" fontWeight="500">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Session Timer ─────────────────────────────────────────────────────────
function SessionCard({ session }) {
  const [status, setStatus] = useState('active');
  const pct = Math.round((session.remainingMinutes / session.totalMinutes) * 100);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ padding: 24 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)' }}>
          Current Session
        </h2>
        <StatusBadge status={session.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Desk', value: session.desk.id, icon: Monitor },
          { label: 'Section', value: `Section ${session.desk.section}`, icon: MapPin },
          { label: 'Checked In', value: session.checkInTime, icon: Clock },
          { label: 'Remaining', value: `${session.remainingMinutes} min`, icon: Battery },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{
            background: 'var(--color-surface-2)', borderRadius: 10,
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
            border: '1px solid var(--color-border)'
          }}>
            <Icon size={16} color="var(--color-primary)" />
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Time bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
          <span>Session Progress</span>
          <span>{pct}% remaining</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ background: pct > 50 ? 'var(--color-success)' : pct > 20 ? 'var(--color-warning)' : 'var(--color-danger)' }}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button id="checkin-btn" className="btn btn-success" style={{ flex: 1, minWidth: 100 }}>
          <CheckCircle size={16} /> Check In
        </button>
        <button id="away-mode-btn" className="btn btn-warning" style={{ flex: 1, minWidth: 100 }}>
          <Clock size={16} /> Away Mode
        </button>
        <button id="end-session-btn" className="btn btn-danger" style={{ flex: 1, minWidth: 100 }}>
          <XCircle size={16} /> End Session
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mapView, setMapView] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSelectDesk = (desk) => {
    setSelectedDesk(desk);
    setModalOpen(true);
  };

  const filteredDesks = filterStatus === 'all'
    ? mockDesks
    : mockDesks.filter(d => d.status === filterStatus);

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Student Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Welcome back, Aarav! Here's the live library status.
        </p>
      </div>

      {/* Occupancy summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <OccupancyCard title="Available Desks" value={occupancySummary.available} total={occupancySummary.total} color="green" icon={CheckCircle} trend={5} />
        <OccupancyCard title="Occupied Desks" value={occupancySummary.occupied} total={occupancySummary.total} color="red" icon={Users} trend={-3} />
        <OccupancyCard title="Away Mode" value={occupancySummary.away} total={occupancySummary.total} color="yellow" icon={Clock} />
        <OccupancyCard title="Abandoned" value={occupancySummary.abandoned} total={occupancySummary.total} color="purple" icon={ZapOff} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        {/* ── Library Map ── */}
        <div>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid var(--color-border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10
            }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)' }}>
                  Live Library Map
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  Click a desk to view details and check in
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  id="map-filter-select"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: '0.8125rem',
                    background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)', cursor: 'pointer'
                  }}
                  aria-label="Filter desks by status"
                >
                  <option value="all">All Desks</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="away">Away</option>
                </select>
                <button id="refresh-map-btn" className="btn-icon" aria-label="Refresh map">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <LibraryMap
                desks={filterStatus === 'all' ? mockDesks : filteredDesks}
                onSelectDesk={handleSelectDesk}
                selectedDesk={selectedDesk}
              />
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SessionCard session={currentSession} />

          {/* QR Check-in promo card */}
          <motion.div
            className="card"
            style={{
              padding: 20,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              border: 'none', color: 'white'
            }}
            whileHover={{ y: -2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={20} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Scan to Check In</div>
                <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Point camera at desk QR</div>
              </div>
            </div>
            <button id="scan-qr-btn" style={{
              width: '100%', padding: '10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
              transition: 'background 150ms'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            >
              Open QR Scanner
            </button>
          </motion.div>

          {/* Live status */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                Live System Status
              </span>
            </div>
            {[
              { label: 'Library WiFi', status: 'Online', ok: true },
              { label: 'QR Scanners', status: 'Active', ok: true },
              { label: 'Verification System', status: 'Running', ok: true },
              { label: 'Auto-Release', status: 'Enabled', ok: true },
            ].map(({ label, status, ok }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: ok ? '#22C55E' : '#EF4444' }}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desk Details Modal ── */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Desk ${selectedDesk?.id || ''} Details`} size="md">
        {selectedDesk && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-text-primary)' }}>
                  Desk {selectedDesk.number}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
                  Section {selectedDesk.section} · Floor {selectedDesk.floor}
                </div>
              </div>
              <StatusBadge status={selectedDesk.status} size="lg" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Power Outlet', value: selectedDesk.hasOutlet ? 'Available' : 'No Outlet' },
                { label: 'Window View', value: selectedDesk.hasWindow ? 'Yes' : 'No' },
                { label: 'Check-In Time', value: selectedDesk.checkInTime || '—' },
                { label: 'Student', value: selectedDesk.student?.name || 'Empty' },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'var(--color-surface-2)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>

            {selectedDesk.status === DESK_STATUS.AVAILABLE && (
              <button
                id="modal-checkin-btn"
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '0.9375rem' }}
                onClick={() => setModalOpen(false)}
              >
                <CheckCircle size={18} /> Check In to Desk {selectedDesk.number}
              </button>
            )}

            {selectedDesk.status !== DESK_STATUS.AVAILABLE && (
              <div style={{
                padding: '14px', borderRadius: 10,
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: '0.875rem', color: '#DC2626'
              }}>
                <Info size={16} />
                This desk is currently {selectedDesk.status}.
                {selectedDesk.student && ` Occupied by ${selectedDesk.student.name}.`}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
