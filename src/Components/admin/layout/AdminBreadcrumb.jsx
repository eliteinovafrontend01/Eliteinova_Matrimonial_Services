import { Icon } from '../shared/Icon';
import { menuConfig } from '../../../constants/admin/menuConfig';
import { ICONS } from '../../../constants/admin/icons';

export const AdminBreadcrumb = ({ activeMenu, activeSubmenu }) => {
  const activeMenuLabel = menuConfig.find(m => m.id === activeMenu)?.label || 'Dashboard Overview';
  
  const getDisplaySubmenu = () => {
    if (!activeSubmenu) return null;
    if (activeSubmenu === '__group_categories__') return 'Manage Service Providers';
    if (activeSubmenu === '__group_actions__') return 'Actions';
    if (activeSubmenu === '__group_verification__') return 'Vendor Verification';
    return activeSubmenu;
  };

  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="font-semibold text-red-600">Admin</span>
        <Icon d={ICONS.chevronRight} size={12} />
        <span className={`font-semibold ${activeSubmenu ? 'text-gray-500' : 'text-gray-700'}`}>
          {activeMenuLabel}
        </span>
        {activeSubmenu && (
          <>
            <Icon d={ICONS.chevronRight} size={12} />
            <span className="font-semibold text-gray-700">{getDisplaySubmenu()}</span>
          </>
        )}
      </div>
    </div>
  );
};