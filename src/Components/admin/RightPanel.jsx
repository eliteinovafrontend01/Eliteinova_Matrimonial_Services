// src/components/admin/layout/RightPanel.jsx
import React, { useState } from 'react';
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

// Booking Management Pages
import { BookingManagementPage } from './bookings/BookingManagementPage';
import { BookingDetailsPage } from './bookings/BookingDetailsPage';
import { BookingOverviewPage } from './bookings/BookingOverviewPage';
import { VendorAssignmentPage } from './bookings/VendorAssignmentPage';
import { SchedulingCalendarPage } from './bookings/SchedulingCalendarPage';
import { PaymentTrackingPage } from './bookings/PaymentTrackingPage';
import { CancellationRefundPage } from './bookings/CancellationRefundPage';
import { InvoiceBillingPage } from './bookings/InvoiceBillingPage';
import { BookingSearchPage } from './bookings/BookingSearchPage';
import { NotificationAlertsPage } from './bookings/NotificationAlertsPage';
import { BookingHistoryPage } from './bookings/BookingHistoryPage';
import { BookingStatusPage } from './bookings/BookingStatusPage';

// Payment Management Pages
import { PaymentsTransactionsPage } from './payments/PaymentsTransactionsPage';
import { TransactionOverview } from './payments/TransactionOverview';
import { PaymentStatusTracking } from './payments/PaymentStatusTracking';
import { MultiplePaymentMethods } from './payments/MultiplePaymentMethods';
import { PaymentGatewayIntegration } from './payments/PaymentGatewayIntegration';
import { InvoiceBillingManagement } from './payments/InvoiceBillingManagement';
import { RefundManagement } from './payments/RefundManagement';
import { VendorPayoutManagement } from './payments/VendorPayoutManagement';
import { CommissionTracking } from './payments/CommissionTracking';
import { TransactionHistoryLogs } from './payments/TransactionHistoryLogs';
import { FraudDetectionSecurity } from './payments/FraudDetectionSecurity';
import { SearchFiltersPayments } from './payments/SearchFiltersPayments';
import { ReportsAnalytics } from './payments/ReportsAnalytics';

// Complaint & Dispute Management Pages
import { ComplaintsDisputesPage } from './complaints/ComplaintsDisputesPage';
import { ComplaintRegistration } from './complaints/ComplaintRegistration';
import { TicketManagementSystem } from './complaints/TicketManagementSystem';
import { IssueCategorization } from './complaints/IssueCategorization';
import { StatusTracking } from './complaints/StatusTracking';
import { DetailedCaseView } from './complaints/DetailedCaseView';
import { CommunicationLogs } from './complaints/CommunicationLogs';
import { DisputeResolutionWorkflow } from './complaints/DisputeResolutionWorkflow';
import { EscalationManagement } from './complaints/EscalationManagement';
import { AdminActions } from './complaints/AdminActions';
import { NotificationsUpdates } from './complaints/NotificationsUpdates';
import { ReportsInsights } from './complaints/ReportsInsights';

// Other Pages
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

// Booking Management Pages Mapping
const BOOKING_PAGES = {
  'Booking Overview': BookingOverviewPage,
  'Booking Management': BookingManagementPage,
  'Detailed Booking View': BookingDetailsPage,
  'Vendor Assignment': VendorAssignmentPage,
  'Scheduling & Calendar Management': SchedulingCalendarPage,
  'Payment & Transaction Tracking': PaymentTrackingPage,
  'Cancellation & Refund Handling': CancellationRefundPage,
  'Invoice & Billing Management': InvoiceBillingPage,
  'Search & Filters': BookingSearchPage,
  'Notifications & Alerts': NotificationAlertsPage,
  'Booking History & Logs': BookingHistoryPage,
  'Booking Status Management': BookingStatusPage,
};

// Payment Management Pages Mapping
const PAYMENT_PAGES = {
  'Payments & Transactions': PaymentsTransactionsPage,
  'Transaction Overview': TransactionOverview,
  'Payment Status Tracking': PaymentStatusTracking,
  'Multiple Payment Methods': MultiplePaymentMethods,
  'Payment Gateway Integration': PaymentGatewayIntegration,
  'Invoice & Billing Management': InvoiceBillingManagement,
  'Refund Management': RefundManagement,
  'Vendor Payout Management': VendorPayoutManagement,
  'Commission Tracking': CommissionTracking,
  'Transaction History & Logs': TransactionHistoryLogs,
  'Fraud Detection & Security': FraudDetectionSecurity,
  'Search & Filters': SearchFiltersPayments,
  'Reports & Analytics': ReportsAnalytics,
};

