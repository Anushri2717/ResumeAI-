export default function KeywordGaps({ result }) {
  const { keywordsFound = [], keywordsMissing = [], toneAnalysis } = result;
  return (
    <div className="keyword-gaps">
      <div className="kw-grid">
        <div className="kw-block">
          <h4>Keywords Found ✓</h4>
          <div className="kw-tags">{keywordsFound.map((k, i) => <span key={i} className="kw-tag found">{k}</span>)}</div>
        </div>
        <div className="kw-block">
          <h4>Keywords Missing ✗</h4>
          <div className="kw-tags">{keywordsMissing.map((k, i) => <span key={i} className="kw-tag missing">{k}</span>)}</div>
        </div>
      </div>
      {toneAnalysis && (
        <div className="tone-block">
          <h4>Tone & Impact Analysis</h4>
          <p>Tone Score: <strong>{toneAnalysis.score}%</strong></p>
          {toneAnalysis.weakVerbs?.length > 0 && <p>Weak verbs to replace: {toneAnalysis.weakVerbs.join(', ')}</p>}
          {toneAnalysis.strongVerbs?.length > 0 && <p>Strong action verbs: {toneAnalysis.strongVerbs.join(', ')}</p>}
          {toneAnalysis.suggestions?.map((s, i) => <p key={i} className="tone-suggestion">• {s}</p>)}
        </div>
      )}
    </div>
  );
}