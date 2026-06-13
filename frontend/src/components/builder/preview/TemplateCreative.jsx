export default function TemplateCreative({ data }) {
  const p = data?.personalInfo || {};
  return (
    <div className="template-creative">
      <aside className="trc-sidebar">
        <div className="trc-name">{p.fullName || 'Your Name'}</div>
        <div className="trc-contact">
          {p.email && <div>✉ {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.location && <div>📍 {p.location}</div>}
          {p.linkedin && <div>🔗 {p.linkedin}</div>}
          {p.github && <div>💻 {p.github}</div>}
        </div>
        {data?.skills && (
          <div className="trc-skills">
            <h3>Skills</h3>
            {[...(data.skills.technical || []), ...(data.skills.tools || [])].map((s, i) => (
              <span className="trc-skill-tag" key={i}>{s}</span>
            ))}
          </div>
        )}
      </aside>
      <main className="trc-main">
        {p.summary && <section><h2>About</h2><p>{p.summary}</p></section>}
        {data?.experience?.length > 0 && (
          <section>
            <h2>Experience</h2>
            {data.experience.map((e, i) => (
              <div className="trc-item" key={i}>
                <div className="trc-item-title">{e.position} <span>@ {e.company}</span></div>
                <div className="trc-item-date">{e.startDate} – {e.current ? 'Present' : e.endDate}</div>
                <ul>{(e.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
              </div>
            ))}
          </section>
        )}
        {data?.education?.length > 0 && (
          <section>
            <h2>Education</h2>
            {data.education.map((e, i) => (
              <div className="trc-item" key={i}>
                <div className="trc-item-title">{e.degree} in {e.field}</div>
                <div className="trc-item-date">{e.institution} · {e.endDate}</div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}