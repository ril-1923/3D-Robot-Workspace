import { useState, useEffect, useRef } from 'react';
import {
  Power,
  Hand,
  Mic,
  Volume2,
  Crosshair,
  Navigation,
  RotateCw,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  StopCircle,
  Cpu,
  Gauge,
  Eye,
  Radar as RadarIcon,
} from 'lucide-react';
import Robot3D from './Robot3D';

interface ControlProps {
  theme: string;
}

type RobotState = 'idle' | 'wave' | 'speaking';

export default function RobotControl({ theme }: ControlProps) {
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [powerOn, setPowerOn] = useState(true);
  const [speed, setSpeed] = useState(60);
  const [sensitivity, setSensitivity] = useState(75);
  const [volume, setVolume] = useState(50);
  const [visionRange, setVisionRange] = useState(80);
  const [selectedUnit, setSelectedUnit] = useState('ALPHA-7');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    `[CTRL] Control interface connected to ${selectedUnit}`,
    '[CTRL] All systems nominal — ready for commands',
  ]);
  const [radarDots, setRadarDots] = useState<{ x: number; y: number }[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const units = ['ALPHA-7', 'BETA-3', 'GAMMA-1', 'DELTA-9'];

  useEffect(() => {
    setTerminalLines((prev) => [
      ...prev,
      `[CTRL] Switched to unit ${selectedUnit}`,
    ]);
  }, [selectedUnit]);

  useEffect(() => {
    // Generate radar dots
    const interval = setInterval(() => {
      setRadarDots(
        Array.from({ length: 3 }, () => ({
          x: Math.random() * 160 + 20,
          y: Math.random() * 160 + 20,
        }))
      );
    }, 3000);
    setRadarDots(
      Array.from({ length: 3 }, () => ({
        x: Math.random() * 160 + 20,
        y: Math.random() * 160 + 20,
      }))
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const addLog = (msg: string) => {
    setTerminalLines((prev) => [...prev.slice(-15), `[CMD] ${msg}`]);
  };

  const handleAction = (action: string, state?: RobotState) => {
    if (!powerOn) return;
    if (state) {
      setRobotState(state);
      setTimeout(() => setRobotState('idle'), state === 'wave' ? 1500 : 3000);
    }
    addLog(action);
  };

  const handlePower = () => {
    const newPower = !powerOn;
    setPowerOn(newPower);
    setRobotState(newPower ? 'idle' : 'idle');
    addLog(newPower ? 'Power ON — systems initializing...' : 'Power OFF — shutting down...');
  };

  const sliders = [
    { label: 'Movement Speed', value: speed, set: setSpeed, icon: Gauge, unit: '%' },
    { label: 'Sensor Sensitivity', value: sensitivity, set: setSensitivity, icon: Cpu, unit: '%' },
    { label: 'Audio Volume', value: volume, set: setVolume, icon: Volume2, unit: '%' },
    { label: 'Vision Range', value: visionRange, set: setVisionRange, icon: Eye, unit: 'm' },
  ];

  const dPadActions = [
    { icon: ChevronUp, label: 'Forward', cmd: 'Move forward 1m' },
    { icon: ChevronDown, label: 'Backward', cmd: 'Move backward 1m' },
    { icon: ChevronLeft, label: 'Left', cmd: 'Turn left 15°' },
    { icon: ChevronRight, label: 'Right', cmd: 'Turn right 15°' },
  ];

  return (
    <div className="rw-page-enter" key={theme}>
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h1 className="rw-font-display fw-bold mb-1 rw-glow-text" style={{ fontSize: '1.8rem' }}>
            ROBOT CONTROL
          </h1>
          <p className="rw-font-ui mb-0 rw-text-muted">Direct pilot interface — command and monitor your robot in real time</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Unit selector */}
          <select
            className="rw-input"
            style={{ width: 'auto' }}
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            {units.map((u) => (
              <option key={u} value={u} style={{ background: 'var(--rw-bg-card)' }}>
                {u}
              </option>
            ))}
          </select>
          {/* Power */}
          <button
            className="rw-btn d-flex align-items-center gap-2"
            onClick={handlePower}
            style={{
              borderColor: powerOn ? 'var(--rw-success)' : 'var(--rw-error)',
              color: powerOn ? 'var(--rw-success)' : 'var(--rw-error)',
            }}
          >
            <Power size={18} />
            {powerOn ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>
      </div>

      <div className="row g-3">
        {/* Robot stage */}
        <div className="col-12 col-lg-5">
          <div className="rw-card rw-hologram p-4 h-100 d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-between align-items-center mb-2">
              <span className="rw-font-ui fw-semibold" style={{ fontSize: '0.9rem' }}>
                {selectedUnit}
              </span>
              <span className={`rw-badge ${powerOn ? 'rw-badge-online' : 'rw-badge-offline'}`}>
                {powerOn ? 'Online' : 'Offline'}
              </span>
            </div>

            <div style={{ opacity: powerOn ? 1 : 0.3, filter: powerOn ? 'none' : 'grayscale(1)', transition: 'all 0.5s ease' }}>
              <Robot3D state={robotState} size="md" />
            </div>

            {/* Quick action buttons */}
            <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
              <button
                className="rw-btn d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                onClick={() => handleAction('Robot waving greeting', 'wave')}
                disabled={!powerOn}
              >
                <Hand size={16} /> Wave
              </button>
              <button
                className="rw-btn d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                onClick={() => handleAction('Voice module activated — speaking...', 'speaking')}
                disabled={!powerOn}
              >
                <Mic size={16} /> Speak
              </button>
              <button
                className="rw-btn d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                onClick={() => handleAction('Scanning environment...')}
                disabled={!powerOn}
              >
                <Crosshair size={16} /> Scan
              </button>
            </div>

            {/* Radar */}
            <div className="mt-4 w-100 d-flex flex-column align-items-center">
              <div className="rw-font-ui rw-text-muted mb-2 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                <RadarIcon size={14} /> Proximity Radar
              </div>
              <div className="rw-radar" style={{ opacity: powerOn ? 1 : 0.3 }}>
                <div className="rw-radar-sweep" />
                {radarDots.map((dot, i) => (
                  <div
                    key={i}
                    className="rw-radar-dot"
                    style={{ left: `${dot.x}px`, top: `${dot.y}px` }}
                  />
                ))}
                {/* Crosshair lines */}
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--rw-border)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--rw-border)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: controls + terminal */}
        <div className="col-12 col-lg-7">
          <div className="d-flex flex-column gap-3">
            {/* D-Pad + Sliders */}
            <div className="row g-3">
              {/* D-Pad */}
              <div className="col-12 col-md-5">
                <div className="rw-card rw-corners p-4 h-100">
                  <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1rem' }}>
                    <Navigation size={18} className="me-2" style={{ color: 'var(--rw-primary)' }} />
                    Movement Control
                  </h3>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <DPadButton icon={ChevronUp} onClick={() => handleAction(dPadActions[0].cmd)} disabled={!powerOn} />
                    <div className="d-flex gap-2">
                      <DPadButton icon={RotateCcw} onClick={() => handleAction('Rotate counter-clockwise 45°')} disabled={!powerOn} small />
                      <DPadButton icon={ChevronLeft} onClick={() => handleAction(dPadActions[2].cmd)} disabled={!powerOn} />
                      <DPadButton icon={StopCircle} onClick={() => handleAction('STOP — all movement halted')} disabled={!powerOn} danger />
                      <DPadButton icon={ChevronRight} onClick={() => handleAction(dPadActions[3].cmd)} disabled={!powerOn} />
                      <DPadButton icon={RotateCw} onClick={() => handleAction('Rotate clockwise 45°')} disabled={!powerOn} small />
                    </div>
                    <DPadButton icon={ChevronDown} onClick={() => handleAction(dPadActions[1].cmd)} disabled={!powerOn} />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="col-12 col-md-7">
                <div className="rw-card p-4 h-100">
                  <h3 className="rw-font-ui fw-semibold mb-3" style={{ fontSize: '1rem' }}>
                    <Cpu size={18} className="me-2" style={{ color: 'var(--rw-primary)' }} />
                    Parameter Tuning
                  </h3>
                  <div className="d-flex flex-column gap-3">
                    {sliders.map((slider) => {
                      const Icon = slider.icon;
                      return (
                        <div key={slider.label}>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="rw-font-ui d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                              <Icon size={16} style={{ color: 'var(--rw-primary)' }} />
                              {slider.label}
                            </span>
                            <span className="rw-font-display" style={{ fontSize: '0.85rem', color: 'var(--rw-accent)' }}>
                              {slider.value}{slider.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            className="rw-slider"
                            min={0}
                            max={100}
                            value={slider.value}
                            onChange={(e) => slider.set(Number(e.target.value))}
                            disabled={!powerOn}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="rw-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="rw-font-ui fw-semibold mb-0" style={{ fontSize: '1rem' }}>
                  <Volume2 size={18} className="me-2" style={{ color: 'var(--rw-accent)' }} />
                  Command Log
                </h3>
                <button
                  className="rw-btn"
                  style={{ fontSize: '0.7rem', padding: '0.3rem 0.7rem' }}
                  onClick={() => setTerminalLines([])}
                >
                  Clear
                </button>
              </div>
              <div className="rw-terminal" ref={terminalRef} style={{ height: '200px' }}>
                {terminalLines.length === 0 ? (
                  <div className="rw-terminal-line rw-text-muted">— log cleared —</div>
                ) : (
                  terminalLines.map((line, i) => (
                    <div key={i} className="rw-terminal-line">
                      <span className="prompt">pilot@control:~$</span> {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DPadButton({
  icon: Icon,
  onClick,
  disabled,
  danger,
  small,
}: {
  icon: typeof ChevronUp;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  small?: boolean;
}) {
  const size = small ? 36 : 48;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="d-flex align-items-center justify-content-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '10px',
        background: danger ? 'rgba(255,61,113,0.1)' : 'var(--rw-bg-elevated)',
        border: `1px solid ${danger ? 'var(--rw-error)' : 'var(--rw-border)'}`,
        color: danger ? 'var(--rw-error)' : 'var(--rw-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = danger ? 'rgba(255,61,113,0.2)' : 'var(--rw-primary-glow)';
          e.currentTarget.style.boxShadow = `0 0 15px ${danger ? 'rgba(255,61,113,0.3)' : 'var(--rw-primary-glow)'}`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = danger ? 'rgba(255,61,113,0.1)' : 'var(--rw-bg-elevated)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Icon size={small ? 18 : 22} />
    </button>
  );
}
