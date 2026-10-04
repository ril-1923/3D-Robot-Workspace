import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Settings,
  Zap,
  X,
} from 'lucide-react';

export type PageId = 'dashboard' | 'control' | 'analytics' | 'settings';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard; desc: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'System Overview' },
  { id: 'control', label: 'Robot Control', icon: Bot, desc: 'Pilot Interface' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Data Insights' },
  { id: 'settings', label: 'Settings', icon: Settings, desc: 'Configuration' },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 999 }}
          onClick={onClose}
        />
      )}

      <aside
        className={`rw-sidebar position-fixed d-flex flex-column ${isOpen ? 'open' : ''}`}
        style={{ width: '260px' }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom" style={{ borderColor: 'var(--rw-border)' }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--rw-primary), var(--rw-secondary))',
                boxShadow: '0 0 20px var(--rw-primary-glow)',
              }}
            >
              <Zap size={22} color="var(--rw-bg-dark)" />
            </div>
            <div>
              <div className="rw-font-display fw-bold" style={{ fontSize: '1rem', color: 'var(--rw-text)' }}>
                ROBOTWORKS
              </div>
              <div className="rw-font-ui" style={{ fontSize: '0.7rem', color: 'var(--rw-text-muted)' }}>
                v3.0.1
              </div>
            </div>
          </div>
          <button className="btn btn-sm d-lg-none p-0" onClick={onClose} style={{ color: 'var(--rw-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow-1 p-3">
          <div className="rw-font-ui mb-2" style={{ fontSize: '0.7rem', color: 'var(--rw-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <div
                key={item.id}
                className={`rw-nav-item ${active ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
              >
                <Icon size={20} />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Status footer */}
        <div className="p-3 border-top" style={{ borderColor: 'var(--rw-border)' }}>
          <div className="rw-card p-3" style={{ borderRadius: '12px' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="rounded-circle"
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--rw-success)',
                  boxShadow: '0 0 8px var(--rw-success)',
                  animation: 'rw-antenna-pulse 2s infinite',
                }}
              />
              <span className="rw-font-ui" style={{ fontSize: '0.75rem', color: 'var(--rw-success)' }}>
                All Systems Online
              </span>
            </div>
            <div className="rw-font-ui" style={{ fontSize: '0.7rem', color: 'var(--rw-text-muted)' }}>
              4 robots connected
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
