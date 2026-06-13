import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsInput from './SkillsInput';
import ProjectsForm from './ProjectsForm';

const STEPS = ['Personal Info', 'Experience', 'Education', 'Skills', 'Projects'];

export default function BuilderForm() {
  const [step, setStep] = useState(0);
  const panels = [<PersonalInfoForm />, <ExperienceForm />, <EducationForm />, <SkillsInput />, <ProjectsForm />];

  return (
    <div className="builder-form">
      <div className="step-tabs">
        {STEPS.map((s, i) => (
          <button key={s} className={`step-tab ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => setStep(i)}>{s}</button>
        ))}
      </div>
      <div className="step-panel">{panels[step]}</div>
      <div className="step-nav">
        {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>}
        {step < STEPS.length - 1 && <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>}
      </div>
    </div>
  );
}