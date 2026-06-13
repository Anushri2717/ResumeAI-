export default function TemplateClassic({ data }) {
  const p = data?.personalInfo || {};
  return (
    <div className="template-classic">
      <header className="tc-header">
        <h1>{p.fullName || 'Your Name'}</h1>
        <div className="tc-contact">{[p.email, p.phone, p.location].filter(Boolean).join(' | ')}</div>
      </header>
      <div className="tc-body">
        {p.summary && <><div className="tc-rule"><span>OBJECTIVE</span></div><p className="tc-summary">{p.summary}</p></>}
        {data?.experience?.length > 0 && (<>
          <div className="tc-rule"><span>EXPERIENCE</span></div>
          {data.experience.map((e, i) => (
            <div className="tc-item" key={i}>
              <div className="tc-item-row"><strong>{e.position}, {e.company}</strong><em>{e.startDate} – {e.current ? 'Present' : e.endDate}</em></div>
              <ul>{(e.bullets || []).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
            </div>
          ))}
        </>)}
        {data?.education?.length > 0 && (<>
          <div className="tc-rule"><span>EDUCATION</span></div>
          {data.education.map((e, i) => (
            <div className="tc-item" key={i}>
              <div className="tc-item-row"><strong>{e.institution}</strong><em>{e.endDate}</em></div>
              <p>{e.degree} in {e.field}{e.gpa ? ` — GPA: ${e.gpa}` : ''}</p>
            </div>
          ))}
        </>)}
        {data?.skills && (<>
          <div className="tc-rule"><span>SKILLS</span></div>
          <p>{[...(data.skills.technical || []), ...(data.skills.tools || [])].join(' · ')}</p>
        </>)}
      </div>
    </div>
  );
}