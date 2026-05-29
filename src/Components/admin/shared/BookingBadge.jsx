export const BookingBadge = ({ status }) => {
  const map = { 
    Completed: 'bg-green-50 text-green-700 border-green-200', 
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200', 
    Pending: 'bg-amber-50 text-amber-700 border-amber-200', 
    'In Progress': 'bg-purple-50 text-purple-700 border-purple-200', 
    Cancelled: 'bg-red-50 text-red-700 border-red-200' 
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${map[status] || ''}`}>{status}</span>;
};