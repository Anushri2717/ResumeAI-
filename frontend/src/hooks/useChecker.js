import { useState } from 'react';
import { checkerApi } from '../api/checkerApi';

export const useChecker = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeFile = async (file, token) => {
    setLoading(true); setError(null);
    try { const data = await checkerApi.uploadResume(file, token); setResult(data); return data; }
    catch (e) { setError('Analysis failed'); throw e; }
    finally { setLoading(false); }
  };

  const analyzeBuilt = async (resumeData, token) => {
    setLoading(true); setError(null);
    try { const data = await checkerApi.analyzeBuilt(resumeData, token); setResult(data); return data; }
    catch (e) { setError('Analysis failed'); throw e; }
    finally { setLoading(false); }
  };

  return { result, loading, error, analyzeFile, analyzeBuilt };
};