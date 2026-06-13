export default function FixSuggestions({ suggestions }) {
  if (!suggestions?.length) return null;
  return (
    <div className="fix-suggestions">
      <h4>How to Improve</h4>
      {suggestions.map((s, i) => (
        <div className="fix-item" key={i}>
          <span className="fix-num">{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}