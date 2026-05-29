import React from 'react';
import { AdminSidebar } from '../../Components/admin/layout/AdminSidebar';
import { AdminHeader } from '../../Components/admin/layout/AdminHeader';
import { AdminBreadcrumb } from '../../Components/admin/layout/AdminBreadcrumb';
import { RightPanel } from '../../Components/admin/RightPanel';
import { useAdminNavigation } from '../../hooks/admin/useAdminNavigation';
import { menuConfig } from '../../constants/admin/menuConfig';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AdminDashboard Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 min-h-screen">
          <h2 className="text-red-800 font-bold mb-4">Something went wrong in Admin Dashboard</h2>
          <details className="bg-white p-4 rounded-lg border border-red-200">
            <summary className="cursor-pointer text-red-600 font-semibold">View Error Details</summary>
            <pre className="text-sm text-red-600 mt-2 overflow-auto whitespace-pre-wrap">
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.Componentstack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main AdminDashboard Content
const AdminDashboardContent = () => {
  const nav = useAdminNavigation();

  // Get current menu label
  const getCurrentMenuLabel = () => {
    const menu = menuConfig.find(m => m.id === nav.activeMenu);
    return menu?.label || 'Dashboard Overview';
  };

  const getDisplaySubmenu = () => {
    if (!nav.activeSubmenu) return null;
    if (nav.activeSubmenu === '__group_categories__') return 'Manage Service Providers';
    if (nav.activeSubmenu === '__group_actions__') return 'Vendor Actions';
    if (nav.activeSubmenu === '__group_verification__') return 'Vendor Verification';
    return nav.activeSubmenu;
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f9fafb; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
      
      <AdminSidebar 
        activeMenu={nav.activeMenu}
        activeSubmenu={nav.activeSubmenu}
        expandedMenus={nav.expandedMenus}
        sidebarOpen={nav.sidebarOpen}
        setSidebarOpen={nav.setSidebarOpen}
        toggleMenu={nav.toggleMenu}
        handleSubmenu={nav.handleSubmenu}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          sidebarOpen={nav.sidebarOpen}
          setSidebarOpen={nav.setSidebarOpen}
        />
        
        <AdminBreadcrumb 
          activeMenu={nav.activeMenu}
          activeSubmenu={nav.activeSubmenu}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {getDisplaySubmenu() || getCurrentMenuLabel()}
            </h2>
            {nav.activeMenu === 'dashboard' && (
              <p className="text-sm text-gray-400 mt-0.5">Welcome back, Admin. Here's what's happening today.</p>
            )}
          </div>
          
          <RightPanel 
            activeMenu={nav.activeMenu}
            activeSubmenu={nav.activeSubmenu}
            onSelectCategory={nav.handleSelectCategory}
            onNavigate={nav.handleNavigate}
          />
        </main>
      </div>
    </div>
  );
};

// Export with Error Boundary
export default function AdminDashboard() {
  return (
    <ErrorBoundary>
      <AdminDashboardContent />
    </ErrorBoundary>
  );
}