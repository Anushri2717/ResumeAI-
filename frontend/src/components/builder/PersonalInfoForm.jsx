import { useResume } from '../../context/ResumeContext';

const FIELDS = [
  { key: 'fullName', label: 'Full Name', placeholder: 'Jane Doe' },
  { key: 'email', label: 'Email', placeholder: 'jane@email.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 234 567 8900' },
  { key: 'location', label: 'Location', placeholder: 'New York, NY' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/janedoe' },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/janedoe' },
  { key: 'website', label: 'Website', placeholder: 'janedoe.com' }
];

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const info = resumeData.personalInfo;

  return (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        {FIELDS.map(f => (
          <div className="form-group" key={f.key}>
            <label>{f.label}</label>
            <input type={f.type || 'text'} value={info[f.key] || ''} placeholder={f.placeholder} onChange={e => updatePersonalInfo(f.key, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="form-group full-width">
        <label>Professional Summary</label>
        <textarea rows={4} value={info.summary || ''} placeholder="Brief professional summary (2–3 sentences)..." onChange={e => updatePersonalInfo('summary', e.target.value)} />
      </div>
    </div>
  );
}