import ProgressBar from '../shared/ProgressBar';

export default function ScoreCard({ title, score, issues = [], passed = [] }) {
  return (
    <div className="score-card">
      <div className="score-card-header">
        <span>{title}</span>
        <span className={`score-badge ${score >= 75 ? 'good' : score >= 50 ? 'ok' : 'bad'}`}>{score}%</span>
      </div>
      <ProgressBar score={score} />
      {passed.slice(0, 2).map((p, i) => <p key={i} className="check-item pass">✓ {p}</p>)}
      {issues.slice(0, 2).map((iss, i) => <p key={i} className="check-item fail">✗ {iss}</p>)}
    </div>
  );
}