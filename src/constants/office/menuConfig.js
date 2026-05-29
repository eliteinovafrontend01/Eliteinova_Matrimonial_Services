import { ICONS } from '../admin/icons';

export const officeMenuConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard Overview',
    icon: ICONS.dashboard,
    color: 'text-red-600',
    submenus: [],
    vendorStyle: false,
  },
  {
    id: 'customers',
    label: 'Customer Management',
    icon: ICONS.customers,
    color: 'text-red-600',
    // ✅ Remaining 3 only — "View All Registered Customers" removed
    submenus: [
      'Track Booking History',
      'Manage Profiles & Preferences',
      'Handle Complaints & Support Issues',
    ],
    vendorStyle: false,
  },
  {
    id: 'complaints',
    label: 'Complaints & Disputes',
    icon: ICONS.complaints,
    color: 'text-rose-600',
    submenus: [],
    vendorStyle: false,
  },
];