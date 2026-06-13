import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const empty = () => ({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' });

export default function EducationForm() {
  const { resumeData, updateSection } = useResume();
  const [edu, setEdu] = useState(resumeData.education.length ? resumeData.education : [empty()]);

  const update = (i, field, val) => {
    const next = edu.map((e, idx) => idx === i ? { ...e, [field]: val } : e);
    setEdu(next); updateSection('education', next);
  };
  const add = () => { const next = [...edu, empty()]; setEdu(next); updateSection('education', next); };
  const remove = (i) => { const next = edu.filter((_, idx) => idx !== i); setEdu(next); updateSection('education', next); };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Education</h3>
        <button className="btn btn-outline btn-sm" onClick={add}>+ Add</button>
      </div>
      {edu.map((e, i) => (
        <div className="item-card" key={i}>
          <div className="item-card-header">
            <span>{e.institution || `Education ${i + 1}`}</span>
            {edu.length > 1 && <button className="btn-remove" onClick={() => remove(i)}>✕</button>}
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Institution</label><input value={e.institution} onChange={ev => update(i, 'institution', ev.target.value)} placeholder="MIT" /></div>
            <div className="form-group"><label>Degree</label><input value={e.degree} onChange={ev => update(i, 'degree', ev.target.value)} placeholder="Bachelor of Science" /></div>
            <div className="form-group"><label>Field of Study</label><input value={e.field} onChange={ev => update(i, 'field', ev.target.value)} placeholder="Computer Science" /></div>
            <div className="form-group"><label>GPA (optional)</label><input value={e.gpa} onChange={ev => update(i, 'gpa', ev.target.value)} placeholder="3.8 / 4.0" /></div>
            <div className="form-group"><label>Start Date</label><input value={e.startDate} onChange={ev => update(i, 'startDate', ev.target.value)} placeholder="Sep 2018" /></div>
            <div className="form-group"><label>End Date</label><input value={e.endDate} onChange={ev => update(i, 'endDate', ev.target.value)} placeholder="May 2022" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}