import React from 'react';

/**
 * OfficeCustomerWrapper
 * 
 * Wraps any customer sub-page with a visible 3-month scope banner.
 * Also exports THREE_MONTHS_AGO and isWithinThreeMonths so your
 * data hooks/fetchers can import and use them to filter API calls.
 */

export const THREE_MONTHS_AGO = (() => {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  d.setHours(0, 0, 0, 0);
  return d;
})();

export const isWithinThreeMonths = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) >= THREE_MONTHS_AGO;
};

export const OfficeCustomerWrapper = ({ children }) => {
  const since = THREE_MONTHS_AGO.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <div className="space-y-4">
      {/* 3-month scope banner — same style as OfficePanelComplaintsPage */}
      <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
        <span className="text-rose-500 text-lg">🗓️</span>
        <p className="text-sm text-rose-700 font-medium">
          Showing data from the <strong>past 3 months only</strong> (since {since}).
          Contact the Super Admin for older records.
        </p>
      </div>

      {/* Actual admin sub-page rendered inside */}
      {children}
    </div>
  );
};