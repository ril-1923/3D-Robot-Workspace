import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Bot,
  Clock,
  Target,
  Zap,
  Activity,
  CheckCircle,
  XCircle,
  Loader,
} from 'lucide-react';

interface AnalyticsProps {
  theme: string;
}

export default function Analytics({ theme }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  const weeklyData = [45, 62, 38, 71, 55, 82, 67];
  const monthlyData = [55, 48, 62, 70, 58, 75, 80, 65, 72, 68, 85, 78];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

  const chartData = timeRange === 'day' ? weeklyData : timeRange === 'week' ? weeklyData : monthlyData;
  const chartLabels = timeRange === 'month' ? monthLabels : dayLabels;

  const kpis = [
    { label: 'Tasks Completed', value: '1,247', change: '+12.3%', up: true, icon: CheckCircle, color: 'var(--rw-success)' },
    { label: 'Avg Response Time', value: '234ms', change: '-8.1%', up: true, icon: Zap, color: 'var(--rw-primary)' },
    { label: 'Success Rate', value: '94.2%', change: '+2.4%', up: true, icon: Target, color: 'var(--rw-accent)' },
    { label: 'Failed Tasks', value: '73', change: '+15.2%', up: false, icon: XCircle, color: 'var(--rw-error)' },
  ];

  const taskDistribution = [
    { label: 'Navigation', value: 35, color: 'var(--rw-primary)' },
    { label: 'Inspection', value: 25, color: 'var(--rw-accent)' },
    { label: 'Transport', value: 20, color: 'var(--rw-warning)' },
    { label: 'Maintenance', value: 12, color: 'var(--rw-success)' },
    { label: 'Idle', value: 8, color: 'var(--rw-text-muted)' },
  ];

  const robotPerformance = [
    { id: 'ALPHA-7', tasks: 342, success: 96.5, uptime: '99.2%', efficiency: 88 },
    { id: 'BETA-3', tasks: 298, success: 93.1, uptime: '97.8%', efficiency: 82 },
    { id: 'GAMMA-1', tasks: 215, success: 91.0, uptime: '95.5%', efficiency: 75 },
    { id: 'DELTA-9', tasks: 187, success: 88.3, uptime: '92.1%', efficiency: 68 },
  ];

  const hourlyActivity = Array.from({ length: 24 }, (_, i) => {
    const peak1 = Math.exp(-Math.pow((i - 10) / 3, 2)) * 90;
    const peak2 = Math.exp(-Math.pow((i - 15) / 4, 2)) * 70;
    return Math.min(100, Math.floor(peak1 + peak2 + 10));
  });

  const maxTaskValue = Math.max(...chartData);

  return (
    <div className="rw-page-enter" key={theme}>
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h1 className="rw-font-display fw-bold mb-1 rw-glow-text" style={{ fontSize: '1.8rem' }}>
            ANALYTICS
          </h1>
          <p className="rw-font-ui mb-0 rw-text-muted">Performance insights and task analytics across your robot fleet</p>
        </div>
        <div className="d-flex gap-1 p-1 rounded-3" style={{ background: 'var(--rw-bg-card)', border: '1px solid var(--rw-border)' }}>
          {(['day', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className="rw-font-ui"
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: timeRange === range ? 'var(--rw-primary)' : 'transparent',
                color: timeRange === range ? 'var(--rw-bg-dark)' : 'var(--rw-text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div className="col-12 col-sm-6 col-xl-3" key={kpi.label}>
              <div className="rw-card rw-card-3d p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'var(--rw-bg-elevated)',
                      border: '1px solid var(--rw-border)',
                    }}
                  >
                    <Icon size={22} style={{ color: kpi.color }} />
                  </div>
                  <div className="d-flex align-items-center gap-1" style={{ color: kpi.up ? 'var(--rw-success)' : 'var(--rw-error)', fontSize: '0.8rem' }}>
                    {kpi.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="rw-font-ui fw-semibold">{kpi.change}</span>
                  </div>
                </div>
                <div className="rw-font-display fw-bold" style={{ fontSize: '1.5rem', color: 'var(--rw-text)' }}>
                  {kpi.value}
                </div>
                <div className="rw-font-ui rw-text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {kpi.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main chart + task distribution */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-8">
          <div className="rw-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="rw-font-ui fw-semibold mb-0" style={{ fontSize: '1.05rem' }}>Task Completion Trend</h3>
                <p className="rw-font-ui rw-text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                  {timeRange === 'day' ? 'Hourly' : timeRange === 'week' ? 'Daily' : 'Weekly'} breakdown
                </p>
              </div>
              <span className="rw-badge rw-badge-online">
                <Activity size={14} /> Updated
              </span>
            </div>
            <div className="d-flex align-items-end justify-content-between gap-2" style={{ height: '220px' }}>
              {chartData.map((val, i) => (
                <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-1 h-100 justify-content-end">
                  <span className="rw-font-ui" style={{ fontSize: '0.65rem', color: 'var(--rw-accent)', marginBottom: '2px' }}>
                    {val}
                  </span>
                  <div
                    className="rw-chart-bar w-100"
                    style={{ height: `${(val / maxTaskValue) * 100}%` }}
                  />
                  <span className="rw-font-ui rw-text-muted" style={{ fontSize: '0.65rem' }}>
                    {chartLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task distribution */}
        <div className="col-12 col-lg-4">
          <div className="rw-card p-4 h-100">
            <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>
              <Target size={18} className="me-2" style={{ color: 'var(--rw-primary)' }} />
              Task Distribution
            </h3>
            {/* Donut chart (CSS) */}
            <div className="d-flex justify-content-center my-3">
              <div
                className="position-relative rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '160px',
                  height: '160px',
                  background: `conic-gradient(
                    var(--rw-primary) 0% 35%,
                    var(--rw-accent) 35% 60%,
                    var(--rw-warning) 60% 80%,
                    var(--rw-success) 80% 92%,
                    var(--rw-text-muted) 92% 100%
                  )`,
                }}
              >
                <div
                  className="rounded-circle d-flex flex-column align-items-center justify-content-center"
                  style={{ width: '110px', height: '110px', background: 'var(--rw-bg-card)' }}
                >
                  <span className="rw-font-display fw-bold" style={{ fontSize: '1.4rem', color: 'var(--rw-primary)' }}>1,247</span>
                  <span className="rw-font-ui rw-text-muted" style={{ fontSize: '0.7rem' }}>Total Tasks</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              {taskDistribution.map((task) => (
                <div key={task.label} className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle" style={{ width: '10px', height: '10px', background: task.color }} />
                    <span className="rw-font-ui" style={{ fontSize: '0.8rem' }}>{task.label}</span>
                  </div>
                  <span className="rw-font-ui fw-semibold" style={{ fontSize: '0.8rem', color: 'var(--rw-text-muted)' }}>
                    {task.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly activity heatmap + robot performance */}
      <div className="row g-3 mb-4">
        {/* 24h activity */}
        <div className="col-12">
          <div className="rw-card p-4">
            <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>
              <Clock size={18} className="me-2" style={{ color: 'var(--rw-accent)' }} />
              24-Hour Activity Heatmap
            </h3>
            <div className="d-flex gap-1 flex-wrap" style={{ gap: '3px' }}>
              {hourlyActivity.map((val, i) => {
                const opacity = val / 100;
                return (
                  <div
                    key={i}
                    className="d-flex flex-column align-items-center"
                    style={{ flex: '1 1 auto', minWidth: '30px' }}
                  >
                    <div
                      className="rounded"
                      style={{
                        width: '100%',
                        height: '40px',
                        background: `var(--rw-primary)`,
                        opacity: 0.1 + opacity * 0.9,
                        transition: 'all 0.3s ease',
                      }}
                      title={`${val}% activity`}
                    />
                    <span className="rw-font-ui mt-1" style={{ fontSize: '0.6rem', color: 'var(--rw-text-muted)' }}>
                      {i}h
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Robot performance table */}
      <div className="row g-3">
        <div className="col-12">
          <div className="rw-card p-4">
            <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1.05rem' }}>
              <Bot size={18} className="me-2" style={{ color: 'var(--rw-primary)' }} />
              Robot Performance Comparison
            </h3>
            <div className="table-responsive">
              <table className="table align-middle" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    {['Unit', 'Tasks', 'Success Rate', 'Uptime', 'Efficiency', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="rw-font-ui rw-text-muted"
                        style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {robotPerformance.map((robot) => (
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
                      <td className="rw-font-ui" style={{ fontSize: '0.85rem', border: 'none' }}>{robot.tasks}</td>
                      <td style={{ border: 'none' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rw-progress" style={{ width: '60px' }}>
                            <div className="rw-progress-bar" style={{ width: `${robot.success}%` }} />
                          </div>
                          <span className="rw-font-ui" style={{ fontSize: '0.8rem' }}>{robot.success}%</span>
                        </div>
                      </td>
                      <td className="rw-font-ui" style={{ fontSize: '0.85rem', border: 'none' }}>{robot.uptime}</td>
                      <td style={{ border: 'none' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rw-progress" style={{ width: '80px' }}>
                            <div className="rw-progress-bar" style={{ width: `${robot.efficiency}%` }} />
                          </div>
                          <span className="rw-font-ui" style={{ fontSize: '0.8rem' }}>{robot.efficiency}%</span>
                        </div>
                      </td>
                      <td style={{ border: 'none' }}>
                        {robot.efficiency > 80 ? (
                          <span className="rw-badge rw-badge-online">
                            <CheckCircle size={12} /> Optimal
                          </span>
                        ) : robot.efficiency > 70 ? (
                          <span className="rw-badge rw-badge-warning">
                            <Loader size={12} /> Active
                          </span>
                        ) : (
                          <span className="rw-badge rw-badge-offline">
                            <XCircle size={12} /> Needs Attention
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
