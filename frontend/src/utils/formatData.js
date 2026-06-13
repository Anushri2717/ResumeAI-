export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const truncate = (str, n = 80) => str?.length > n ? str.slice(0, n) + '...' : str;

export const scoreColor = (score) => {
  if (score >= 75) return '#16a34a';
  if (score >= 50) return '#d97706';
  return '#dc2626';
};