interface Robot3DProps {
  state?: 'idle' | 'wave' | 'speaking';
  size?: 'sm' | 'md' | 'lg';
}

export default function Robot3D({ state = 'idle', size = 'md' }: Robot3DProps) {
  const scaleClass =
    size === 'sm' ? 'rw-robot-sm' : size === 'lg' ? 'rw-robot-lg' : '';

  const stateClass =
    state === 'wave' ? 'wave' : state === 'speaking' ? 'speaking' : '';

  return (
    <div className="rw-robot-stage">
      <div className={`rw-robot ${stateClass} ${scaleClass}`}>
        {/* Head */}
        <div className="rw-robot-head">
          <div className="rw-robot-antenna" />
          <div className="rw-robot-eye left" />
          <div className="rw-robot-eye right" />
          <div className="rw-robot-mouth" />
        </div>

        {/* Neck */}
        <div className="rw-robot-neck" />

        {/* Body */}
        <div className="rw-robot-body">
          <div className="rw-robot-chest-light" />
          <div className="rw-robot-body-panel">
            <div className="rw-robot-led" />
            <div className="rw-robot-led" />
            <div className="rw-robot-led" />
            <div className="rw-robot-led" />
          </div>
        </div>

        {/* Arms */}
        <div className="rw-robot-arm left" />
        <div className="rw-robot-arm right" />

        {/* Legs */}
        <div className="rw-robot-leg left" />
        <div className="rw-robot-leg right" />

        {/* Base shadow */}
        <div className="rw-robot-base" />
      </div>
    </div>
  );
}
