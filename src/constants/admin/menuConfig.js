import { ICONS } from './icons';

export const menuConfig = [
  { 
    id: 'dashboard', 
    label: 'Dashboard Overview', 
    icon: ICONS.dashboard, 
    color: 'text-red-600', 
    submenus: [], 
    vendorStyle: false 
  },
  { 
    id: 'customers', 
    label: 'Customer Management', 
    icon: ICONS.customers, 
    color: 'text-blue-600', 
    submenus: [
      'View All Registered Customers', 
      'Track Booking History', 
      'Manage Profiles & Preferences', 
      'Handle Complaints & Support Issues'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'vendors', 
    label: 'Vendor Management', 
    icon: ICONS.vendors, 
    color: 'text-amber-600', 
    submenus: [
      '__group_categories__',
      'Photography',
      'Catering',
      'Wedding Halls',
      'Entertainment & Events',
      'Decorations',
      'Invitations & Gifting',
      'Groom & Bridal Styling',
      'Pre Matrimonial Investigations',
      '__group_actions__',
      'Approve / Reject Vendor Registration',
      'Verify Business Details',
      'Manage Vendor Profiles',
      'Activate / Deactivate Vendors',
      '__group_verification__',
      'Verify: Business License',
      'Verify: GST Details',
      'Verify: ID Proof',
      'Assign: ✅ Verified Vendor Badge'
    ], 
    vendorStyle: true 
  },
  { 
    id: 'bookings', 
    label: 'Booking Management', 
    icon: ICONS.booking, 
    color: 'text-green-600', 
    submenus: [
      'Booking Overview',
      'Booking Status Management',
      'Detailed Booking View',
      'Vendor Assignment',
      'Scheduling & Calendar Management',
      'Payment & Transaction Tracking',
      'Cancellation & Refund Handling',
      'Invoice & Billing Management',
      'Search & Filters',
      'Notifications & Alerts',
      'Booking History & Logs'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'payments', 
    label: 'Payments & Transactions', 
    icon: ICONS.payments, 
    color: 'text-purple-600', 
    submenus: [
      'All Transactions',
      'Pending Payments',
      'Completed Payments',
      'Refunds',
      'Payment Analytics'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'complaints', 
    label: 'Complaints & Disputes', 
    icon: ICONS.complaints, 
    color: 'text-rose-600', 
    submenus: [
      'Open Tickets',
      'In Progress',
      'Resolved',
      'Escalated',
      'Dispute Resolution'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'analytics', 
    label: 'Analytics & Reports', 
    icon: ICONS.analytics, 
    color: 'text-cyan-600', 
    submenus: [
      'Revenue Reports',
      'Booking Analytics',
      'Vendor Performance',
      'Customer Insights',
      'Custom Reports'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'roles', 
    label: 'Admin Roles', 
    icon: ICONS.roles, 
    color: 'text-indigo-600', 
    submenus: [
      'All Admins',
      'Roles Management',
      'Permissions',
      'Activity Logs'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: ICONS.notifications, 
    color: 'text-orange-500', 
    submenus: [
      'Send Notifications',
      'Notification Templates',
      'Notification History',
      'Scheduled Notifications'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: ICONS.settings, 
    color: 'text-gray-600', 
    submenus: [
      'General Settings',
      'Payment Settings',
      'Email Settings',
      'Security Settings',
      'API Configuration'
    ], 
    vendorStyle: false 
  },
];

export const dashboardStats = [
  { label: 'Total Customers', value: '4,821', icon: '👥', color: 'border-red-500', sub: '+128 this month' },
  { label: 'Total Vendors', value: '326', icon: '🏢', color: 'border-amber-500', sub: '48 pending approval' },
  { label: 'Active Bookings', value: '1,204', icon: '📅', color: 'border-green-500', sub: 'In progress' },
  { label: 'Completed Events', value: '8,432', icon: '✅', color: 'border-blue-500', sub: 'All time' },
  { label: 'Revenue Summary', value: '₹28,45,000', icon: '💰', color: 'border-purple-500', sub: '+12% vs last month' },
  { label: 'Pending Requests', value: '47', icon: '⏳', color: 'border-rose-500', sub: 'Needs review' },
];