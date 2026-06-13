import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const CATEGORIES = [
  { key: 'technical', label: 'Technical Skills', placeholder: 'React, Node.js, Python...' },
  { key: 'tools', label: 'Tools & Platforms', placeholder: 'Git, Docker, AWS...' },
  { key: 'soft', label: 'Soft Skills', placeholder: 'Leadership, Communication...' },
  { key: 'languages', label: 'Languages', placeholder: 'English, Spanish...' }
];

export default function SkillsInput() {
  const { resumeData, updateSection } = useResume();
  const [inputs, setInputs] = useState({ technical: '', tools: '', soft: '', languages: '' });

  const addSkill = (category, value) => {
    if (!value.trim()) return;
    const skills = { ...resumeData.skills };
    skills[category] = [...(skills[category] || []), value.trim()];
    updateSection('skills', skills);
    setInputs(prev => ({ ...prev, [category]: '' }));
  };
  const removeSkill = (category, idx) => {
    const skills = { ...resumeData.skills };
    skills[category] = skills[category].filter((_, i) => i !== idx);
    updateSection('skills', skills);
  };
  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(category, inputs[category]); }
  };

  return (
    <div className="form-section">
      <h3>Skills</h3>
      {CATEGORIES.map(cat => (
        <div className="skills-category" key={cat.key}>
          <label>{cat.label}</label>
          <div className="tags-wrap">
            {(resumeData.skills[cat.key] || []).map((skill, i) => (
              <span className="tag" key={i}>{skill}<button onClick={() => removeSkill(cat.key, i)}>✕</button></span>
            ))}
          </div>
          <div className="skill-input-row">
            <input value={inputs[cat.key]} onChange={e => setInputs(prev => ({ ...prev, [cat.key]: e.target.value }))} onKeyDown={e => handleKeyDown(e, cat.key)} placeholder={`${cat.placeholder} (Enter to add)`} />
            <button className="btn btn-outline btn-sm" onClick={() => addSkill(cat.key, inputs[cat.key])}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}