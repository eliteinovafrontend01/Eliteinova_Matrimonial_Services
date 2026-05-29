import { Icon } from '../../admin/shared/Icon';
import { officeMenuConfig } from '../../../constants/office/menuConfig';
import { ICONS } from '../../../constants/admin/icons';

export const OfficeBreadcrumb = ({ activeMenu, activeSubmenu }) => {
  const activeMenuLabel = officeMenuConfig.find(m => m.id === activeMenu)?.label || 'Dashboard Overview';

  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="font-semibold text-blue-600">Office</span>
        <Icon d={ICONS.chevronRight} size={12} />
        <span className={`font-semibold ${activeSubmenu ? 'text-gray-500' : 'text-gray-700'}`}>
          {activeMenuLabel}
        </span>
        {activeSubmenu && (
          <>
            <Icon d={ICONS.chevronRight} size={12} />
            <span className="font-semibold text-gray-700">{activeSubmenu}</span>
          </>
        )}
      </div>
    </div>
  );
};