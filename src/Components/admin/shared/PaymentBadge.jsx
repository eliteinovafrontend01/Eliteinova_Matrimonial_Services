export const PaymentBadge = ({ status }) => {
  const map = { 
    Paid: 'bg-green-50 text-green-700', 
    Partial: 'bg-amber-50 text-amber-700', 
    Pending: 'bg-gray-50 text-gray-500', 
    Refunded: 'bg-blue-50 text-blue-700' 
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${map[status] || ''}`}>{status}</span>;
};