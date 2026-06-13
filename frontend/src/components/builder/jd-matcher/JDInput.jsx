import { useState } from 'react';

export default function JDInput({ onSubmit, loading }) {
  const [jd, setJd] = useState('');
  return (
    <div className="jd-input-wrap">
      <label>Paste the Job Description</label>
      <textarea rows={10} value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the full job description here..." />
      <button className="btn btn-primary" onClick={() => onSubmit(jd)} disabled={!jd.trim() || loading}>
        {loading ? 'Analyzing...' : '🔍 Analyze Match'}
      </button>
    </div>
  );
}