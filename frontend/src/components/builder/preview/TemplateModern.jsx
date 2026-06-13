export default function TemplateModern({ data }) {
  const p = data?.personalInfo || {};
  return (
    <div className="template-modern">
      <header className="tm-header">
        <h1>{p.fullName || 'Your Name'}</h1>
        <div className="tm-contact">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github && <span>{p.github}</span>}
        </div>
      </header>
      <div className="tm-body">
        {p.summary && <section className="tm-section"><h2>Summary</h2><p>{p.summary}</p></section>}
        {data?.experience?.length > 0 && (
          <section className="tm-section">
            <h2>Experience</h2>
            {data.experience.map((e, i) => (
              <div className="tm-item" key={i}>
                <div className="tm-item-header"><strong>{e.position}</strong><span>{e.startDate} – {e.current ? 'Present' : e.endDate}</span></div>
                <div className="tm-item-sub">{e.company}{e.location ? `, ${e.location}` : ''}</div>
                <ul>{(e.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
              </div>
            ))}
          </section>
        )}
        {data?.education?.length > 0 && (
          <section className="tm-section">
            <h2>Education</h2>
            {data.education.map((e, i) => (
              <div className="tm-item" key={i}>
                <div className="tm-item-header"><strong>{e.degree} in {e.field}</strong><span>{e.endDate}</span></div>
                <div className="tm-item-sub">{e.institution}{e.gpa ? ` · GPA: ${e.gpa}` : ''}</div>
              </div>
            ))}
          </section>
        )}
        {data?.skills && Object.values(data.skills).some(s => s?.length > 0) && (
          <section className="tm-section">
            <h2>Skills</h2>
            {data.skills.technical?.length > 0 && <p><strong>Technical:</strong> {data.skills.technical.join(', ')}</p>}
            {data.skills.tools?.length > 0 && <p><strong>Tools:</strong> {data.skills.tools.join(', ')}</p>}
            {data.skills.soft?.length > 0 && <p><strong>Soft:</strong> {data.skills.soft.join(', ')}</p>}
          </section>
        )}
        {data?.projects?.length > 0 && (
          <section className="tm-section">
            <h2>Projects</h2>
            {data.projects.map((proj, i) => (
              <div className="tm-item" key={i}>
                <div className="tm-item-header"><strong>{proj.name}</strong>{proj.link && <a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>}</div>
                {proj.techStack?.length > 0 && <div className="tm-item-sub">{proj.techStack.join(' · ')}</div>}
                {proj.description && <p>{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}