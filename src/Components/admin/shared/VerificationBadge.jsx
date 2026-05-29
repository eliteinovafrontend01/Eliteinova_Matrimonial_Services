export const VerificationBadge = ({ status }) => {
  const map = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    Verified: 'bg-green-50 text-green-700 border-green-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
    Expired: 'bg-orange-50 text-orange-700 border-orange-200',
    Invalid: 'bg-red-50 text-red-600 border-red-200',
    Approved: 'bg-green-50 text-green-700 border-green-200',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${map[status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>{status}</span>;
};