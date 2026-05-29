import { Icon } from '../../admin/shared/Icon';
import { officeMenuConfig } from '../../../constants/office/menuConfig';
import { ICONS } from '../../../constants/admin/icons';

export const OfficeSidebar = ({
  activeMenu,
  activeSubmenu,
  expandedMenus,
  sidebarOpen,
  setSidebarOpen,
  toggleMenu,
  handleSubmenu,
}) => {
  return (
    <aside className={`${sidebarOpen ? 'w-72' : 'w-0 lg:w-16'} flex-shrink-0 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 overflow-hidden z-30`}>
      
      {/* Header — mirrors AdminSidebar exactly, office branding */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">O</span>
            </div>
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider leading-tight">Office Panel</p>
              <p className="text-[10px] text-gray-400 leading-tight">Wedding Services</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 flex-shrink-0"
        >
          <Icon d={sidebarOpen ? ICONS.close : ICONS.menu} size={18} />
        </button>
      </div>

      {/* Nav — exact same pattern as AdminSidebar */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {officeMenuConfig.map((item) => {
          const isActive = activeMenu === item.id;
          const isExpanded = expandedMenus[item.id];
          const hasSubmenus = item.submenus && item.submenus.length > 0;

          return (
            <div key={item.id}>
              <button
                onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-red-50 to-red-50 border border-red-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'}`}>
                  <Icon d={item.icon} size={18} />
                </span>
                {sidebarOpen && (
                  <>
                    <span className={`flex-1 text-sm font-semibold truncate ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                    {hasSubmenus && (
                      <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <Icon d={ICONS.chevronDown} size={14} />
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* Submenus — same pattern as AdminSidebar's plain submenus */}
              {sidebarOpen && isExpanded && hasSubmenus && (
                <div className="ml-4 mt-0.5 mb-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                  {item.submenus.map((sub, idx) => {
                    const isActiveSub = activeSubmenu === sub && activeMenu === item.id;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSubmenu(item.id, sub)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                          isActiveSub
                            ? 'bg-red-600 text-white font-semibold'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer — mirrors AdminSidebar footer */}
      {sidebarOpen && (
        <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              O
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-700 truncate">Office User</p>
              <p className="text-[10px] text-gray-400">LIMITED ACCESS</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};