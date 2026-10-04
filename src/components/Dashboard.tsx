import { useEffect, useState } from 'react';
import {
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Activity,
  Thermometer,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Robot3D from './Robot3D';

interface DashboardProps {
  theme: string;
}

export default function Dashboard({ theme }: DashboardProps) {
  const [cpuUsage, setCpuUsage] = useState(67);
  const [memUsage, setMemUsage] = useState(54);
  const [netLatency, setNetLatency] = useState(12);
  const [battery, setBattery] = useState(87);
  const [temp, setTemp] = useState(42);
  const [chartData, setChartData] = useState<number[]>(
    Array.from({ length: 12 }, () => Math.random() * 80 + 20)
  );
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '[SYS] Robot Workspace v3.0.1 initialized',
    '[NET] Connection established — latency 12ms',
    '[ROBOT-01] Unit ALPHA-7 online — battery 87%',
    '[ROBOT-02] Unit BETA-3 online — battery 92%',
    '[ROBOT-03] Unit GAMMA-1 standby — battery 65%',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 50);
      setMemUsage(Math.floor(Math.random() * 20) + 45);
      setNetLatency(Math.floor(Math.random() * 15) + 8);
      setBattery((prev) => (prev > 20 ? prev - 1 : 100));
      setTemp(Math.floor(Math.random() * 10) + 38);
      setChartData((prev) => [...prev.slice(1), Math.random() * 80 + 20]);

      const messages = [
        '[SYS] Heartbeat OK — all units responding',
        '[TASK] Route recalculated for ROBOT-01',
        '[SENSOR] Ambient temperature normalized',
        '[AI] Model inference completed — 234ms',
        '[NET] Packet stream stable — 0% loss',
        '[MOTOR] Servo calibration check passed',
        '[ROBOT-02] Path optimization engaged',
      ];
      if (Math.random() > 0.5) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        setTerminalLines((prev) => [...prev.slice(-12), msg]);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'CPU Usage', value: `${cpuUsage}%`, icon: Cpu, progress: cpuUsage, color: 'var(--rw-primary)' },
    { label: 'Memory', value: `${memUsage}%`, icon: HardDrive, progress: memUsage, color: 'var(--rw-accent)' },
    { label: 'Network', value: `${netLatency}ms`, icon: Wifi, progress: (netLatency / 50) * 100, color: 'var(--rw-warning)' },
    { label: 'Battery', value: `${battery}%`, icon: Battery, progress: battery, color: 'var(--rw-success)' },
  ];

  const robots = [
    { id: 'ALPHA-7', status: 'online', task: 'Warehouse navigation', battery: 87 },
    { id: 'BETA-3', status: 'online', task: 'Package sorting', battery: 92 },
    { id: 'GAMMA-1', status: 'standby', task: 'Awaiting commands', battery: 65 },
    { id: 'DELTA-9', status: 'offline', task: 'Maintenance mode', battery: 0 },
  ];

  const alerts = [
    { type: 'warning', text: 'ROBOT-04 battery low — return to dock', time: '2 min ago' },
    { type: 'success', text: 'Firmware update completed on 3 units', time: '15 min ago' },
    { type: 'warning', text: 'Temperature spike on servo array 2', time: '32 min ago' },
    { type: 'success', text: 'All navigation paths validated', time: '1 hr ago' },
  ];

  return (
    <div className="rw-page-enter" key={theme}>
      {/* Page header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h1 className="rw-font-display fw-bold mb-1 rw-glow-text" style={{ fontSize: '1.8rem' }}>
            DASHBOARD
          </h1>
          <p className="rw-font-ui mb-0 rw-text-muted">Real-time system overview and robot fleet status</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="rw-badge rw-badge-online">
            <Activity size={14} /> Live
          </span>
          <span className="rw-font-ui rw-text-muted" style={{ fontSize: '0.85rem' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="row g-3 mb-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.label}>
              <div className="rw-card rw-card-3d rw-corners p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {stat.label}
                    </div>
                    <div className="rw-font-display fw-bold mt-1" style={{ fontSize: '1.6rem', color: stat.color }}>
                      {stat.value}
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--rw-bg-elevated)',
                      border: '1px solid var(--rw-border)',
                    }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="rw-progress">
                  <div className="rw-progress-bar" style={{ width: `${stat.progress}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content row */}
      <div className="row g-3 mb-4">
        {/* Robot preview */}
        <div className="col-12 col-lg-4">
          <div className="rw-card rw-hologram p-4 h-100 d-flex flex-column align-items-center">
            <div className="rw-font-ui d-flex align-items-center gap-2 mb-3 align-self-start">
              <Bot size={18} style={{ color: 'var(--rw-primary)' }} />
              <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Primary Unit — ALPHA-7</span>
            </div>
            <Robot3D state="idle" size="sm" />
            <div className="w-100 mt-3 d-flex justify-content-around">
              <div className="text-center">
                <Thermometer size={16} style={{ color: 'var(--rw-warning)' }} />
                <div className="rw-font-display" style={{ fontSize: '0.9rem' }}>{temp}°C</div>
                <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem' }}>Temp</div>
              </div>
              <div className="text-center">
                <Battery size={16} style={{ color: 'var(--rw-success)' }} />
                <div className="rw-font-display" style={{ fontSize: '0.9rem' }}>{battery}%</div>
                <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem' }}>Power</div>
              </div>
              <div className="text-center">
                <Activity size={16} style={{ color: 'var(--rw-primary)' }} />
                <div className="rw-font-display" style={{ fontSize: '0.9rem' }}>{cpuUsage}%</div>
                <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem' }}>Load</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity chart */}
        <div className="col-12 col-lg-8">
          <div className="rw-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="rw-font-ui fw-semibold mb-0" style={{ fontSize: '1.05rem' }}>System Activity</h3>
                <p className="rw-font-ui rw-text-muted mb-0" style={{ fontSize: '0.8rem' }}>Last 12 intervals</p>
              </div>
              <span className="rw-badge rw-badge-online">
                <Activity size={14} /> Streaming
              </span>
            </div>
            <div className="d-flex align-items-end justify-content-between gap-2" style={{ height: '180px' }}>
              {chartData.map((val, i) => (
                <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1">
                  <div
                    className="rw-chart-bar w-100"
                    style={{ height: `${val}%` }}
                  />
                  <span className="rw-font-ui rw-text-muted" style={{ fontSize: '0.65rem' }}>
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Robot fleet + alerts */}
      <div className="row g-3 mb-4">
        {/* Robot fleet */}
        <div className="col-12 col-lg-7">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>
              <Bot size={18} className="me-2" style={{ color: 'var(--rw-primary)' }} />
              Robot Fleet
            </h3>
            <div className="table-responsive">
              <table className="table align-middle" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none' }}>Unit</th>
                    <th className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none' }}>Status</th>
                    <th className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none' }}>Current Task</th>
                    <th className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none' }}>Battery</th>
                  </tr>
                </thead>
                <tbody>
                  {robots.map((robot) => (
                    <tr key={robot.id} style={{ borderColor: 'var(--rw-border)' }}>
                      <td style={{ border: 'none' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{ width: '32px', height: '32px', background: 'var(--rw-bg-elevated)', border: '1px solid var(--rw-border)' }}
                          >
                            <Bot size={16} style={{ color: 'var(--rw-primary)' }} />
                          </div>
                          <span className="rw-font-ui fw-semibold" style={{ fontSize: '0.85rem' }}>{robot.id}</span>
                        </div>
                      </td>
                      <td style={{ border: 'none' }}>
                        <span className={`rw-badge ${robot.status === 'online' ? 'rw-badge-online' : robot.status === 'standby' ? 'rw-badge-warning' : 'rw-badge-offline'}`}>
                          {robot.status}
                        </span>
                      </td>
                      <td className="rw-font-ui rw-text-muted" style={{ fontSize: '0.85rem', border: 'none' }}>{robot.task}</td>
                      <td style={{ border: 'none' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rw-progress" style={{ width: '60px' }}>
                            <div className="rw-progress-bar" style={{ width: `${robot.battery}%` }} />
                          </div>
                          <span className="rw-font-ui" style={{ fontSize: '0.75rem' }}>{robot.battery}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="col-12 col-lg-5">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>
              <AlertTriangle size={18} className="me-2" style={{ color: 'var(--rw-warning)' }} />
              Recent Alerts
            </h3>
            <div className="d-flex flex-column gap-2">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="d-flex align-items-start gap-3 p-3 rounded-3"
                  style={{ background: 'var(--rw-bg-elevated)', border: '1px solid var(--rw-border)' }}
                >
                  {alert.type === 'warning' ? (
                    <AlertTriangle size={18} style={{ color: 'var(--rw-warning)', flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <CheckCircle size={18} style={{ color: 'var(--rw-success)', flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <div className="flex-grow-1">
                    <div className="rw-font-ui" style={{ fontSize: '0.85rem' }}>{alert.text}</div>
                    <div className="rw-font-ui d-flex align-items-center gap-1 mt-1" style={{ fontSize: '0.7rem', color: 'var(--rw-text-muted)' }}>
                      <Clock size={12} /> {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="row g-3">
        <div className="col-12">
          <div className="rw-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="rw-font-ui fw-semibold mb-0" style={{ fontSize: '1.05rem' }}>
                <Activity size={18} className="me-2" style={{ color: 'var(--rw-accent)' }} />
                System Terminal
              </h3>
              <span className="rw-badge rw-badge-online">
                <div className="rounded-circle" style={{ width: '6px', height: '6px', background: 'var(--rw-success)' }} /> Active
              </span>
            </div>
            <div className="rw-terminal">
              {terminalLines.map((line, i) => (
                <div key={i} className="rw-terminal-line">
                  <span className="prompt">robot@workspace:~$</span> {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
