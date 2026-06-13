import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Users, CheckCircle, Clock, AlertTriangle, Search,
  RefreshCw, MoreVertical, Filter, Download, RotateCcw, Eye
} from 'lucide-react';
import { librarianTableData, occupancySummary, mockDesks, DESK_STATUS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

function MetricBar() {
  const metrics = [
    { label: 'Total Desks', value: occupancySummary.total, color: '#2563EB', icon: Monitor },
    { label: 'Occupied', value: occupancySummary.occupied, color: '#EF4444', icon: Users },
    { label: 'Available', value: occupancySummary.available, color: '#22C55E', icon: CheckCircle },
    { label: 'Away', value: occupancySummary.away, color: '#F59E0B', icon: Clock },
    { label: 'Abandoned', value: occupancySummary.abandoned, color: '#8B5CF6', icon: AlertTriangle },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
      {metrics.map(({ label, value, color, icon: Icon }, i) => (
        <motion.div
          key={label}
          className="card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          style={{ padding: '18px 20px', borderTop: `3px solid ${color}` }}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 900, color, lineHeight: 1 }}>{value}</p>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} color={color} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function LibrarianDashboard() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [tableData, setTableData] = useState(librarianTableData);

  const filtered = tableData.filter(row => {
    const matchSearch = search === '' ||
      row.student.toLowerCase().includes(search.toLowerCase()) ||
      row.desk.toLowerCase().includes(search.toLowerCase()) ||
      row.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || row.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleReset = (desk) => {
    setTableData(prev => prev.filter(r => r.desk !== desk));
  };

  const handleMarkAvailable = (desk) => {
    setTableData(prev => prev.map(r => r.desk === desk ? { ...r, status: 'available' } : r));
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Librarian Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Real-time overview of all library desks and student sessions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button id="librarian-refresh-btn" className="btn btn-secondary btn-sm">
            <RefreshCw size={15} /> Refresh
          </button>
          <button id="librarian-export-btn" className="btn btn-primary btn-sm">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Metrics */}
      <MetricBar />

      {/* Occupancy Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'
        }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', flex: 1, minWidth: 150 }}>
            Occupancy Table
          </h2>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              id="librarian-search-input"
              type="search"
              placeholder="Search student, desk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                paddingLeft: 36, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                borderRadius: 8, border: '1px solid var(--color-border)',
                background: 'var(--color-surface-2)', color: 'var(--color-text-primary)',
                fontSize: '0.875rem', outline: 'none', width: 220
              }}
              aria-label="Search desks and students"
            />
          </div>

          {/* Status filter */}
          <select
            id="librarian-filter-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border)',
              background: 'var(--color-surface-2)', color: 'var(--color-text-primary)',
              fontSize: '0.875rem', cursor: 'pointer'
            }}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="occupied">Occupied</option>
            <option value="away">Away</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
          <table aria-label="Library desk occupancy table">
            <thead>
              <tr>
                <th>Desk</th>
                <th>Student Name</th>
                <th>Roll No.</th>
                <th>Department</th>
                <th>Check-In Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '40px 0' }}>
                      No desks match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <motion.tr
                      key={row.desk}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace', fontSize: '0.9375rem' }}>
                          {row.desk}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="avatar" style={{ width: 28, height: 28, fontSize: '0.6875rem' }}>
                            {row.student.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </div>
                          <span style={{ fontWeight: 500 }}>{row.student}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {row.rollNo}
                      </td>
                      <td>
                        <span className="badge badge-info">{row.dept}</span>
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                        {row.checkIn}
                      </td>
                      <td><StatusBadge status={row.status} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            id={`reset-desk-${row.desk}`}
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReset(row.desk)}
                            title="Reset Desk"
                            aria-label={`Reset desk ${row.desk}`}
                          >
                            <RotateCcw size={13} /> Reset
                          </button>
                          <button
                            id={`available-desk-${row.desk}`}
                            className="btn btn-success btn-sm"
                            onClick={() => handleMarkAvailable(row.desk)}
                            aria-label={`Mark desk ${row.desk} as available`}
                          >
                            <CheckCircle size={13} />
                          </button>
                          <button
                            id={`view-desk-${row.desk}`}
                            className="btn btn-secondary btn-sm"
                            onClick={() => { setSelectedRow(row); setDetailOpen(true); }}
                            aria-label={`View details for desk ${row.desk}`}
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Showing {filtered.length} of {tableData.length} records
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Last updated: just now
          </span>
        </div>
      </div>

      {/* Desk detail modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title="Desk Session Details" size="sm">
        {selectedRow && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: '1.125rem' }}>
                {selectedRow.student.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)' }}>
                  {selectedRow.student}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  {selectedRow.rollNo} · {selectedRow.dept}
                </div>
              </div>
            </div>
            {[
              { label: 'Desk', value: selectedRow.desk },
              { label: 'Check-In Time', value: selectedRow.checkIn },
              { label: 'Status', value: <StatusBadge status={selectedRow.status} /> },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>{label}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>{value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button id="modal-reset-btn" className="btn btn-danger" style={{ flex: 1 }} onClick={() => { handleReset(selectedRow.desk); setDetailOpen(false); }}>
                <RotateCcw size={15} /> Reset Desk
              </button>
              <button id="modal-available-btn" className="btn btn-success" style={{ flex: 1 }} onClick={() => { handleMarkAvailable(selectedRow.desk); setDetailOpen(false); }}>
                <CheckCircle size={15} /> Mark Available
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
