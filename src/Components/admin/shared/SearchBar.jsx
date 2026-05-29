import { Icon } from './Icon';
import { ICONS } from '../../../constants/admin/icons';

export const SearchBar = ({ placeholder, onFilter, onExport }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex-1 relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon d={ICONS.search} size={15} />
      </span>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
      />
    </div>
    <button 
      onClick={onFilter || (() => alert('Filter panel opened'))} 
      className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors"
    >
      <Icon d={ICONS.filter} size={14} />Filters
    </button>
    <button 
      onClick={onExport || (() => alert('Exporting data...'))} 
      className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors"
    >
      <Icon d={ICONS.download} size={14} />Export
    </button>
  </div>
);