import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '../api/resumeApi';
import Loader from '../components/shared/Loader';

export default function Dashboard() {
  const { token, user } = useAuth();
  const { loadResume, resetResume } = useResume();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    resumeApi.getAll(token).then(setResumes).catch(console.error).finally(() => setLoading(false));
  }, [token]);

  const handleNew = () => { resetResume(); navigate('/builder'); };
  const handleEdit = async (id) => {
    const data = await resumeApi.getById(id, token);
    loadResume(data);
    navigate(`/builder/${id}`);
  };
  const handleDelete = async (id) => {
    if (!confirm('Delete this resume?')) return;
    await resumeApi.delete(id, token);
    setResumes(prev => prev.filter(r => r._id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome back, {user?.name}</h2>
        <button className="btn btn-primary" onClick={handleNew}>+ New Resume</button>
      </div>
      <div className="dashboard-grid">
        {resumes.length === 0 && (
          <div className="empty-state">
            <p>No resumes yet. Create your first one!</p>
            <button className="btn btn-primary" onClick={handleNew}>Build Now</button>
          </div>
        )}
        {resumes.map(r => (
          <div className="resume-card" key={r._id}>
            <div className="resume-card-title">{r.title}</div>
            <div className="resume-card-meta">{r.template} · {new Date(r.updatedAt).toLocaleDateString()}</div>
            <div className="resume-card-actions">
              <button className="btn btn-outline btn-sm" onClick={() => handleEdit(r._id)}>Edit</button>
              <Link to="/checker" className="btn btn-ghost btn-sm">Check</Link>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}