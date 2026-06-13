export default function SectionEditor({ title, items, onUpdate, renderItem, newItem }) {
  const handleChange = (index, updated) => { const copy = [...items]; copy[index] = updated; onUpdate(copy); };
  const handleRemove = (index) => onUpdate(items.filter((_, i) => i !== index));
  const handleAdd = () => onUpdate([...items, { ...newItem, id: Date.now() }]);

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>{title}</h3>
        <button className="btn btn-outline btn-sm" onClick={handleAdd}>+ Add</button>
      </div>
      {items.map((item, i) => renderItem(item, (updated) => handleChange(i, updated), () => handleRemove(i)))}
    </div>
  );
}