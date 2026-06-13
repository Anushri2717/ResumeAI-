import ProgressBar from '../shared/ProgressBar';
import ScoreCard from './ScoreCard';

export default function ScoreDashboard({ result }) {
  const { overallScore, sections, topSuggestions, strengths } = result;
  return (
    <div className="score-dashboard">
      <div className="overall-score">
        <div className="score-circle">
          <span className="score-number">{overallScore}</span>
          <span className="score-label">/ 100</span>
        </div>
        <div>
          <h3>Overall Resume Score</h3>
          <p className="score-desc">{overallScore >= 75 ? 'Strong resume!' : overallScore >= 50 ? 'Good foundation, needs polish.' : 'Needs significant improvements.'}</p>
        </div>
      </div>
      <div className="score-grid">
        {Object.entries(sections).map(([key, val]) => (
          <ScoreCard key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} score={val.score} issues={val.issues} passed={val.passed} />
        ))}
      </div>
      {strengths?.length > 0 && (
        <div className="result-block success-block">
          <h4>Strengths</h4>
          <ul>{strengths.map((s, i) => <li key={i}>✓ {s}</li>)}</ul>
        </div>
      )}
      {topSuggestions?.length > 0 && (
        <div className="result-block warn-block">
          <h4>Top Suggestions</h4>
          <ul>{topSuggestions.map((s, i) => <li key={i}>→ {s}</li>)}</ul>
        </div>
      )}
    </div>
  );
}