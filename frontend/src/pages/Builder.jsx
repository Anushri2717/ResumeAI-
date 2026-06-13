import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '../api/resumeApi';
import BuilderForm from '../components/builder/BuilderForm';
import ResumePreview from '../components/preview/ResumePreview';
import ExportPanel from '../components/export/ExportPanel';

const TEMPLATES = ['modern', 'classic', 'creative'];

export default function Builder() {
  const { id } = useParams();
  const { token } = useAuth();
  const { resumeData, updateSection } = useResume();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) await resumeApi.update(id, resumeData, token);
      else { const r = await resumeApi.create(resumeData, token); navigate(`/builder/${r._id}`); }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { alert('Save failed: ' + e.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="builder-page">
      <div className="builder-toolbar">
        <div className="template-switcher">
          <span>Template:</span>
          {TEMPLATES.map(t => (
            <button key={t} className={`tpl-btn ${resumeData.template === t ? 'active' : ''}`} onClick={() => updateSection('template', t)}>{t}</button>
          ))}
        </div>
        <div className="builder-actions">
          <ExportPanel />
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save'}
          </button>
        </div>
      </div>
      <div className="builder-layout">
        <div className="builder-left"><BuilderForm /></div>
        <div className="builder-right"><ResumePreview /></div>
      </div>
    </div>
  );
}