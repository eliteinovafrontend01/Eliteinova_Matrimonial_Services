export const StatCard = ({ label, value, color, icon, sub, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${color} hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);