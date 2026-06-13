import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import BulletSuggestions from './BulletSuggestions';

const empty = () => ({ company: '', position: '', startDate: '', endDate: '', current: false, location: '', bullets: [''] });

export default function ExperienceForm() {
  const { resumeData, updateSection } = useResume();
  const [exp, setExp] = useState(resumeData.experience.length ? resumeData.experience : [empty()]);
  const [showAI, setShowAI] = useState(null);

  const update = (i, field, val) => {
    const next = exp.map((e, idx) => idx === i ? { ...e, [field]: val } : e);
    setExp(next); updateSection('experience', next);
  };
  const updateBullet = (i, bi, val) => { const bullets = exp[i].bullets.map((b, idx) => idx === bi ? val : b); update(i, 'bullets', bullets); };
  const addBullet = (i) => update(i, 'bullets', [...exp[i].bullets, '']);
  const removeBullet = (i, bi) => update(i, 'bullets', exp[i].bullets.filter((_, idx) => idx !== bi));
  const addExp = () => { const next = [...exp, empty()]; setExp(next); updateSection('experience', next); };
  const removeExp = (i) => { const next = exp.filter((_, idx) => idx !== i); setExp(next); updateSection('experience', next); };
  const applyBullets = (i, bullets) => { update(i, 'bullets', [...exp[i].bullets.filter(b => b.trim()), ...bullets]); setShowAI(null); };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Experience</h3>
        <button className="btn btn-outline btn-sm" onClick={addExp}>+ Add</button>
      </div>
      {exp.map((e, i) => (
        <div className="item-card" key={i}>
          <div className="item-card-header">
            <span>{e.position || e.company || `Experience ${i + 1}`}</span>
            {exp.length > 1 && <button className="btn-remove" onClick={() => removeExp(i)}>✕</button>}
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Position</label><input value={e.position} onChange={ev => update(i, 'position', ev.target.value)} placeholder="Software Engineer" /></div>
            <div className="form-group"><label>Company</label><input value={e.company} onChange={ev => update(i, 'company', ev.target.value)} placeholder="Google" /></div>
            <div className="form-group"><label>Start Date</label><input value={e.startDate} onChange={ev => update(i, 'startDate', ev.target.value)} placeholder="Jan 2022" /></div>
            <div className="form-group"><label>End Date</label><input value={e.endDate} onChange={ev => update(i, 'endDate', ev.target.value)} placeholder="Dec 2023" disabled={e.current} /></div>
            <div className="form-group"><label>Location</label><input value={e.location} onChange={ev => update(i, 'location', ev.target.value)} placeholder="New York, NY" /></div>
            <div className="form-group checkbox-group">
              <label><input type="checkbox" checked={e.current} onChange={ev => update(i, 'current', ev.target.checked)} /> Currently working here</label>
            </div>
          </div>
          <div className="bullets-section">
            <div className="bullets-header">
              <label>Bullet Points</label>
              <button className="btn btn-ai btn-sm" onClick={() => setShowAI(i)}>✨ AI Suggest</button>
            </div>
            {e.bullets.map((b, bi) => (
              <div className="bullet-row" key={bi}>
                <input value={b} onChange={ev => updateBullet(i, bi, ev.target.value)} placeholder="Led team of 5 engineers to build..." />
                <button className="btn-remove" onClick={() => removeBullet(i, bi)}>✕</button>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" onClick={() => addBullet(i)}>+ Add bullet</button>
          </div>
          {showAI === i && <BulletSuggestions expData={e} onApply={(bullets) => applyBullets(i, bullets)} onClose={() => setShowAI(null)} />}
        </div>
      ))}
    </div>
  );
}