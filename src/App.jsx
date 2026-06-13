import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import LibrarianLayout from './layouts/LibrarianLayout';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('deskguard-theme');
    if (stored === 'dark') setDarkMode(true);
  }, []);

  const toggleDark = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('deskguard-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing darkMode={darkMode} onToggleDark={toggleDark} />} />
        <Route path="/login" element={<Login />} />

        {/* Student portal */}
        <Route
          path="/student"
          element={<StudentLayout darkMode={darkMode} onToggleDark={toggleDark} />}
        >
          <Route index element={<StudentDashboard />} />
          <Route path="map" element={<StudentDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Librarian portal */}
        <Route
          path="/librarian"
          element={<LibrarianLayout darkMode={darkMode} onToggleDark={toggleDark} />}
        >
          <Route index element={<LibrarianDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
