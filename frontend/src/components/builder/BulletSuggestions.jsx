import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { aiApi } from '../../api/aiApi';

export default function BulletSuggestions({ expData, onApply, onClose }) {
  const { token } = useAuth();
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await aiApi.generateBullets({ jobTitle: expData.position, company: expData.company }, token);
      setBullets(res.bullets); setSelected([]);
    } catch (e) { alert('Failed to generate bullets.'); }
    finally { setLoading(false); }
  };
  const toggle = (i) => setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <span>✨ AI Bullet Suggestions</span>
        <button className="btn-remove" onClick={onClose}>✕</button>
      </div>
      {bullets.length === 0 ? (
        <button className="btn btn-ai" onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate Suggestions'}</button>
      ) : (
        <>
          <p className="ai-hint">Select bullets to add:</p>
          <ul className="bullet-suggestions">
            {bullets.map((b, i) => (
              <li key={i} className={`suggestion-item ${selected.includes(i) ? 'selected' : ''}`} onClick={() => toggle(i)}>
                <span className="check">{selected.includes(i) ? '✓' : '+'}</span>{b}
              </li>
            ))}
          </ul>
          <div className="ai-actions">
            <button className="btn btn-ghost btn-sm" onClick={generate} disabled={loading}>Regenerate</button>
            <button className="btn btn-primary btn-sm" onClick={() => onApply(selected.map(i => bullets[i]))} disabled={selected.length === 0}>
              Add {selected.length} bullet{selected.length !== 1 ? 's' : ''}
            </button>
          </div>
        </>
      )}
    </div>
  );
}