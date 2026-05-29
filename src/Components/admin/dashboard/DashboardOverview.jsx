import { StatCard } from '../shared/StatCard';
import { dashboardStats } from '../../../constants/admin/menuConfig';

export const DashboardOverview = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <StatCard {...dashboardStats[0]} onClick={() => onNavigate('customers', 'View All Registered Customers')} />
      <StatCard {...dashboardStats[1]} onClick={() => onNavigate('vendors', null)} />
      <StatCard {...dashboardStats[2]} onClick={() => onNavigate('bookings', 'View all bookings')} />
      <StatCard {...dashboardStats[3]} onClick={() => onNavigate('bookings', 'Status: Completed')} />
      <StatCard {...dashboardStats[4]} onClick={() => onNavigate('payments', 'Track Customer Payments')} />
      <StatCard {...dashboardStats[5]} onClick={() => onNavigate('complaints', 'Customer Complaints')} />
    </div>
  );
};