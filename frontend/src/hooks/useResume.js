import { useState } from 'react';
import { resumeApi } from '../api/resumeApi';

export const useResumeActions = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const save = async (resumeData, token, id) => {
    setSaving(true); setError(null);
    try {
      if (id) return await resumeApi.update(id, resumeData, token);
      else return await resumeApi.create(resumeData, token);
    } catch (e) { setError(e.response?.data?.message || 'Save failed'); throw e; }
    finally { setSaving(false); }
  };

  return { save, saving, error };
};