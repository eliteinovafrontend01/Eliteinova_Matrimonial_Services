// src/Components/admin/bookings/InvoiceBillingPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { allBookingsData } from '../../../data/admin/bookings';
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

// Invoice Details Modal
const InvoiceDetailsModal = ({ invoice, onClose, onDownload, onEmail }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Invoice Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Invoice Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📄</div>
            <h2 className="text-2xl font-bold text-gray-800">TAX INVOICE</h2>
            <p className="text-xs text-gray-500 mt-1">{invoice.id}</p>
          </div>
          
          {/* Company Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-center">
              <p className="font-bold text-gray-800">Event Management Co.</p>
              <p className="text-xs text-gray-500">123 Business Street, Mumbai - 400001</p>
              <p className="text-xs text-gray-500">GST: 27AAABC1234D1Z | PAN: AAABC1234D</p>
            </div>
          </div>
          
          {/* Bill To */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-1">Bill To:</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-semibold">{invoice.customer}</p>
              <p className="text-xs text-gray-500">Booking ID: {invoice.bookingId}</p>
              <p className="text-xs text-gray-500">Invoice Date: {invoice.date}</p>
              <p className="text-xs text-gray-500">Due Date: {invoice.dueDate}</p>
            </div>
          </div>
          
          {/* Invoice Items */}
          <div className="mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-xs font-semibold text-gray-500">Description</th>
                  <th className="text-right py-2 text-xs font-semibold text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-xs">Event Booking Service</td>
                  <td className="py-2 text-xs text-right">₹{invoice.amount.toLocaleString()}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-xs">GST (18%)</td>
                  <td className="py-2 text-xs text-right">₹{invoice.gst.toLocaleString()}</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2 text-sm">Total</td>
                  <td className="py-2 text-sm text-right">₹{invoice.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Payment Status */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-600">Payment Status:</span>
              <PaymentBadge status={invoice.status} />
            </div>
          </div>
          
          {/* Terms */}
          <div className="text-xs text-gray-400 mt-4 pt-4 border-t">
            <p>Terms & Conditions:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Payment is due within 30 days of invoice date</li>
              <li>Late payment may incur additional charges</li>
              <li>For any queries, please contact support@eventmanagement.com</li>
            </ul>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4 mt-4 border-t">
            <button
              onClick={() => onDownload(invoice)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon d={ICONS.download} size={16} /> Download PDF
            </button>
            <button
              onClick={() => onEmail(invoice)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon d={ICONS.mail} size={16} /> Email Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate Invoice Modal
const GenerateInvoiceModal = ({ bookings, onGenerate, onClose }) => {
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const selectedBooking = bookings.find(b => b.id === selectedBookingId);
  
  const calculateAmounts = () => {
    if (!selectedBooking) return { amount: 0, gst: 0, total: 0 };
    const amount = selectedBooking.amount ? parseInt(selectedBooking.amount.replace(/[^0-9]/g, '')) : 15000;
    const gst = Math.round(amount * 0.18);
    const total = amount + gst;
    return { amount, gst, total };
  };

  const { amount, gst, total } = calculateAmounts();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    const newInvoice = {
      id: `INV-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      bookingId: selectedBookingId,
      customer: selectedBooking?.customer,
      amount: amount,
      gst: gst,
      total: total,
      status: 'Pending',
      date: invoiceDate,
      dueDate: dueDate || new Date(new Date(invoiceDate).setDate(new Date(invoiceDate).getDate() + 30)).toISOString().split('T')[0]
    };
    
    onGenerate(newInvoice);
    onClose();
  };

  useEffect(() => {
    if (invoiceDate && !dueDate) {
      const calculatedDueDate = new Date(invoiceDate);
      calculatedDueDate.setDate(calculatedDueDate.getDate() + 30);
      setDueDate(calculatedDueDate.toISOString().split('T')[0]);
    }
  }, [invoiceDate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Generate New Invoice</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Booking</label>
            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="">Choose a booking...</option>
              {bookings.map(booking => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} - {booking.customer} - {booking.service}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          {selectedBooking && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking Amount:</span>
                <span className="font-semibold">₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">GST (18%):</span>
                <span className="font-semibold">₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-red-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          )}
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm generating invoice for {selectedBooking?.customer}
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedBookingId}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                !selectedBookingId ? 'bg-gray-300 cursor-not-allowed' :
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Generate' : 'Generate Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Email Invoice Modal
const EmailInvoiceModal = ({ invoice, onSend, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onSend(invoice.id, email, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Email Invoice</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="customer@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder={`Dear ${invoice?.customer},\n\nPlease find attached invoice ${invoice?.id} for your booking.`}
            />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
            📧 Invoice will be sent as PDF attachment
          </div>
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm sending invoice to {email}
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isConfirming ? 'Confirm Send' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const InvoiceBillingPage = () => {
  const [search, setSearch] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate invoices from bookings
        const generatedInvoices = allBookingsData.map((b, i) => {
          const amount = b.amount ? parseInt(b.amount.replace(/[^0-9]/g, '')) : 15000 + (i * 5000);
          const gst = Math.round(amount * 0.18);
          const total = amount + gst;
          
          let status = 'Pending';
          if (b.paymentStatus === 'Completed') status = 'Paid';
          else if (b.paymentStatus === 'Partial') status = 'Partially Paid';
          else if (b.paymentStatus === 'Refunded') status = 'Refunded';
          
          return {
            id: `INV-${String(i + 1).padStart(3, '0')}`,
            bookingId: b.id,
            customer: b.customer,
            amount: amount,
            gst: gst,
            total: total,
            status: status,
            date: b.bookingDate,
            dueDate: new Date(new Date(b.bookingDate).setDate(new Date(b.bookingDate).getDate() + 30)).toISOString().split('T')[0],
            service: b.service,
            vendor: b.vendor
          };
        });
        
        setInvoices(generatedInvoices);
      } catch (err) {
        setError('Failed to load invoice data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInvoices();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filtered = useMemo(() => {
    return invoices.filter(i => 
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.toLowerCase().includes(search.toLowerCase())
    );
  }, [invoices, search]);

  const stats = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, i) => sum + i.total, 0);
    const paidAmount = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0);
    const pendingAmount = invoices.filter(i => i.status === 'Pending' || i.status === 'Partially Paid').reduce((sum, i) => sum + (i.total - (i.status === 'Partially Paid' ? i.total * 0.6 : 0)), 0);
    const overdueCount = invoices.filter(i => i.status === 'Pending' && new Date(i.dueDate) < new Date()).length;
    
    return {
      totalInvoices,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueCount,
      paidCount: invoices.filter(i => i.status === 'Paid').length,
      pendingCount: invoices.filter(i => i.status === 'Pending').length,
      partialCount: invoices.filter(i => i.status === 'Partially Paid').length
    };
  }, [invoices]);

  const handleGenerateInvoice = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    showToast(`Invoice ${newInvoice.id} generated successfully!`, 'success');
  };

  const handleDownloadInvoice = (invoice) => {
    showToast(`Downloading invoice ${invoice.id}...`, 'success');
    // In real implementation, this would generate and download PDF
  };

  const handleEmailInvoice = (invoiceId, email, message) => {
    showToast(`Invoice sent to ${email} successfully!`, 'success');
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const exportToCSV = () => {
    try {
      const exportData = filtered.map(i => ({
        'Invoice #': i.id,
        'Booking ID': i.bookingId,
        'Customer': i.customer,
        'Service': i.service,
        'Amount': i.amount,
        'GST': i.gst,
        'Total': i.total,
        'Status': i.status,
        'Invoice Date': i.date,
        'Due Date': i.dueDate
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
      link.download = `invoices_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filtered.length} invoices!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  const statCards = [
    { label: 'Total Invoices', value: stats.totalInvoices, icon: '📄', color: 'border-blue-400' },
    { label: 'Total Amount', value: `₹${(stats.totalAmount / 100000).toFixed(2)}L`, icon: '💰', color: 'border-green-400' },
    { label: 'Paid Amount', value: `₹${(stats.paidAmount / 100000).toFixed(2)}L`, icon: '✅', color: 'border-emerald-400' },
    { label: 'Pending Amount', value: `₹${(stats.pendingAmount / 1000).toFixed(0)}K`, icon: '⏳', color: 'border-amber-400' },
  ];

  const featureCards = [
    { emoji: '📄', title: 'Auto-Generated Invoices', accentColor: 'bg-blue-50', points: ['Automatic on booking', 'Custom templates', 'Sequential numbering', 'Brand customization'] },
    { emoji: '📧', title: 'Email Delivery', accentColor: 'bg-green-50', points: ['Send to customers', 'CC to vendors', 'Reminder system', 'Delivery tracking'] },
    { emoji: '💳', title: 'Payment Integration', accentColor: 'bg-purple-50', points: ['Pay Now button', 'Status sync', 'Partial payments', 'Receipt generation'] },
    { emoji: '📊', title: 'Billing Analytics', accentColor: 'bg-amber-50', points: ['Revenue reports', 'GST summary', 'Outstanding tracking', 'Collection forecast'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {showGenerateModal && (
        <GenerateInvoiceModal 
          bookings={allBookingsData}
          onGenerate={handleGenerateInvoice}
          onClose={() => setShowGenerateModal(false)}
        />
      )}

      {showDetailsModal && selectedInvoice && (
        <InvoiceDetailsModal 
          invoice={selectedInvoice}
          onDownload={handleDownloadInvoice}
          onEmail={() => {
            setShowDetailsModal(false);
            setShowEmailModal(true);
          }}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedInvoice(null);
          }}
        />
      )}

      {showEmailModal && selectedInvoice && (
        <EmailInvoiceModal 
          invoice={selectedInvoice}
          onSend={handleEmailInvoice}
          onClose={() => {
            setShowEmailModal(false);
            setSelectedInvoice(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📄</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Invoice & Billing Management</h3>
              <p className="text-sm text-gray-500 mt-0.5">Generate invoices and maintain billing records for each booking</p>
            </div>
          </div>
          <button 
            onClick={() => setShowGenerateModal(true)} 
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.plus} size={16} /> Generate Invoice
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.invoice} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Invoice Records</h3>
                <p className="text-xs text-gray-400">{filtered.length} invoice{filtered.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Icon d={ICONS.download} size={13} /> Export CSV
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              type="text" 
              placeholder="Search by invoice #, booking ID or customer..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Invoice #</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">GST</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Total</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Due Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">
                    No invoices found for the selected filters.
                   </td>
                 </tr>
              ) : (
                filtered.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{inv.id}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{inv.bookingId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                          {inv.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{inv.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{inv.service}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">₹{inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">₹{inv.gst.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">₹{inv.total.toLocaleString()}</td>
                    <td className="px-4 py-3"><PaymentBadge status={inv.status} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{inv.dueDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button 
                          onClick={() => handleViewInvoice(inv)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Invoice"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(inv)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                          title="Download PDF"
                        >
                          <Icon d={ICONS.download} size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setShowEmailModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors"
                          title="Email Invoice"
                        >
                          <Icon d={ICONS.mail} size={14} />
                        </button>
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
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No invoices found for the selected filters.
            </div>
          ) : (
            filtered.map(inv => (
              <div key={inv.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{inv.id}</div>
                    <div className="text-xs text-gray-400 font-mono">{inv.bookingId}</div>
                  </div>
                  <PaymentBadge status={inv.status} />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                    {inv.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{inv.customer}</div>
                    <div className="text-xs text-gray-500">{inv.service}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-gray-800 ml-1">₹{inv.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">GST:</span>
                    <span className="text-gray-800 ml-1">₹{inv.gst.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total:</span>
                    <span className="text-gray-800 font-bold ml-1">₹{inv.total.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Due:</span>
                    <span className="text-gray-800 ml-1">{inv.dueDate}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t">
                  <button 
                    onClick={() => handleViewInvoice(inv)}
                    className="flex-1 px-2 py-1.5 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDownloadInvoice(inv)}
                    className="flex-1 px-2 py-1.5 bg-green-50 text-green-600 text-xs rounded-lg hover:bg-green-100 transition-colors"
                  >
                    PDF
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedInvoice(inv);
                      setShowEmailModal(true);
                    }}
                    className="flex-1 px-2 py-1.5 bg-purple-50 text-purple-600 text-xs rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Email
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">
                Paid: <span className="font-semibold text-green-600">{stats.paidCount}</span>
              </span>
              <span className="text-gray-500">
                Pending: <span className="font-semibold text-amber-600">{stats.pendingCount}</span>
              </span>
              <span className="text-gray-500">
                Partial: <span className="font-semibold text-blue-600">{stats.partialCount}</span>
              </span>
              <span className="text-gray-500">
                Overdue: <span className="font-semibold text-red-600">{stats.overdueCount}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Total Revenue: <span className="font-bold text-gray-800">₹{(stats.totalAmount / 100000).toFixed(2)}L</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
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