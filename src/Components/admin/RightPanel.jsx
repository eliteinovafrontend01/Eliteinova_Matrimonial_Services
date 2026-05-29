import React from 'react';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { CustomerManagementPage } from './customers/CustomerManagement';
import { ViewAllCustomers } from './customers/ViewAllCustomers';
import { TrackBookingHistory } from './customers/TrackBookingHistory';
import { ManageProfiles } from './customers/ManageProfiles';
import { HandleComplaints } from './customers/HandleComplaints';
import { VendorOverview } from './vendors/VendorOverview';
import { ManageServiceProvidersPage } from './vendors/ManageServiceProviders';
import { ActionsPage } from './vendors/actions/ActionsPage';
import { VendorVerificationPage } from './vendors/verification/VendorVerificationPage';
import { 
  PhotographyPage, 
  CateringPage, 
  WeddingHallsPage, 
  EntertainmentPage, 
  DecorationsPage, 
  InvitationsPage, 
  BridalMakeupPage, 
  InvestigationsPage 
} from './vendors/categories/CategoryPages';
import { ApproveVendorRegistration } from './vendors/actions/ApproveVendorRegistration';
import { ApproveVerifyProfile } from './vendors/actions/ApproveVerifyProfile';
import { ManageVendorProfiles } from './vendors/actions/ManageVendorProfiles';
import { ActivateDeactivateVendors } from './vendors/actions/ActivateDeactivateVendors';
import { BusinessLicensePage } from './vendors/verification/BusinessLicensePage';
import { GSTVerificationPage } from './vendors/verification/GSTVerificationPage';
import { IDProofVerificationPage } from './vendors/verification/IDProofVerificationPage';
import { VerifiedVendorBadgePage } from './vendors/verification/VerifiedVendorBadgePage';
import { BookingManagementPage } from './bookings/BookingManagementPage';
import { PaymentsTransactionsPage } from './payments/PaymentsTransactionsPage';
import { ComplaintsDisputesPage } from './complaints/ComplaintsDisputesPage';
import { AnalyticsReportsPage } from './analytics/AnalyticsReportsPage';
import { AdminRolesPage } from './roles/AdminRolesPage';
import { NotificationsPage } from './notifications/NotificationsPage';
import { SettingsPage } from './settings/SettingsPage';
import { menuConfig } from '../../constants/admin/menuConfig';

const CATEGORY_PAGES = {
  'Photography': PhotographyPage,
  'Catering': CateringPage,
  'Wedding Halls': WeddingHallsPage,
  'Entertainment & Events': EntertainmentPage,
  'Decorations': DecorationsPage,
  'Invitations & Gifting': InvitationsPage,
  'Groom & Bridal Styling': BridalMakeupPage,
  'Pre Matrimonial Investigations': InvestigationsPage,
  'Approve / Reject Vendor Registration': ApproveVendorRegistration,
  'Verify Business Details': ApproveVerifyProfile,
  'Manage Vendor Profiles': ManageVendorProfiles,
  'Activate / Deactivate Vendors': ActivateDeactivateVendors,
  'Verify: Business License': BusinessLicensePage,
  'Verify: GST Details': GSTVerificationPage,
  'Verify: ID Proof': IDProofVerificationPage,
  'Assign: ✅ Verified Vendor Badge': VerifiedVendorBadgePage,
};

export const RightPanel = ({ activeMenu, activeSubmenu, onSelectCategory, onNavigate }) => {
  const menu = menuConfig.find(m => m.id === activeMenu);

  if (activeMenu === 'dashboard') return <DashboardOverview onNavigate={onNavigate} />;
  
  if (activeMenu === 'customers') {
    if (activeSubmenu === 'View All Registered Customers') return <ViewAllCustomers />;
    if (activeSubmenu === 'Track Booking History') return <TrackBookingHistory />;
    if (activeSubmenu === 'Manage Profiles & Preferences') return <ManageProfiles />;
    if (activeSubmenu === 'Handle Complaints & Support Issues') return <HandleComplaints />;
    return <CustomerManagementPage onSelect={(sub) => onNavigate('customers', sub)} />;
  }
  
  if (activeMenu === 'vendors') {
    if (activeSubmenu === '__group_categories__') return <ManageServiceProvidersPage onSelect={onSelectCategory} />;
    if (activeSubmenu === '__group_actions__') return <ActionsPage onSelect={onSelectCategory} />;
    if (activeSubmenu === '__group_verification__') return <VendorVerificationPage onSelect={onSelectCategory} />;
    const Page = CATEGORY_PAGES[activeSubmenu];
    if (Page) return <Page />;
    return <VendorOverview onSelectCategory={onSelectCategory} />;
  }
  
  if (activeMenu === 'bookings') return <BookingManagementPage />;
  if (activeMenu === 'payments') return <PaymentsTransactionsPage />;
  if (activeMenu === 'complaints') return <ComplaintsDisputesPage />;
  if (activeMenu === 'analytics') return <AnalyticsReportsPage />;
  if (activeMenu === 'roles') return <AdminRolesPage />;
  if (activeMenu === 'notifications') return <NotificationsPage />;
  if (activeMenu === 'settings') return <SettingsPage />;
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-64 flex flex-col items-center justify-center text-center">
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{menu?.label || 'Page'}</h3>
      {activeSubmenu ? (
        <div className="mt-3">
          <span className="inline-block bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm font-semibold">{activeSubmenu}</span>
          <p className="text-gray-400 text-sm mt-3">Content for this section will be updated soon.</p>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Select a sub-menu from the left sidebar to get started.</p>
      )}
    </div>
  );
};