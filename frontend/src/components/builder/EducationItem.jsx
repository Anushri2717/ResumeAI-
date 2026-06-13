export default function EducationItem({ item, onChange, onRemove }) {
  const update = (field, val) => onChange({ ...item, [field]: val });
  return (
    <div className="item-card">
      <div className="form-grid">
        <div className="form-group"><label>Institution</label><input value={item.institution||''} onChange={e => update('institution', e.target.value)} placeholder="MIT" /></div>
        <div className="form-group"><label>Degree</label><input value={item.degree||''} onChange={e => update('degree', e.target.value)} placeholder="B.Tech" /></div>
        <div className="form-group"><label>Field of Study</label><input value={item.field||''} onChange={e => update('field', e.target.value)} placeholder="Computer Science" /></div>
        <div className="form-group"><label>Graduation Year</label><input type="month" value={item.endDate||''} onChange={e => update('endDate', e.target.value)} /></div>
        <div className="form-group"><label>GPA (optional)</label><input value={item.gpa||''} onChange={e => update('gpa', e.target.value)} placeholder="3.8" /></div>
      </div>
      <button className="btn btn-danger btn-sm" onClick={onRemove}>Remove Education</button>
    </div>
  );
}