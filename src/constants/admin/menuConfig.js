// src/constants/admin/menuConfig.js
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
      'Complaints & Disputes Dashboard',
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

// Notification submenu configuration for easy reference
export const notificationSubmenusConfig = [
  { 
    id: 'multi-channel', 
    label: 'Multi-Channel Notifications', 
    icon: '📡', 
    description: 'Send notifications through Push, SMS, Email, and In-App',
    features: ['Push Notifications (Mobile App)', 'SMS (OTP & alerts via Twilio)', 'Email Notifications', 'In-app notifications']
  },
  { 
    id: 'event-based', 
    label: 'Event-Based Notifications', 
    icon: '⚡', 
    description: 'Automatically trigger notifications for key activities',
    features: ['User registration & verification', 'Booking confirmation & updates', 'Payment success or failure', 'Vendor approval or rejection', 'Complaint status updates']
  },
  { 
    id: 'custom-creation', 
    label: 'Custom Notification Creation', 
    icon: '✏️', 
    description: 'Create and send custom messages for promotions and announcements',
    features: ['Custom title and message', 'Multiple notification types', 'Audience selection', 'Schedule options']
  },
  { 
    id: 'audience-targeting', 
    label: 'Audience Targeting', 
    icon: '🎯', 
    description: 'Send notifications to specific user groups',
    features: ['All users', 'Customers only', 'Vendors only', 'Selected users']
  },
  { 
    id: 'templates', 
    label: 'Notification Templates', 
    icon: '📋', 
    description: 'Create reusable templates for common messages',
    features: ['Booking confirmations', 'OTP verification', 'Payment receipts', 'Welcome messages']
  },
  { 
    id: 'scheduling', 
    label: 'Scheduling Notifications', 
    icon: '📅', 
    description: 'Schedule notifications at specific dates and times',
    features: ['Date and time scheduling', 'Recurring notifications', 'One-time notifications', 'Auto-send options']
  },
  { 
    id: 'real-time', 
    label: 'Real-Time Alerts', 
    icon: '🔴', 
    description: 'Instantly notify users about important updates',
    features: ['Live feed', 'Priority levels', 'Urgent actions', 'System alerts']
  },
  { 
    id: 'delivery-tracking', 
    label: 'Delivery Tracking', 
    icon: '📦', 
    description: 'Monitor notification status: Sent, Delivered, Failed',
    features: ['Real-time tracking', 'Delivery rates', 'Channel performance', 'Retry options']
  },
  { 
    id: 'user-preferences', 
    label: 'User Preferences Control', 
    icon: '⚙️', 
    description: 'Manage user notification preferences (opt-in/opt-out)',
    features: ['Channel preferences', 'Category subscriptions', 'Opt-in/opt-out', 'Global settings']
  },
  { 
    id: 'history-logs', 
    label: 'History & Logs', 
    icon: '📜', 
    description: 'Record of all notifications sent for tracking and auditing',
    features: ['Audit trail', 'Export options', 'Search & filter', 'User activity logs']
  },
];

// Helper function to get submenus by category
export const getSubmenusByCategory = (categoryId) => {
  const menu = menuConfig.find(m => m.id === categoryId);
  return menu ? menu.submenus : [];
};

// Helper function to check if a menu has submenus
export const hasSubmenus = (categoryId) => {
  const menu = menuConfig.find(m => m.id === categoryId);
  return menu ? menu.submenus.length > 0 : false;
};

// Helper function to get menu by id
export const getMenuById = (menuId) => {
  return menuConfig.find(m => m.id === menuId);
};

// Helper function to get all menu ids
export const getAllMenuIds = () => {
  return menuConfig.map(m => m.id);
};

// Helper function to get menu color by id
export const getMenuColor = (menuId) => {
  const menu = menuConfig.find(m => m.id === menuId);
  return menu ? menu.color : 'text-gray-600';
};