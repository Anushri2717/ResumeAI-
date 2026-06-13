import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="home">
      <section className="hero">
        <h1>Build a Resume That Gets You Hired</h1>
        <p>AI-powered resume builder, checker, and job-match analyzer — all in one place.</p>
        <div className="hero-actions">
          <Link to={user ? '/builder' : '/login?tab=register'} className="btn btn-primary btn-lg">Build My Resume</Link>
          <Link to={user ? '/checker' : '/login'} className="btn btn-outline btn-lg">Check My Resume</Link>
        </div>
      </section>
      <section className="features">
        {[
          { icon: '🛠', title: 'Resume Builder', desc: 'Build from scratch with AI bullet suggestions and live preview.' },
          { icon: '✅', title: 'Resume Checker', desc: 'Upload your resume and get an ATS score with fix suggestions.' },
          { icon: '🎯', title: 'JD Matcher', desc: 'Paste any job description and see your match percentage instantly.' },
          { icon: '📄', title: 'Export Anywhere', desc: 'Download as PDF, Word, or plain text — ready to apply.' }
        ].map((f, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}