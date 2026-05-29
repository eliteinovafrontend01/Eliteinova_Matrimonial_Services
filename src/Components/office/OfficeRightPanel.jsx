import React from 'react';

// ✅ Reuse existing admin customer sub-pages
import { TrackBookingHistory } from '../admin/customers/TrackBookingHistory';
import { ManageProfiles } from '../admin/customers/ManageProfiles';
import { HandleComplaints } from '../admin/customers/HandleComplaints';

// ✅ Office-specific wrappers
import { OfficeCustomerWrapper } from './customers/OfficeCustomerWrapper';
import { OfficePanelComplaintsPage } from './complaints/OfficePanelComplaintsPage';
import { DashboardOverview } from '../admin/dashboard/DashboardOverview';

import { officeMenuConfig } from '../../constants/office/menuConfig';

export const OfficeRightPanel = ({ activeMenu, activeSubmenu, onNavigate }) => {

  // ── Dashboard ──────────────────────────────────────────────────────────────
  if (activeMenu === 'dashboard') {
    return <DashboardOverview onNavigate={onNavigate} />;
  }

  // ── Customer Management — 3 sub-pages, each wrapped in 3-month filter ──────
  if (activeMenu === 'customers') {
    if (activeSubmenu === 'Track Booking History') {
      return (
        <OfficeCustomerWrapper>
          <TrackBookingHistory />
        </OfficeCustomerWrapper>
      );
    }
    if (activeSubmenu === 'Manage Profiles & Preferences') {
      return (
        <OfficeCustomerWrapper>
          <ManageProfiles />
        </OfficeCustomerWrapper>
      );
    }
    if (activeSubmenu === 'Handle Complaints & Support Issues') {
      return (
        <OfficeCustomerWrapper>
          <HandleComplaints />
        </OfficeCustomerWrapper>
      );
    }

    // Landing — no sub selected yet
    return <OfficeCustomerLanding onNavigate={onNavigate} />;
  }

  // ── Complaints & Disputes (past 3 months) ─────────────────────────────────
  if (activeMenu === 'complaints') {
    return <OfficePanelComplaintsPage />;
  }

  // ── Catch-all ─────────────────────────────────────────────────────────────
  const menu = officeMenuConfig.find(m => m.id === activeMenu);
  return <AccessDeniedCard feature={menu?.label || activeMenu} />;
};

// ── Customer Landing ──────────────────────────────────────────────────────────
const OfficeCustomerLanding = ({ onNavigate }) => {
  const cards = [
    {
      sub: 'Track Booking History',
      icon: '📅',
      desc: 'View and track customer booking records from the past 3 months',
      color: 'border-red-200 bg-red-50',
      iconBg: 'bg-red-100',
    },
    {
      sub: 'Manage Profiles & Preferences',
      icon: '👤',
      desc: 'Update customer profiles and service preferences',
      color: 'border-rose-200 bg-rose-50',
      iconBg: 'bg-rose-100',
    },
    {
      sub: 'Handle Complaints & Support Issues',
      icon: '🎧',
      desc: 'Resolve customer complaints and support tickets from the past 3 months',
      color: 'border-amber-200 bg-amber-50',
      iconBg: 'bg-amber-100',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 3-month notice on landing too */}
      <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
        <span className="text-rose-500 text-lg">🗓️</span>
        <p className="text-sm text-rose-700 font-medium">
          All customer data is restricted to the <strong>past 3 months only</strong>.
          Contact the Super Admin for older records.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <button
            key={card.sub}
            onClick={() => onNavigate('customers', card.sub)}
            className={`text-left p-5 rounded-2xl border-2 ${card.color} hover:shadow-md transition-all duration-200`}
          >
            <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center text-xl mb-3`}>
              {card.icon}
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">{card.sub}</p>
            <p className="text-xs text-gray-500">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Access Denied ─────────────────────────────────────────────────────────────
const AccessDeniedCard = ({ feature }) => (
  <div className="bg-white rounded-2xl p-10 shadow-sm border border-red-100 min-h-64 flex flex-col items-center justify-center text-center">
    <div className="text-5xl mb-4">🔒</div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">Access Restricted</h3>
    <p className="text-gray-400 text-sm max-w-sm">
      Your office account does not have permission to access{' '}
      <span className="font-semibold text-red-500">{feature}</span>.
      Please contact your Super Admin if you need access.
    </p>
  </div>
);