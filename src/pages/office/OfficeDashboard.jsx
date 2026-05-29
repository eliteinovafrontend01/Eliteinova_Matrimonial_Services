import React from 'react';
import { OfficeSidebar } from '../../Components/office/layout/OfficeSidebar';
import { OfficeHeader } from '../../Components/office/layout/OfficeHeader';
import { OfficeBreadcrumb } from '../../Components/office/layout/OfficeBreadcrumb';
import { OfficeRightPanel } from '../../Components/office/OfficeRightPanel';
import { useOfficeNavigation } from '../../hooks/office/useOfficeNavigation';
import { officeMenuConfig } from '../../constants/office/menuConfig';

// ── Error Boundary ─────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('OfficeDashboard Error:', error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 min-h-screen">
          <h2 className="text-red-800 font-bold mb-4">Something went wrong in Office Dashboard</h2>
          <details className="bg-white p-4 rounded-lg border border-red-200">
            <summary className="cursor-pointer text-red-600 font-semibold">View Error Details</summary>
            <pre className="text-sm text-red-600 mt-2 overflow-auto whitespace-pre-wrap">
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Main Content ───────────────────────────────────────────────────────────────
const OfficeDashboardContent = () => {
  const nav = useOfficeNavigation();

  const getCurrentMenuLabel = () => {
    const menu = officeMenuConfig.find(m => m.id === nav.activeMenu);
    return menu?.label || 'Dashboard Overview';
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

      {/* Independent Office Sidebar */}
      <OfficeSidebar
        activeMenu={nav.activeMenu}
        activeSubmenu={nav.activeSubmenu}
        expandedMenus={nav.expandedMenus}
        sidebarOpen={nav.sidebarOpen}
        setSidebarOpen={nav.setSidebarOpen}
        toggleMenu={nav.toggleMenu}
        handleSubmenu={nav.handleSubmenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Independent Office Header */}
        <OfficeHeader
          sidebarOpen={nav.sidebarOpen}
          setSidebarOpen={nav.setSidebarOpen}
        />

        {/* Independent Office Breadcrumb */}
        <OfficeBreadcrumb
          activeMenu={nav.activeMenu}
          activeSubmenu={nav.activeSubmenu}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {nav.activeSubmenu || getCurrentMenuLabel()}
            </h2>
            {nav.activeMenu === 'dashboard' && (
              <p className="text-sm text-gray-400 mt-0.5">
                Welcome, Office Staff. Here's your overview.
              </p>
            )}
          </div>

          {/* Office Right Panel — restricted routing */}
          <OfficeRightPanel
            activeMenu={nav.activeMenu}
            activeSubmenu={nav.activeSubmenu}
            onNavigate={nav.handleNavigate}
          />
        </main>
      </div>
    </div>
  );
};

// ── Export ─────────────────────────────────────────────────────────────────────
export default function OfficeDashboard() {
  return (
    <ErrorBoundary>
      <OfficeDashboardContent />
    </ErrorBoundary>
  );
}