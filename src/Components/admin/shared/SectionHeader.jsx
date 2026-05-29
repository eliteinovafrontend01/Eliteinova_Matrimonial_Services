import { Icon } from './Icon';
import { ICONS } from '../../../constants/admin/icons';

export const SectionHeader = ({ icon, title, count, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
        <Icon d={icon} size={18} />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        {count && <p className="text-xs text-gray-400">{count}</p>}
      </div>
    </div>
    {action && (
      <button 
        onClick={() => alert(`${action.label}: Preparing export...`)} 
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
      >
        <Icon d={action.icon} size={13} />{action.label}
      </button>
    )}
  </div>
);