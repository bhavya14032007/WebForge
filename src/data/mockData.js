// ─── Mock Data for DeskGuard ───────────────────────────────────────────────

// Desk statuses
export const DESK_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  AWAY: 'away',
  ABANDONED: 'abandoned',
};

// Mock students
export const mockStudents = [
  { id: 'S001', name: 'Aarav Sharma', rollNo: '22BCS001', dept: 'Computer Science', email: 'aarav.sharma@muj.edu', avatar: 'AS', totalHours: 124, seatsUsed: 38, avgSession: '3h 15m' },
  { id: 'S002', name: 'Priya Verma', rollNo: '22BEC042', dept: 'Electronics', email: 'priya.verma@muj.edu', avatar: 'PV', totalHours: 98, seatsUsed: 31, avgSession: '3h 10m' },
  { id: 'S003', name: 'Rohan Mehta', rollNo: '22BME017', dept: 'Mechanical', email: 'rohan.mehta@muj.edu', avatar: 'RM', totalHours: 76, seatsUsed: 24, avgSession: '3h 10m' },
  { id: 'S004', name: 'Sneha Patel', rollNo: '22BCA033', dept: 'Computer Applications', email: 'sneha.patel@muj.edu', avatar: 'SP', totalHours: 112, seatsUsed: 35, avgSession: '3h 12m' },
  { id: 'S005', name: 'Vikram Singh', rollNo: '22BCE008', dept: 'Civil Engineering', email: 'vikram.singh@muj.edu', avatar: 'VS', totalHours: 89, seatsUsed: 28, avgSession: '3h 11m' },
  { id: 'S006', name: 'Anjali Gupta', rollNo: '22BCS056', dept: 'Computer Science', email: 'anjali.gupta@muj.edu', avatar: 'AG', totalHours: 143, seatsUsed: 45, avgSession: '3h 11m' },
  { id: 'S007', name: 'Karan Joshi', rollNo: '22BEC019', dept: 'Electronics', email: 'karan.joshi@muj.edu', avatar: 'KJ', totalHours: 67, seatsUsed: 21, avgSession: '3h 11m' },
  { id: 'S008', name: 'Meera Nair', rollNo: '22BCS078', dept: 'Computer Science', email: 'meera.nair@muj.edu', avatar: 'MN', totalHours: 156, seatsUsed: 49, avgSession: '3h 11m' },
];

// Generate 48 desks with realistic placement
const generateDesks = () => {
  const statuses = [
    DESK_STATUS.AVAILABLE, DESK_STATUS.OCCUPIED, DESK_STATUS.AWAY,
    DESK_STATUS.AVAILABLE, DESK_STATUS.OCCUPIED, DESK_STATUS.AVAILABLE,
    DESK_STATUS.AWAY, DESK_STATUS.AVAILABLE, DESK_STATUS.OCCUPIED,
    DESK_STATUS.AVAILABLE,
  ];
  const desks = [];
  const studentPool = mockStudents;

  for (let i = 1; i <= 48; i++) {
    const status = statuses[i % statuses.length];
    const student = status !== DESK_STATUS.AVAILABLE
      ? studentPool[(i - 1) % studentPool.length]
      : null;
    const checkInHour = 8 + Math.floor(Math.random() * 6);
    const checkInMin = Math.floor(Math.random() * 60);

    desks.push({
      id: `D${String(i).padStart(3, '0')}`,
      number: i,
      status,
      student: student ? { ...student } : null,
      checkInTime: student ? `${String(checkInHour).padStart(2, '0')}:${String(checkInMin).padStart(2, '0')}` : null,
      section: i <= 16 ? 'A' : i <= 32 ? 'B' : 'C',
      floor: 1,
      hasOutlet: i % 3 === 0,
      hasWindow: i % 5 === 0,
    });
  }
  return desks;
};

export const mockDesks = generateDesks();

// Current logged-in student (simulated)
export const currentStudent = mockStudents[0];

// Current session
export const currentSession = {
  desk: mockDesks[4],
  checkInTime: '09:30',
  status: DESK_STATUS.OCCUPIED,
  remainingMinutes: 87,
  totalMinutes: 120,
};

// History
export const sessionHistory = [
  { id: 'H001', desk: 'D012', date: '2026-06-12', duration: '3h 40m', status: 'Completed' },
  { id: 'H002', desk: 'D007', date: '2026-06-11', duration: '2h 15m', status: 'Completed' },
  { id: 'H003', desk: 'D023', date: '2026-06-10', duration: '4h 00m', status: 'Completed' },
  { id: 'H004', desk: 'D031', date: '2026-06-09', duration: '1h 50m', status: 'Completed' },
  { id: 'H005', desk: 'D005', date: '2026-06-08', duration: '3h 20m', status: 'Completed' },
  { id: 'H006', desk: 'D018', date: '2026-06-07', duration: '2h 45m', status: 'Abandoned' },
  { id: 'H007', desk: 'D042', date: '2026-06-06', duration: '3h 10m', status: 'Completed' },
];

