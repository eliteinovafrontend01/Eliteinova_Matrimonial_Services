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

// Settings submenu configuration with detailed properties for each setting
export const settingsSubmenusConfig = [
  { 
    id: 'general', 
    label: 'General Settings', 
    icon: '⚙️',
    description: 'Manage basic platform details including app name, logo, company information, and regional settings',
    fields: [
      { label: 'App Name', type: 'text', placeholder: 'Wedding Services Platform', name: 'appName' },
      { label: 'Company Name', type: 'text', placeholder: 'Wedding Services Pvt Ltd', name: 'companyName' },
      { label: 'Contact Email', type: 'email', placeholder: 'support@weddingservices.com', name: 'contactEmail' },
      { label: 'Contact Phone', type: 'text', placeholder: '+91 98765 43210', name: 'contactPhone' },
      { label: 'Time Zone', type: 'select', options: ['IST (UTC+5:30)', 'GMT (UTC+0)', 'EST (UTC-5)', 'PST (UTC-8)'], name: 'timeZone' },
      { label: 'Default Language', type: 'select', options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'], name: 'language' }
    ],
    features: ['App name & logo management', 'Company information', 'Contact details', 'Time zone & language']
  },
  { 
    id: 'users', 
    label: 'User Settings', 
    icon: '👥',
    description: 'Configure customer-related options including registration, login, and profile settings',
    toggles: [
      { label: 'Allow new user registration', key: 'allowRegistration', default: true },
      { label: 'Enable OTP verification via SMS (Twilio)', key: 'otpVerification', default: true },
      { label: 'Require email verification', key: 'emailVerification', default: true },
      { label: 'Allow social login (Google/Facebook)', key: 'socialLogin', default: false }
    ],
    features: ['Registration settings', 'OTP verification', 'Profile visibility', 'Login preferences']
  },
  { 
    id: 'vendors', 
    label: 'Vendor Settings', 
    icon: '🏢',
    description: 'Manage vendor-related configurations including registration, verification, and commission',
    radios: [
      { name: 'approval', label: 'Manual approval required', value: 'manual', default: true },
      { name: 'approval', label: 'Auto-approve new vendors', value: 'auto', default: false }
    ],
    docs: ['Business Registration Certificate', 'Government ID Proof', 'Address Proof', 'GST Certificate'],
    features: ['Approval workflow', 'Document requirements', 'Commission settings', 'Verification rules']
  },
  { 
    id: 'payments', 
    label: 'Payment Settings', 
    icon: '💰',
    description: 'Configure payment gateways, currency settings, tax configuration, and refund policies',
    gateways: ['Razorpay', 'Stripe', 'PayPal'],
    currency: 'INR (₹)',
    tax: 18,
    features: ['Gateway integration', 'Currency & tax', 'Refund policies', 'Payout management']
  },
  { 
    id: 'notifications', 
    label: 'Notification Settings', 
    icon: '🔔',
    description: 'Manage notification services including SMS gateway, email server, and push notifications',
    smtp: { host: 'smtp.gmail.com', port: '587' },
    providers: ['Twilio', 'Firebase'],
    features: ['SMS gateway', 'Email server', 'Push notifications', 'Alert preferences']
  },
  { 
    id: 'kyc', 
    label: 'KYC & Verification Settings', 
    icon: '🪪',
    description: 'Configure verification processes including ID verification and KYC rules',
    services: ['HyperVerge', 'Signzy'],
    docs: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID'],
    features: ['ID verification', 'Document validation', 'Auto-verification', 'Fraud detection']
  },
  { 
    id: 'booking', 
    label: 'Booking Settings', 
    icon: '📅',
    description: 'Customize booking flow including approval process, cancellation rules, and availability settings',
    toggles: [
      { label: 'Allow instant booking', key: 'instantBooking', default: true },
      { label: 'Enable booking cancellation', key: 'cancellationAllowed', default: true },
      { label: 'Allow rescheduling', key: 'reschedulingAllowed', default: true }
    ],
    features: ['Booking flow', 'Cancellation rules', 'Time slots', 'Availability settings']
  },
  { 
    id: 'security', 
    label: 'Security Settings', 
    icon: '🔒',
    description: 'Ensure platform safety with password policies, access control, and login attempt limits',
    toggles: [
      { label: 'Require strong password (min 8 chars)', key: 'strongPassword', default: true },
      { label: 'Password expiry (90 days)', key: 'passwordExpiry', default: true },
      { label: 'Enforce 2FA for admin accounts', key: 'twoFactorAuth', default: false },
      { label: 'Enable login attempt limits', key: 'loginAttempts', default: true }
    ],
    features: ['Password policies', '2FA enforcement', 'Access control', 'Security logs']
  },
  { 
    id: 'content', 
    label: 'Content Management Settings', 
    icon: '📄',
    description: 'Update static pages including Privacy Policy, Terms & Conditions, About Us, and FAQs',
    pages: ['Privacy Policy', 'Terms & Conditions', 'About Us', 'FAQs'],
    features: ['Privacy Policy', 'Terms & Conditions', 'About Us', 'FAQs']
  },
  { 
    id: 'commission', 
    label: 'Commission & Pricing Settings', 
    icon: '💎',
    description: 'Set platform charges including vendor commission, service fees, and subscription plans',
    plans: ['Silver', 'Gold', 'Diamond'],
    features: ['Commission rates', 'Service fees', 'Subscription plans', 'Revenue tracking']
  }
];

// Dashboard Stats
export const dashboardStats = [
  { label: 'Total Customers', value: '4,821', icon: '👥', color: 'border-red-500', sub: '+128 this month' },
  { label: 'Total Vendors', value: '326', icon: '🏢', color: 'border-amber-500', sub: '48 pending approval' },
  { label: 'Active Bookings', value: '1,204', icon: '📅', color: 'border-green-500', sub: 'In progress' },
  { label: 'Completed Events', value: '8,432', icon: '✅', color: 'border-blue-500', sub: 'All time' },
  { label: 'Revenue Summary', value: '₹28,45,000', icon: '💰', color: 'border-purple-500', sub: '+12% vs last month' },
  { label: 'Pending Requests', value: '47', icon: '⏳', color: 'border-rose-500', sub: 'Needs review' },
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

// Helper function to get settings submenu by id
export const getSettingsSubmenuById = (submenuId) => {
  return settingsSubmenusConfig.find(s => s.id === submenuId);
};

// Helper function to get settings submenu by label
export const getSettingsSubmenuByLabel = (label) => {
  return settingsSubmenusConfig.find(s => s.label === label);
};

// Helper function to get all settings submenu labels
export const getSettingsSubmenuLabels = () => {
  return settingsSubmenusConfig.map(s => s.label);
};

// Helper function to get settings submenu ID from label
export const getSettingsSubmenuIdFromLabel = (label) => {
  const submenu = settingsSubmenusConfig.find(s => s.label === label);
  return submenu ? submenu.id : null;
};

// Export settings submenu labels array for easy access
export const settingsSubmenuLabels = settingsSubmenusConfig.map(s => s.label);