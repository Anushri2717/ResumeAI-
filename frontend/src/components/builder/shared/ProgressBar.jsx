export default function ProgressBar({ score, label }) {
  const pct = Math.min(Math.max(score, 0), 100);
  const color = pct >= 75 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626';
  return (
    <div className="progress-wrap">
      {label && <div className="progress-label"><span>{label}</span><span>{pct}%</span></div>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}