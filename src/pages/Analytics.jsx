import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  BarChart3, TrendingUp, Clock, Users, Activity
} from 'lucide-react';
import {
  dailyOccupancyData, peakHoursData, avgStudyDurationData, weeklyUsageData
} from '../data/mockData';
import AnalyticsCard from '../components/AnalyticsCard';

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p style={{ fontWeight: 700, marginBottom: 6, color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontSize: '0.8125rem', display: 'flex', gap: 6 }}>
          <span>{p.name}:</span>
          <strong>{typeof p.value === 'number' && !Number.isInteger(p.value) ? p.value.toFixed(1) : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const summaryCards = [
    { title: 'Avg Daily Sessions', value: '127', subtitle: 'students per day', icon: Users, color: 'blue', trend: '+12%' },
    { title: 'Peak Hour', value: '4 PM', subtitle: 'highest demand', icon: Clock, color: 'purple', trend: null },
    { title: 'Avg Study Duration', value: '3.2h', subtitle: 'per session', icon: Activity, color: 'green', trend: '+8%' },
    { title: 'Hoarding Incidents', value: '4.5', subtitle: 'per day (avg)', icon: TrendingUp, color: 'red', trend: '-22%' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Analytics
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Library usage trends, peak hours, and occupancy insights.
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <AnalyticsCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 20 }}>

        {/* 1. Daily Occupancy */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ padding: 24 }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 4 }}>
              Daily Occupancy
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Desk status distribution throughout the day
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dailyOccupancyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradOccupied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAvailable" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAway" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.8125rem' }} />
              <Area type="monotone" dataKey="occupied" stroke="#EF4444" fill="url(#gradOccupied)" strokeWidth={2} name="Occupied" />
              <Area type="monotone" dataKey="available" stroke="#22C55E" fill="url(#gradAvailable)" strokeWidth={2} name="Available" />
              <Area type="monotone" dataKey="away" stroke="#F59E0B" fill="url(#gradAway)" strokeWidth={2} name="Away" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 2. Peak Library Hours */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ padding: 24 }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 4 }}>
              Peak Library Hours
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Average number of students per hour
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={peakHoursData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" fill="url(#barGrad)" name="Students" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 3. Avg Study Duration by Department */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: 24 }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 4 }}>
              Average Study Duration
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Hours per session by department
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={avgStudyDurationData} layout="vertical" margin={{ top: 4, right: 4, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} domain={[0, 5]} />
              <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} width={48} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="duration" name="Hours" radius={[0, 4, 4, 0]} fill="#22C55E">
                {avgStudyDurationData.map((_, index) => (
                  <Cell key={index} fill={`hsl(${140 + index * 15}, 60%, 45%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 4. Weekly Usage Trend */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ padding: 24 }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-text-primary)', marginBottom: 4 }}>
              Weekly Usage & Hoarding Trend
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Total sessions vs hoarding incidents per day
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyUsageData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.8125rem' }} />
              <Line type="monotone" dataKey="sessions" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} name="Sessions" />
              <Line type="monotone" dataKey="hoarding" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: '#EF4444' }} strokeDasharray="5 3" name="Hoarding" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