// Occupancy summary
export const occupancySummary = {
  total: 48,
  occupied: 18,
  available: 22,
  away: 6,
  abandoned: 2,
};

// Notifications
export const notifications = [
  { id: 'N001', type: 'warning', title: 'Presence Verification Required', message: 'Please verify your presence at Desk D012 within 10 minutes or your session will be released.', time: '2 min ago', read: false },
  { id: 'N002', type: 'error', title: 'Away Mode Expiring', message: 'Your away mode at Desk D005 expires in 5 minutes. Please return to your seat.', time: '8 min ago', read: false },
  { id: 'N003', type: 'success', title: 'Check-In Successful', message: 'You have successfully checked in at Desk D023, Section B. Enjoy your study session!', time: '1h ago', read: true },
  { id: 'N004', type: 'info', title: 'Desk Released', message: 'Your session at Desk D018 was automatically released after 30 minutes of inactivity.', time: '2h ago', read: true },
  { id: 'N005', type: 'success', title: 'Session Ended', message: 'Your 3h 40m study session at Desk D012 has ended. Great work today!', time: '1d ago', read: true },
  { id: 'N006', type: 'info', title: 'Peak Hours Alert', message: 'The library is currently at 85% capacity. Book your seat early tomorrow.', time: '1d ago', read: true },
  { id: 'N007', type: 'warning', title: 'Verification Reminder', message: 'Random presence check initiated for Section A. Please tap your ID card.', time: '2d ago', read: true },
];

// Analytics data
export const dailyOccupancyData = [
  { time: '8 AM', occupied: 12, available: 36, away: 0 },
  { time: '9 AM', occupied: 24, available: 20, away: 4 },
  { time: '10 AM', occupied: 35, available: 8, away: 5 },
  { time: '11 AM', occupied: 40, available: 4, away: 4 },
  { time: '12 PM', occupied: 28, available: 14, away: 6 },
  { time: '1 PM', occupied: 20, available: 22, away: 6 },
  { time: '2 PM', occupied: 32, available: 12, away: 4 },
  { time: '3 PM', occupied: 38, available: 6, away: 4 },
  { time: '4 PM', occupied: 42, available: 3, away: 3 },
  { time: '5 PM', occupied: 35, available: 9, away: 4 },
  { time: '6 PM', occupied: 22, available: 22, away: 4 },
  { time: '7 PM', occupied: 14, available: 32, away: 2 },
  { time: '8 PM', occupied: 8, available: 38, away: 2 },
];

export const peakHoursData = [
  { hour: '8 AM', students: 12 },
  { hour: '9 AM', students: 28 },
  { hour: '10 AM', students: 38 },
  { hour: '11 AM', students: 44 },
  { hour: '12 PM', students: 30 },
  { hour: '1 PM', students: 22 },
  { hour: '2 PM', students: 35 },
  { hour: '3 PM', students: 41 },
  { hour: '4 PM', students: 45 },
  { hour: '5 PM', students: 36 },
  { hour: '6 PM', students: 24 },
  { hour: '7 PM', students: 15 },
  { hour: '8 PM', students: 8 },
];

export const avgStudyDurationData = [
  { dept: 'CS', duration: 3.5 },
  { dept: 'ECE', duration: 2.8 },
  { dept: 'Mech', duration: 2.2 },
  { dept: 'Civil', duration: 2.5 },
  { dept: 'BCA', duration: 3.1 },
  { dept: 'MBA', duration: 2.0 },
  { dept: 'Physics', duration: 3.8 },
];

export const weeklyUsageData = [
  { day: 'Mon', sessions: 120, hoarding: 8 },
  { day: 'Tue', sessions: 145, hoarding: 5 },
  { day: 'Wed', sessions: 162, hoarding: 3 },
  { day: 'Thu', sessions: 138, hoarding: 6 },
  { day: 'Fri', sessions: 155, hoarding: 4 },
  { day: 'Sat', sessions: 98, hoarding: 2 },
  { day: 'Sun', sessions: 72, hoarding: 1 },
];

// Librarian table data
export const librarianTableData = mockDesks
  .filter(d => d.status !== DESK_STATUS.AVAILABLE)
  .map(d => ({
    desk: d.id,
    student: d.student?.name || 'Unknown',
    rollNo: d.student?.rollNo || 'N/A',
    checkIn: d.checkInTime || 'N/A',
    status: d.status,
    dept: d.student?.dept || 'N/A',
  }));
