export default function Button({ children, onClick, variant = 'primary', disabled = false, loading = false, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`btn btn-${variant} ${className}`}>
      {loading ? 'Please wait...' : children}
    </button>
  );
}