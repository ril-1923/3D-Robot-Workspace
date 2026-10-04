import { useState, useEffect, useMemo } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import Sidebar, { type PageId } from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import RobotControl from '@/components/RobotControl';
import Analytics from '@/components/Analytics';
import SettingsPage from '@/components/SettingsPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [theme, setTheme] = useState('blue');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const pageTitles: Record<PageId, string> = {
    dashboard: 'Dashboard',
    control: 'Robot Control',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${10 + Math.random() * 10}s`,
      })),
    []
  );

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard theme={theme} />;
      case 'control':
        return <RobotControl theme={theme} />;
      case 'analytics':
        return <Analytics theme={theme} />;
      case 'settings':
        return <SettingsPage theme={theme} onThemeChange={setTheme} />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--rw-bg-dark)' }}>
      {/* Animated background */}
      <div className="rw-bg-grid" />
      <div className="rw-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="rw-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="position-relative" style={{ zIndex: 1, marginLeft: '0' }}>
        <div className="d-lg-block" style={{ paddingLeft: '260px' }}>
          {/* Top bar */}
          <div className="rw-topbar position-sticky top-0 d-flex align-items-center justify-content-between px-3 px-md-4 py-3" style={{ zIndex: 900 }}>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-sm d-lg-none p-0"
                onClick={() => setSidebarOpen(true)}
                style={{ color: 'var(--rw-text)' }}
              >
                <Menu size={24} />
              </button>
              <div className="d-none d-md-flex align-items-center gap-2 rw-card px-3 py-2" style={{ borderRadius: '10px' }}>
                <Search size={16} style={{ color: 'var(--rw-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search robots, tasks..."
                  className="rw-font-ui border-0 bg-transparent"
                  style={{
                    color: 'var(--rw-text)',
                    outline: 'none',
                    width: '200px',
                    fontSize: '0.85rem',
                  }}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* Notifications */}
              <div className="position-relative" style={{ cursor: 'pointer' }} onClick={() => setNotifications(0)}>
                <Bell size={22} style={{ color: 'var(--rw-text-muted)' }} />
                {notifications > 0 && (
                  <span
                    className="position-absolute d-flex align-items-center justify-content-center rw-font-ui"
                    style={{
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--rw-error)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                    }}
                  >
                    {notifications}
                  </span>
                )}
              </div>

              {/* User avatar */}
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'linear-gradient(135deg, var(--rw-primary), var(--rw-secondary))',
                  boxShadow: '0 0 15px var(--rw-primary-glow)',
                }}
              >
                <User size={20} color="var(--rw-bg-dark)" />
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="p-3 p-md-4">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
