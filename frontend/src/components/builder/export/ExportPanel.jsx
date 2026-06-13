import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { aiApi } from '../../api/aiApi';

export default function ExportPanel() {
  const { token } = useAuth();
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(null);

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async (type) => {
    setLoading(type);
    try {
      if (type === 'pdf') { const blob = await aiApi.exportPDF(resumeData, resumeData.template, token); download(blob, 'resume.pdf'); }
      else if (type === 'docx') { const blob = await aiApi.exportDOCX(resumeData, token); download(blob, 'resume.docx'); }
      else if (type === 'txt') { const blob = await aiApi.exportTXT(resumeData, token); download(blob, 'resume.txt'); }
    } catch (e) { alert(`Export failed: ${e.message}`); }
    finally { setLoading(null); }
  };

  return (
    <div className="export-panel">
      <h4>Export Resume</h4>
      <div className="export-buttons">
        <button className="btn btn-primary" onClick={() => handleExport('pdf')} disabled={!!loading}>{loading === 'pdf' ? 'Generating...' : '⬇ PDF'}</button>
        <button className="btn btn-outline" onClick={() => handleExport('docx')} disabled={!!loading}>{loading === 'docx' ? 'Generating...' : '⬇ Word'}</button>
        <button className="btn btn-outline" onClick={() => handleExport('txt')} disabled={!!loading}>{loading === 'txt' ? 'Generating...' : '⬇ TXT'}</button>
      </div>
    </div>
  );
}