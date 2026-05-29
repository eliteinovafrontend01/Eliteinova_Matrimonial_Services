export const StatusBadge = ({ status }) => {
  const map = { 
    Active: 'bg-green-50 text-green-700 border-green-200', 
    Inactive: 'bg-gray-50 text-gray-500 border-gray-200', 
    Pending: 'bg-amber-50 text-amber-700 border-amber-200', 
    Blocked: 'bg-red-50 text-red-700 border-red-200' 
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${map[status] || map.Inactive}`}>{status}</span>;
};