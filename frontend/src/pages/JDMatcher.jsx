import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { checkerApi } from '../api/checkerApi';
import JDInput from '../components/jd-matcher/JDInput';
import MatchScore from '../components/jd-matcher/MatchScore';
import KeywordGaps from '../components/jd-matcher/KeywordGaps';
import Loader from '../components/shared/Loader';

export default function JDMatcher() {
  const { token } = useAuth();
  const { resumeData, matchResult, setMatchResult } = useResume();
  const [loading, setLoading] = useState(false);

  const handleMatch = async (jd) => {
    setLoading(true);
    try { const result = await checkerApi.matchJD(resumeData, jd, token); setMatchResult(result); }
    catch (e) { alert('Match failed: ' + e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="jd-matcher-page">
      <div className="page-header">
        <h2>Job Description Matcher</h2>
        <p>See how well your resume matches a specific job posting.</p>
      </div>
      <div className="jd-layout">
        <div className="jd-left"><JDInput onSubmit={handleMatch} loading={loading} /></div>
        <div className="jd-right">
          {loading && <Loader text="Analyzing match..." />}
          {!loading && matchResult && <><MatchScore result={matchResult} /><KeywordGaps result={matchResult} /></>}
          {!loading && !matchResult && <div className="jd-placeholder"><p>Paste a job description to see your match score.</p></div>}
        </div>
      </div>
    </div>
  );
}