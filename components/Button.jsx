export const Button = ({ children, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);
