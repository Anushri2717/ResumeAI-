import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { checkerApi } from '../api/checkerApi';
import FileUploader from '../components/checker/FileUploader';
import ScoreDashboard from '../components/checker/ScoreDashboard';
import Loader from '../components/shared/Loader';

export default function Checker() {
  const { token } = useAuth();
  const { resumeData, checkerResult, setCheckerResult } = useResume();
  const [mode, setMode] = useState('upload');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setLoading(true);
    try { const result = await checkerApi.uploadResume(file, token); setCheckerResult(result); }
    catch (e) { alert('Analysis failed: ' + e.message); }
    finally { setLoading(false); }
  };

  const handleAnalyzeBuilt = async () => {
    setLoading(true);
    try { const result = await checkerApi.analyzeBuilt(resumeData, token); setCheckerResult(result); }
    catch (e) { alert('Analysis failed: ' + e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="checker-page">
      <div className="page-header">
        <h2>Resume Checker</h2>
        <p>Get an ATS score, formatting tips, and keyword analysis.</p>
      </div>
      <div className="mode-tabs">
        <button className={mode === 'upload' ? 'active' : ''} onClick={() => setMode('upload')}>Upload a Resume</button>
        <button className={mode === 'built' ? 'active' : ''} onClick={() => setMode('built')}>Analyze My Builder Resume</button>
      </div>
      {mode === 'upload' ? <FileUploader onFile={handleFileUpload} /> : (
        <div className="analyze-built">
          <p>This will analyze the resume you've built in the builder.</p>
          <button className="btn btn-primary" onClick={handleAnalyzeBuilt} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Now'}
          </button>
        </div>
      )}
      {loading && <Loader text="Analyzing your resume..." />}
      {!loading && checkerResult && <ScoreDashboard result={checkerResult} />}
    </div>
  );
}