# 🛡️ DeskGuard — Smart Library Seat Booking & Anti-Hoarding Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer)](https://www.framer.com/motion)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vite.dev)

> A hackathon prototype built for **Manipal University Jaipur** — solving the universal problem of library desk hoarding.

---

## 📌 Chosen Vertical

**EdTech / Campus Management** — Smart library resource allocation using QR-based presence tracking.

---

## 🎯 Problem Statement

Students reserve library seats early in the morning by leaving their belongings, but then disappear for hours — leaving the seat "occupied" but empty. This leaves genuinely studying students without seats, especially during exam season.

**DeskGuard** solves this by:
1. Requiring active QR-based check-ins
2. Tracking presence with periodic verification
3. Automatically releasing abandoned seats
4. Giving librarians full visibility and control

---

## 🏗️ Approach & Architecture

### Frontend-Only Prototype (No Backend Required)
This prototype uses **mock data** to simulate all real-time features. The architecture is designed so a backend can be swapped in with minimal changes.

### Tech Stack
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 6 | Build tool |
| Tailwind CSS | v4 | Utility-first styling |
| @tailwindcss/vite | - | Tailwind Vite plugin |
| React Router DOM | 6 | Client-side routing |
| Framer Motion | 11 | Animations & transitions |
| Lucide React | - | Icon library |
| Recharts | 2 | Data visualization |

---

## 🗺️ How the Solution Works

### User Flows

```
Student → Scans QR Code on Desk
       → Checks in via browser
       → Studies (system tracks session)
       → Receives presence verification ping
       → Responds → Session continues
       → Doesn't respond → Desk released after grace period

Librarian → Monitors live dashboard
         → Sees all desk statuses in real time
         → Can manually reset / release desks
         → Views analytics and usage trends
```

### Desk States
| State | Color | Meaning |
|---|---|---|
| 🟢 Available | Green | Desk is free to claim |
| 🔴 Occupied | Red | Student actively studying |
| 🟡 Away | Yellow | Student on short break |
| 🟣 Abandoned | Purple | No response to verification |

### Pages
1. **Landing** — Hero, features, how-it-works, testimonials, CTA, footer
2. **Login** — Student / Librarian tabs with college illustration
3. **Student Dashboard** — SVG library map (48 desks), session card, occupancy summary
4. **Librarian Dashboard** — Admin metrics, searchable/filterable occupancy table
5. **Analytics** — 4 Recharts: Daily Occupancy, Peak Hours, Study Duration, Weekly Trend
6. **Profile** — Student info, stats, history table, weekly mini bar chart
7. **Notifications** — Categorized alerts with filter, dismiss, and mark-read

---

## 🧠 Assumptions Made

1. The library has exactly **48 desks** across **3 sections (A, B, C)**
2. QR stickers are pre-printed and placed on each desk by staff
3. Students use their personal phones — no app download required
4. Session max duration is **2 hours** with optional extension
5. Away mode grace period is **30 minutes**
6. The system sends verification checks **every 45 minutes**
7. All authentication is university email + password (no SSO in prototype)
8. No backend/API calls — all data is mocked locally

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/deskguard.git
cd deskguard

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Demo Routes
| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Student / Librarian login |
| `/student` | Student dashboard with map |
| `/student/analytics` | Usage analytics |
| `/student/profile` | Student profile |
| `/student/notifications` | Notifications |
| `/librarian` | Librarian admin dashboard |
| `/librarian/analytics` | Library analytics |

---

## 📁 Project Structure

```
src/
├── data/
│   └── mockData.js          # All mock students, desks, sessions, analytics
├── components/
│   ├── Navbar.jsx            # Top navbar with notifications & profile
│   ├── Sidebar.jsx           # Collapsible sidebar navigation
│   ├── StatusBadge.jsx       # Colored status indicator chips
│   ├── OccupancyCard.jsx     # Animated stat card with progress bar
│   ├── AnalyticsCard.jsx     # Metric summary card
│   ├── UserProfileCard.jsx   # Student profile display card
│   ├── NotificationItem.jsx  # Individual notification with icon
│   └── Modal.jsx             # Accessible modal overlay
├── layouts/
│   ├── StudentLayout.jsx     # Student portal layout wrapper
│   └── LibrarianLayout.jsx   # Librarian portal layout wrapper
├── pages/
│   ├── Landing.jsx           # Public landing page
│   ├── Login.jsx             # Auth page (student/librarian tabs)
│   ├── StudentDashboard.jsx  # Main student view with SVG map
│   ├── LibrarianDashboard.jsx# Admin occupancy management
│   ├── Analytics.jsx         # Recharts data visualization
│   ├── Profile.jsx           # Student profile & history
│   └── Notifications.jsx     # Notification center
├── App.jsx                   # Router + dark mode state
├── main.jsx                  # React entry point
└── index.css                 # Global CSS + design system
```

---

## 🎨 Design System

- **Primary**: `#2563EB` (Blue)
- **Success/Available**: `#22C55E` (Green)
- **Occupied**: `#EF4444` (Red)
- **Away**: `#F59E0B` (Amber)
- **Background**: White / `#F8FAFC` light gray
- **Dark mode**: Full support via `data-theme="dark"` + CSS variables
- **Typography**: Inter (Google Fonts)
- **Spacing**: 8px grid system
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)

---

## ♿ Accessibility

- Semantic HTML5 elements throughout
- ARIA roles and labels on interactive elements
- Keyboard navigation support (focusable desks, modals)
- `prefers-reduced-motion` respected
- Sufficient color contrast ratios
- Skip-to-content ready structure

---

## 🔮 Future Roadmap

- [ ] Real backend (Node.js + PostgreSQL)
- [ ] WebSocket-based real-time updates
- [ ] RFID/NFC card integration
- [ ] Mobile-first PWA with push notifications
- [ ] University SSO / OAuth2 authentication
- [ ] Multi-floor / multi-building support
- [ ] Analytics export (PDF/CSV)
- [ ] Admin roles & permissions management

---

## 👥 Team

Built with ❤️ for the **MUJ Hackathon 2026**.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

> **GitHub Repository**: [github.com/yourusername/deskguard](https://github.com/yourusername/deskguard)
