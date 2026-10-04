import { useState } from 'react';
import {
  Palette,
  Bell,
  Shield,
  Database,
  User,
  Save,
  Download,
  Trash2,
  RefreshCw,
  Volume2,
  Eye,
  Lock,
  Globe,
  Cpu,
} from 'lucide-react';

interface SettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'blue', label: 'Cyber Blue', color: '#00d4ff' },
  { id: 'green', label: 'Matrix Green', color: '#00ff88' },
  { id: 'orange', label: 'Solar Orange', color: '#ff8a3d' },
  { id: 'crimson', label: 'Crimson Red', color: '#ff3d71' },
  { id: 'gold', label: 'Golden', color: '#ffd600' },
];

export default function Settings({ theme, onThemeChange }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [voiceCommands, setVoiceCommands] = useState(false);
  const [telemetry, setTelemetry] = useState(true);
  const [autoDock, setAutoDock] = useState(true);

  const [robotName, setRobotName] = useState('ALPHA-7');
  const [operatorName, setOperatorName] = useState('Operator');
  const [language, setLanguage] = useState('English');
  const [maxSpeed, setMaxSpeed] = useState(80);

  const toggles = [
    { label: 'Push Notifications', desc: 'Receive alerts for critical events', icon: Bell, value: notifications, set: setNotifications },
    { label: 'Auto Firmware Update', desc: 'Automatically install robot updates', icon: RefreshCw, value: autoUpdate, set: setAutoUpdate },
    { label: 'Voice Commands', desc: 'Enable microphone-based control', icon: Volume2, value: voiceCommands, set: setVoiceCommands },
    { label: 'Telemetry Sharing', desc: 'Send anonymous usage data', icon: Globe, value: telemetry, set: setTelemetry },
    { label: 'Auto Return to Dock', desc: 'Robots return when battery < 20%', icon: Cpu, value: autoDock, set: setAutoDock },
  ];

  return (
    <div className="rw-page-enter" key={theme}>
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h1 className="rw-font-display fw-bold mb-1 rw-glow-text" style={{ fontSize: '1.8rem' }}>
            SETTINGS
          </h1>
          <p className="rw-font-ui mb-0 rw-text-muted">Configure your workspace, robot parameters, and preferences</p>
        </div>
        <button className="rw-btn rw-btn-solid d-flex align-items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="row g-3">
        {/* Theme selection */}
        <div className="col-12 col-lg-6">
          <div className="rw-card rw-corners p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
              <Palette size={18} style={{ color: 'var(--rw-primary)' }} />
              Appearance & Theme
            </h3>
            <p className="rw-font-ui rw-text-muted mb-4" style={{ fontSize: '0.8rem' }}>
              Choose your workspace color scheme. Each theme changes the entire interface.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              {themes.map((t) => (
                <div
                  key={t.id}
                  className="d-flex flex-column align-items-center gap-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onThemeChange(t.id)}
                >
                  <div
                    className={`rw-theme-dot ${theme === t.id ? 'active' : ''}`}
                    style={{ background: t.color, color: t.color, width: '40px', height: '40px' }}
                  />
                  <span className="rw-font-ui" style={{ fontSize: '0.7rem', color: theme === t.id ? 'var(--rw-text)' : 'var(--rw-text-muted)' }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dark mode toggle */}
            <div className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-2" style={{ background: 'var(--rw-bg-elevated)', border: '1px solid var(--rw-border)' }}>
              <div className="d-flex align-items-center gap-3">
                <Eye size={20} style={{ color: 'var(--rw-primary)' }} />
                <div>
                  <div className="rw-font-ui fw-semibold" style={{ fontSize: '0.85rem' }}>Dark Mode</div>
                  <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.75rem' }}>Optimized for low-light environments</div>
                </div>
              </div>
              <div className={`rw-toggle ${darkMode ? 'on' : ''}`} onClick={() => setDarkMode(!darkMode)} />
            </div>
          </div>
        </div>

        {/* Profile config */}
        <div className="col-12 col-lg-6">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
              <User size={18} style={{ color: 'var(--rw-primary)' }} />
              Profile Configuration
            </h3>
            <p className="rw-font-ui rw-text-muted mb-4" style={{ fontSize: '0.8rem' }}>
              Set your operator identity and robot designation.
            </p>

            <div className="d-flex flex-column gap-3">
              <div>
                <label className="rw-font-ui rw-text-muted mb-1 d-block" style={{ fontSize: '0.8rem' }}>Operator Name</label>
                <input
                  type="text"
                  className="rw-input"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                />
              </div>
              <div>
                <label className="rw-font-ui rw-text-muted mb-1 d-block" style={{ fontSize: '0.8rem' }}>Default Robot Name</label>
                <input
                  type="text"
                  className="rw-input"
                  value={robotName}
                  onChange={(e) => setRobotName(e.target.value)}
                />
              </div>
              <div>
                <label className="rw-font-ui rw-text-muted mb-1 d-block" style={{ fontSize: '0.8rem' }}>Interface Language</label>
                <select
                  className="rw-input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'].map((lang) => (
                    <option key={lang} value={lang} style={{ background: 'var(--rw-bg-card)' }}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <label className="rw-font-ui rw-text-muted" style={{ fontSize: '0.8rem' }}>Max Robot Speed</label>
                  <span className="rw-font-display" style={{ fontSize: '0.85rem', color: 'var(--rw-accent)' }}>{maxSpeed}%</span>
                </div>
                <input
                  type="range"
                  className="rw-slider"
                  min={10}
                  max={100}
                  value={maxSpeed}
                  onChange={(e) => setMaxSpeed(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System toggles */}
        <div className="col-12 col-lg-7">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
              <Shield size={18} style={{ color: 'var(--rw-primary)' }} />
              System Preferences
            </h3>
            <p className="rw-font-ui rw-text-muted mb-3" style={{ fontSize: '0.8rem' }}>
              Enable or disable workspace features and behaviors.
            </p>
            <div className="d-flex flex-column gap-2">
              {toggles.map((toggle) => {
                const Icon = toggle.icon;
                return (
                  <div
                    key={toggle.label}
                    className="d-flex justify-content-between align-items-center p-3 rounded-3"
                    style={{ background: 'var(--rw-bg-elevated)', border: '1px solid var(--rw-border)' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Icon size={20} style={{ color: 'var(--rw-primary)' }} />
                      <div>
                        <div className="rw-font-ui fw-semibold" style={{ fontSize: '0.85rem' }}>{toggle.label}</div>
                        <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.75rem' }}>{toggle.desc}</div>
                      </div>
                    </div>
                    <div
                      className={`rw-toggle ${toggle.value ? 'on' : ''}`}
                      onClick={() => toggle.set(!toggle.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data management */}
        <div className="col-12 col-lg-5">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-1 d-flex align-items-center gap-2" style={{ fontSize: '1.05rem' }}>
              <Database size={18} style={{ color: 'var(--rw-primary)' }} />
              Data Management
            </h3>
            <p className="rw-font-ui rw-text-muted mb-3" style={{ fontSize: '0.8rem' }}>
              Export, refresh, or purge your workspace data.
            </p>

            <div className="d-flex flex-column gap-2">
              <button className="rw-btn d-flex align-items-center gap-2 justify-content-center" style={{ width: '100%' }}>
                <Download size={18} /> Export Telemetry Data
              </button>
              <button className="rw-btn d-flex align-items-center gap-2 justify-content-center" style={{ width: '100%' }}>
                <RefreshCw size={18} /> Sync Robot Fleet
              </button>
              <button className="rw-btn d-flex align-items-center gap-2 justify-content-center" style={{ width: '100%', borderColor: 'var(--rw-warning)', color: 'var(--rw-warning)' }}>
                <Lock size={18} /> Reset All Configurations
              </button>
              <button
                className="rw-btn d-flex align-items-center gap-2 justify-content-center"
                style={{ width: '100%', borderColor: 'var(--rw-error)', color: 'var(--rw-error)' }}
              >
                <Trash2 size={18} /> Purge All Data
              </button>
            </div>

            {/* Storage indicator */}
            <div className="mt-4 p-3 rounded-3" style={{ background: 'var(--rw-bg-elevated)', border: '1px solid var(--rw-border)' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="rw-font-ui rw-text-muted" style={{ fontSize: '0.8rem' }}>Storage Used</span>
                <span className="rw-font-ui" style={{ fontSize: '0.8rem' }}>4.2 GB / 10 GB</span>
              </div>
              <div className="rw-progress">
                <div className="rw-progress-bar" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-4 text-center">
        <p className="rw-font-ui rw-text-muted" style={{ fontSize: '0.8rem' }}>
          RobotWorks v3.0.1 — Built with HTML5, CSS3, JavaScript, Bootstrap 5, and React
        </p>
      </div>
    </div>
  );
}