// Complaint & Dispute Management Pages Mapping
const COMPLAINT_PAGES = {
  'Complaints & Disputes Dashboard': ComplaintsDisputesPage,
  'Complaint Registration': ComplaintRegistration,
  'Ticket Management System': TicketManagementSystem,
  'Issue Categorization': IssueCategorization,
  'Status Tracking': StatusTracking,
  'Detailed Case View': DetailedCaseView,
  'Communication & Interaction Logs': CommunicationLogs,
  'Dispute Resolution Workflow': DisputeResolutionWorkflow,
  'Escalation Management': EscalationManagement,
  'Admin Actions': AdminActions,
  'Notifications & Updates': NotificationsUpdates,
  'Reports & Insights': ReportsInsights,
};

export const RightPanel = ({ activeMenu, activeSubmenu, onSelectCategory, onNavigate, selectedBooking, setSelectedBooking }) => {
  const menu = menuConfig.find(m => m.id === activeMenu);

  // Handle booking detail view
  const handleViewBooking = (booking) => {
    if (setSelectedBooking) {
      setSelectedBooking(booking);
      onNavigate('bookings', 'Detailed Booking View');
    }
  };

  const handleBackFromBookingDetail = () => {
    if (setSelectedBooking) {
      setSelectedBooking(null);
      onNavigate('bookings', 'Booking Overview');
    }
  };

  // Dashboard
  if (activeMenu === 'dashboard') return <DashboardOverview onNavigate={onNavigate} />;
  
  // Customers Section
  if (activeMenu === 'customers') {
    if (activeSubmenu === 'View All Registered Customers') return <ViewAllCustomers />;
    if (activeSubmenu === 'Track Booking History') return <TrackBookingHistory />;
    if (activeSubmenu === 'Manage Profiles & Preferences') return <ManageProfiles />;
    if (activeSubmenu === 'Handle Complaints & Support Issues') return <HandleComplaints />;
    return <CustomerManagementPage onSelect={(sub) => onNavigate('customers', sub)} />;
  }
  
  // Vendors Section
  if (activeMenu === 'vendors') {
    if (activeSubmenu === '__group_categories__') return <ManageServiceProvidersPage onSelect={onSelectCategory} />;
    if (activeSubmenu === '__group_actions__') return <ActionsPage onSelect={onSelectCategory} />;
    if (activeSubmenu === '__group_verification__') return <VendorVerificationPage onSelect={onSelectCategory} />;
    const Page = CATEGORY_PAGES[activeSubmenu];
    if (Page) return <Page />;
    return <VendorOverview onSelectCategory={onSelectCategory} />;
  }
  
  // Bookings Section
  if (activeMenu === 'bookings') {
    // Handle Detailed Booking View with selected booking
    if (activeSubmenu === 'Detailed Booking View' && selectedBooking) {
      return (
        <BookingDetailsPage 
          booking={selectedBooking} 
          onBack={handleBackFromBookingDetail}
          onUpdateStatus={(id, status) => {
            console.log(`Update booking ${id} status to ${status}`);
          }}
          onUpdatePayment={(id, payment) => {
            console.log(`Update booking ${id} payment to ${payment}`);
          }}
        />
      );
    }
    
    // Check if we have a specific booking page component
    const BookingPage = BOOKING_PAGES[activeSubmenu];
    if (BookingPage) {
      return <BookingPage onViewBooking={handleViewBooking} />;
    }
    
    // Default to Booking Overview
    return <BookingManagementPage onSelectBooking={handleViewBooking} />;
  }
  
  // Payments Section - Updated with all payment pages including main page and subpages
  if (activeMenu === 'payments') {
    // Check if we have a specific payment page component
    const PaymentPage = PAYMENT_PAGES[activeSubmenu];
    if (PaymentPage) {
      return <PaymentPage />;
    }
    // Default to Payments & Transactions main page
    return <PaymentsTransactionsPage />;
  }
  
  // Complaints & Disputes Section
  if (activeMenu === 'complaints') {
    // Check if we have a specific complaint page component
    const ComplaintPage = COMPLAINT_PAGES[activeSubmenu];
    if (ComplaintPage) {
      return <ComplaintPage />;
    }
    // Default to Complaints & Disputes Dashboard
    return <ComplaintsDisputesPage />;
  }
  
  if (activeMenu === 'analytics') return <AnalyticsReportsPage />;
  if (activeMenu === 'roles') return <AdminRolesPage />;
  if (activeMenu === 'notifications') return <NotificationsPage />;
  if (activeMenu === 'settings') return <SettingsPage />;
  
  // Fallback for unknown pages
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