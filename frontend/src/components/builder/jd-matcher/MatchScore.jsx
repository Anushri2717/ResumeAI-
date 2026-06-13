import ProgressBar from '../shared/ProgressBar';

export default function MatchScore({ result }) {
  const { matchScore, summary, recommendations, quickWins } = result;
  return (
    <div className="match-score-wrap">
      <div className="match-header">
        <div className="match-circle">
          <span className="match-number">{matchScore}</span>
          <span>% match</span>
        </div>
        <div>
          <h3>Job Match Score</h3>
          <p>{summary}</p>
        </div>
      </div>
      <ProgressBar score={matchScore} label="Overall Match" />
      {quickWins?.length > 0 && (
        <div className="result-block success-block">
          <h4>Quick Wins</h4>
          <ul>{quickWins.map((w, i) => <li key={i}>⚡ {w}</li>)}</ul>
        </div>
      )}
      {recommendations?.length > 0 && (
        <div className="result-block info-block">
          <h4>Recommendations</h4>
          <ul>{recommendations.map((r, i) => <li key={i}>→ {r}</li>)}</ul>
        </div>
      )}
    </div>
  );
}