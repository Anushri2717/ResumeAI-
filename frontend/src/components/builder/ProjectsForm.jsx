import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const empty = () => ({ name: '', description: '', techStack: [], link: '', bullets: [] });

export default function ProjectsForm() {
  const { resumeData, updateSection } = useResume();
  const [projects, setProjects] = useState(resumeData.projects.length ? resumeData.projects : []);
  const [techInput, setTechInput] = useState({});

  const update = (i, field, val) => {
    const next = projects.map((p, idx) => idx === i ? { ...p, [field]: val } : p);
    setProjects(next); updateSection('projects', next);
  };
  const addTech = (i, val) => {
    if (!val.trim()) return;
    update(i, 'techStack', [...(projects[i].techStack || []), val.trim()]);
    setTechInput(prev => ({ ...prev, [i]: '' }));
  };
  const removeTech = (i, ti) => update(i, 'techStack', projects[i].techStack.filter((_, idx) => idx !== ti));
  const add = () => { const next = [...projects, empty()]; setProjects(next); updateSection('projects', next); };
  const remove = (i) => { const next = projects.filter((_, idx) => idx !== i); setProjects(next); updateSection('projects', next); };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button className="btn btn-outline btn-sm" onClick={add}>+ Add Project</button>
      </div>
      {projects.length === 0 && <p className="empty-hint">No projects yet. Add your best work!</p>}
      {projects.map((p, i) => (
        <div className="item-card" key={i}>
          <div className="item-card-header">
            <span>{p.name || `Project ${i + 1}`}</span>
            <button className="btn-remove" onClick={() => remove(i)}>✕</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Project Name</label><input value={p.name} onChange={ev => update(i, 'name', ev.target.value)} placeholder="My Awesome App" /></div>
            <div className="form-group"><label>Project Link</label><input value={p.link} onChange={ev => update(i, 'link', ev.target.value)} placeholder="github.com/..." /></div>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea rows={3} value={p.description} onChange={ev => update(i, 'description', ev.target.value)} placeholder="What did you build and why?" />
          </div>
          <div className="form-group full-width">
            <label>Tech Stack</label>
            <div className="tags-wrap">
              {(p.techStack || []).map((t, ti) => <span className="tag" key={ti}>{t}<button onClick={() => removeTech(i, ti)}>✕</button></span>)}
            </div>
            <div className="skill-input-row">
              <input value={techInput[i] || ''} onChange={e => setTechInput(prev => ({ ...prev, [i]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(i, techInput[i] || ''); } }} placeholder="React, Node.js... (Enter to add)" />
              <button className="btn btn-outline btn-sm" onClick={() => addTech(i, techInput[i] || '')}>Add</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}