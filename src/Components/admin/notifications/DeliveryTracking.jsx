// src/components/admin/notifications/DeliveryTracking.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
    <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
    <div className="text-red-500 mb-4">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-slide-in">
    <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      'bg-blue-500'
    } text-white`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <Icon d={ICONS.cancel} size={16} />
      </button>
    </div>
  </div>
);

// Delivery Details Modal
const DeliveryDetailsModal = ({ delivery, onClose }) => {
  if (!delivery) return null;

  const getChannelIcon = (channel) => {
    const icons = {
      'Push': '📱',
      'SMS': '💬',
      'Email': '📧',
      'In-App': '🔔'
    };
    return icons[channel] || '📨';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-50 text-green-700 border-green-200',
      'Failed': 'bg-red-50 text-red-700 border-red-200',
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'Sent': 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Delivery Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">{getChannelIcon(delivery.channel)}</div>
            <h4 className="text-lg font-bold text-gray-800">{delivery.notification}</h4>
            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(delivery.status)}`}>
              {delivery.status}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Notification ID</span>
              <span className="text-sm font-mono text-gray-700">{delivery.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channel</span>
              <span className="text-sm font-semibold text-gray-700">{delivery.channel}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Sent Time</span>
              <span className="text-sm font-semibold text-gray-700">{delivery.sent}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Delivered Time</span>
              <span className="text-sm font-semibold text-gray-700">{delivery.delivered}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Delivery Rate</span>
              <span className="text-sm font-semibold text-green-600">{delivery.rate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Delivery Time</span>
              <span className="text-sm font-semibold text-gray-700">{delivery.deliveryTime || '2.3 min'}</span>
            </div>
            {delivery.recipients && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Recipients</span>
                <span className="text-sm font-semibold text-gray-700">{delivery.recipients}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Analytics Modal - Subtle and Professional
const AnalyticsModal = ({ stats, onClose }) => {
  const channelData = [
    { name: 'Push', rate: 92, color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'SMS', rate: 95, color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Email', rate: 78, color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'In-App', rate: 88, color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
        {/* Header - Subtle gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-red-50/80 to-amber-50/80 border-b border-gray-100 p-5 rounded-t-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.tracking} size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Delivery Analytics</h3>
                <p className="text-xs text-gray-500">Performance overview of your notification delivery</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Summary Stats - Clean cards with subtle colors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Total Sent</p>
              <p className="text-xl font-bold text-gray-800">{stats.totalSent}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Delivered</p>
              <p className="text-xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Failed</p>
              <p className="text-xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Pending</p>
              <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
            </div>
          </div>

          {/* Delivery Rate - Clean progress bar */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-700">Delivery Rate</p>
                <p className="text-xs text-gray-400">Overall delivery success rate</p>
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.deliveryRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${stats.deliveryRate}%` }}
              ></div>
            </div>
          </div>

          {/* Channel Performance - Clean and minimal */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-gray-400">📡</span> Channel Performance
            </h4>
            <div className="space-y-3">
              {channelData.map((channel) => (
                <div key={channel.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${channel.color}`}></span>
                      <span className="text-sm text-gray-600">{channel.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${channel.textColor}`}>{channel.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${channel.color} h-2 rounded-full transition-all duration-1000`} 
                      style={{ width: `${channel.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Insights - Clean cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Best Performing Channel</p>
              <p className="text-base font-bold text-gray-800">SMS</p>
              <p className="text-xs text-gray-400">95% delivery rate</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Average Delivery Time</p>
              <p className="text-base font-bold text-gray-800">2.3 min</p>
              <p className="text-xs text-gray-400">Fastest: 0.5 min (Push)</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [timeRange, setTimeRange] = useState('Today');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [stats, setStats] = useState({
    totalSent: 0,
    delivered: 0,
    failed: 0,
    pending: 0,
    deliveryRate: 0
  });

  // Load delivery data
  useEffect(() => {
    const loadDeliveries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleDeliveries = [
          { 
            id: 'DEL001', 
            notification: 'Booking Confirmation', 
            channel: 'Push', 
            sent: '12:30 PM', 
            delivered: '12:31 PM', 
            status: 'Delivered', 
            rate: '98%',
            deliveryTime: '1.2 min',
            recipients: '1,247'
          },
          { 
            id: 'DEL002', 
            notification: 'OTP Verification', 
            channel: 'SMS', 
            sent: '12:35 PM', 
            delivered: '12:36 PM', 
            status: 'Delivered', 
            rate: '96%',
            deliveryTime: '0.8 min',
            recipients: '856'
          },
          { 
            id: 'DEL003', 
            notification: 'Weekly Newsletter', 
            channel: 'Email', 
            sent: '10:00 AM', 
            delivered: '10:15 AM', 
            status: 'Delivered', 
            rate: '87%',
            deliveryTime: '15.2 min',
            recipients: '5,432'
          },
          { 
            id: 'DEL004', 
            notification: 'Payment Reminder', 
            channel: 'Push', 
            sent: '09:00 AM', 
            delivered: '09:02 AM', 
            status: 'Delivered', 
            rate: '92%',
            deliveryTime: '2.1 min',
            recipients: '2,103'
          },
          { 
            id: 'DEL005', 
            notification: 'Promotional Offer', 
            channel: 'Email', 
            sent: '02:00 PM', 
            delivered: '02:20 PM', 
            status: 'Delivered', 
            rate: '75%',
            deliveryTime: '20.5 min',
            recipients: '8,765'
          },
          { 
            id: 'DEL006', 
            notification: 'Event Reminder', 
            channel: 'SMS', 
            sent: '11:30 AM', 
            delivered: '11:32 AM', 
            status: 'Delivered', 
            rate: '94%',
            deliveryTime: '1.8 min',
            recipients: '634'
          },
          { 
            id: 'DEL007', 
            notification: 'Vendor Approval', 
            channel: 'Email', 
            sent: '08:45 AM', 
            delivered: '08:50 AM', 
            status: 'Failed', 
            rate: '0%',
            deliveryTime: 'Failed',
            recipients: '45'
          },
          { 
            id: 'DEL008', 
            notification: 'Payment Success', 
            channel: 'Push', 
            sent: '03:15 PM', 
            delivered: '03:16 PM', 
            status: 'Delivered', 
            rate: '99%',
            deliveryTime: '0.5 min',
            recipients: '2,891'
          },
          { 
            id: 'DEL009', 
            notification: 'Welcome Message', 
            channel: 'In-App', 
            sent: '01:00 PM', 
            delivered: '01:05 PM', 
            status: 'Pending', 
            rate: '60%',
            deliveryTime: '5.2 min',
            recipients: '1,543'
          },
          { 
            id: 'DEL010', 
            notification: 'Feedback Request', 
            channel: 'Email', 
            sent: '04:20 PM', 
            delivered: '04:25 PM', 
            status: 'Delivered', 
            rate: '82%',
            deliveryTime: '5.0 min',
            recipients: '3,210'
          },
        ];
        
        setDeliveries(sampleDeliveries);
        
        const totalSent = sampleDeliveries.length;
        const delivered = sampleDeliveries.filter(d => d.status === 'Delivered').length;
        const failed = sampleDeliveries.filter(d => d.status === 'Failed').length;
        const pending = sampleDeliveries.filter(d => d.status === 'Pending').length;
        const deliveryRate = totalSent > 0 ? Math.round((delivered / totalSent) * 100) : 0;
        
        setStats({
          totalSent,
          delivered,
          failed,
          pending,
          deliveryRate
        });
      } catch (err) {
        setError('Failed to load delivery data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDeliveries();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filteredDeliveries = useMemo(() => {
    let filtered = deliveries;
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(d => d.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.notification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [deliveries, filterStatus, searchTerm]);

  const handleFilterChange = (filter) => {
    setFilterStatus(filter);
  };

  const handleRetryDelivery = (deliveryId) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === deliveryId
          ? { ...delivery, status: 'Delivered', rate: '98%', delivered: new Date().toLocaleTimeString() }
          : delivery
      )
    );
    
    setStats(prevStats => ({
      ...prevStats,
      delivered: prevStats.delivered + 1,
      failed: prevStats.failed - 1,
      deliveryRate: Math.round(((prevStats.delivered + 1) / prevStats.totalSent) * 100)
    }));
    
    showToast(`Delivery retried successfully for ${deliveryId}!`, 'success');
  };

  const handleExport = () => {
    try {
      const exportData = filteredDeliveries.map(d => ({
        'ID': d.id,
        'Notification': d.notification,
        'Channel': d.channel,
        'Sent Time': d.sent,
        'Delivered Time': d.delivered,
        'Status': d.status,
        'Delivery Rate': d.rate,
        'Delivery Time': d.deliveryTime || 'N/A',
        'Recipients': d.recipients || 'N/A'
      }));
      
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join(','),
        ...exportData.map(row => headers.map(header => 
          `"${(row[header] || '').toString().replace(/"/g, '""')}"`
        ).join(','))
      ];
      
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `delivery_tracking_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filteredDeliveries.length} deliveries!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-50 text-green-700',
      'Failed': 'bg-red-50 text-red-700',
      'Pending': 'bg-amber-50 text-amber-700',
      'Sent': 'bg-blue-50 text-blue-700'
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const getChannelColor = (channel) => {
    const colors = {
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'Email': 'bg-purple-50 text-purple-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channel] || 'bg-gray-50 text-gray-700';
  };

  const statCards = [
    { 
      label: 'Total Sent', 
      value: stats.totalSent.toLocaleString(), 
      icon: '📨', 
      color: 'border-blue-400',
      filter: 'All'
    },
    { 
      label: 'Delivered', 
      value: stats.delivered.toLocaleString(), 
      icon: '✅', 
      color: 'border-green-400',
      filter: 'Delivered'
    },
    { 
      label: 'Failed', 
      value: stats.failed.toLocaleString(), 
      icon: '❌', 
      color: 'border-red-400',
      filter: 'Failed'
    },
    { 
      label: 'Pending', 
      value: stats.pending.toLocaleString(), 
      icon: '⏳', 
      color: 'border-amber-400',
      filter: 'Pending'
    },
    { 
      label: 'Delivery Rate', 
      value: `${stats.deliveryRate}%`, 
      icon: '📊', 
      color: 'border-purple-400',
      filter: null
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {showDetailsModal && selectedDelivery && (
        <DeliveryDetailsModal 
          delivery={selectedDelivery}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedDelivery(null);
          }}
        />
      )}

      {showAnalyticsModal && (
        <AnalyticsModal 
          stats={stats}
          onClose={() => setShowAnalyticsModal(false)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📦</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Delivery Tracking</h3>
            <p className="text-sm text-gray-500 mt-0.5">Monitor notification status: Sent, Delivered, Pending, or Failed</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => s.filter && handleFilterChange(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${filterStatus === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
            role={s.filter ? "button" : "status"}
            tabIndex={s.filter ? 0 : -1}
            aria-label={s.filter ? `Filter by ${s.label}` : undefined}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {filterStatus === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.tracking} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Delivery Status</h3>
                <p className="text-xs text-gray-400">
                  {filteredDeliveries.length} delivery{filteredDeliveries.length !== 1 ? 's' : ''}
                  {filterStatus !== 'All' ? ` (filtered: ${filterStatus})` : ' total'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {filterStatus !== 'All' && (
                <button 
                  onClick={() => handleFilterChange('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filter
                </button>
              )}
              <button 
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.download} size={13} />
                Export CSV
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon d={ICONS.search} size={15} />
                </span>
                <input 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  type="text" 
                  placeholder="Search by notification, ID or channel..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="Today">📅 Today</option>
                <option value="Week">📅 This Week</option>
                <option value="Month">📅 This Month</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Delivered', 'Pending', 'Sent', 'Failed'].map(f => (
                <button 
                  key={f} 
                  onClick={() => handleFilterChange(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                    filterStatus === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notification</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channel</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sent</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Delivered</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDeliveries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-sm text-gray-400">
                    No deliveries found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{delivery.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{delivery.notification}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(delivery.channel)}`}>
                        {delivery.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{delivery.sent}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{delivery.delivered}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${delivery.status === 'Delivered' ? 'text-green-600' : delivery.status === 'Failed' ? 'text-red-600' : 'text-amber-600'}`}>
                        {delivery.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedDelivery(delivery);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        {delivery.status === 'Failed' && (
                          <button 
                            onClick={() => handleRetryDelivery(delivery.id)}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                            title="Retry Delivery"
                          >
                            <Icon d={ICONS.reload} size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden p-4">
          {filteredDeliveries.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No deliveries found for the selected filters.
            </div>
          ) : (
            filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{delivery.notification}</div>
                    <div className="text-xs text-gray-400 font-mono">{delivery.id}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getStatusColor(delivery.status)}`}>
                    {delivery.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Channel:</span>
                    <span className={`ml-1 font-medium ${getChannelColor(delivery.channel)}`}>{delivery.channel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Rate:</span>
                    <span className={`ml-1 font-semibold ${delivery.status === 'Delivered' ? 'text-green-600' : 'text-amber-600'}`}>
                      {delivery.rate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Sent:</span>
                    <span className="text-gray-700 ml-1">{delivery.sent}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Delivered:</span>
                    <span className="text-gray-700 ml-1">{delivery.delivered}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setSelectedDelivery(delivery);
                      setShowDetailsModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  {delivery.status === 'Failed' && (
                    <button 
                      onClick={() => handleRetryDelivery(delivery.id)}
                      className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                      title="Retry Delivery"
                    >
                      <Icon d={ICONS.reload} size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📊</div>
              <div>
                <p className="text-sm font-bold text-gray-800">Delivery Analytics</p>
                <p className="text-xs text-gray-500">
                  Average delivery time: 2.3 minutes • Success rate: {stats.deliveryRate}%
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowAnalyticsModal(true)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Delivery Insights</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Sent</p>
              <p className="text-lg font-bold text-blue-600">{stats.totalSent}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Delivered</p>
              <p className="text-lg font-bold text-green-600">{stats.delivered}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Failed</p>
              <p className="text-lg font-bold text-red-600">{stats.failed}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-bold text-amber-600">{stats.pending}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};