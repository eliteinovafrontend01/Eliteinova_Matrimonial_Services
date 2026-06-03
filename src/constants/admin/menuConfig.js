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
      'Transaction Overview',
      'Payment Status Tracking',
      'Multiple Payment Methods',
      'Payment Gateway Integration',
      'Invoice & Billing Management',
      'Refund Management',
      'Vendor Payout Management',
      'Commission Tracking',
      'Transaction History & Logs',
      'Fraud Detection & Security',
      'Search & Filters',
      'Reports & Analytics'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'complaints', 
    label: 'Complaints & Disputes', 
    icon: ICONS.complaints, 
    color: 'text-rose-600', 
    submenus: [
      'Complaint Registration',
      'Ticket Management System',
      'Issue Categorization',
      'Status Tracking',
      'Detailed Case View',
      'Communication & Interaction Logs',
      'Dispute Resolution Workflow',
      'Escalation Management',
      'Admin Actions',
      'Notifications & Updates',
      'Reports & Insights'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'analytics', 
    label: 'Analytics & Reports', 
    icon: ICONS.analytics, 
    color: 'text-cyan-600', 
    submenus: [
      'Dashboard Analytics Overview',
      'User & Customer Insights',
      'Vendor Performance Reports',
      'Booking Analytics',
      'Revenue & Financial Reports',
      'Complaint & Support Reports',
      'Conversion & Growth Metrics',
      'Custom Reports Generation',
      'Data Export Options',
      'Visual Charts & Graphs'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'roles', 
    label: 'Admin Roles', 
    icon: ICONS.roles, 
    color: 'text-indigo-600', 
    submenus: [
      'Role Creation & Management',
      'Permission-Based Access Control',
      'Custom Role Configuration',
      'User Assignment',
      'Access Restrictions',
      'Activity Monitoring',
      'Audit Logs',
      'Secure Authentication',
      'Role Editing & Deactivation',
      'Common Admin Roles'
    ], 
    vendorStyle: false 
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: ICONS.notifications, 
    color: 'text-orange-500', 
    submenus: [
      'Multi-Channel Notifications',
      'Event-Based Notifications',
      'Custom Notification Creation',
      'Audience Targeting',
      'Notification Templates',
      'Scheduling Notifications',
      'Real-Time Alerts',
      'Delivery Tracking',
      'User Preferences Control',
      'History & Logs'

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
      'User Settings',
      'Vendor Settings',
      'Payment Settings',
      'Notification Settings',
      'KYC & Verification Settings',
      'Booking Settings',
      'Security Settings',
      'Content Management Settings',
      'Commission & Pricing Settings'
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