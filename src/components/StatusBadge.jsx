// StatusBadge component
export default function StatusBadge({ status, size = 'md' }) {
  const map = {
    available:  { label: 'Available',  cls: 'badge-available',  dot: '#22C55E' },
    occupied:   { label: 'Occupied',   cls: 'badge-occupied',   dot: '#EF4444' },
    away:       { label: 'Away',       cls: 'badge-away',       dot: '#F59E0B' },
    abandoned:  { label: 'Abandoned',  cls: 'badge-abandoned',  dot: '#8B5CF6' },
    completed:  { label: 'Completed',  cls: 'badge-success',    dot: '#22C55E' },
    success:    { label: 'Success',    cls: 'badge-success',    dot: '#22C55E' },
    warning:    { label: 'Warning',    cls: 'badge-away',       dot: '#F59E0B' },
    error:      { label: 'Error',      cls: 'badge-occupied',   dot: '#EF4444' },
    info:       { label: 'Info',       cls: 'badge-info',       dot: '#06B6D4' },
  };

  const cfg = map[status?.toLowerCase()] || map.info;

  return (
    <span className={`badge ${cfg.cls}`} style={{ fontSize: size === 'sm' ? '0.6875rem' : '0.75rem' }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: cfg.dot, flexShrink: 0
      }} aria-hidden="true" />
      {cfg.label}
    </span>
  );
}
