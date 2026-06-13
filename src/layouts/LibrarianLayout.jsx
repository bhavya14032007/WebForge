import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function LibrarianLayout({ darkMode, onToggleDark }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        role="librarian"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <Navbar
          role="librarian"
          onToggleSidebar={() => setSidebarOpen(v => !v)}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
        />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}
          id="main-content"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
