// src/components/admin/payments/InvoiceBillingManagement.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

// Helper function to format currency with appropriate units
const formatCurrency = (amount) => {
  if (amount >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh = 100,000
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) { // 1 Thousand = 1,000
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount}`;
  }
};

const mockInvoices = [
  { id: 'INV001', bookingId: 'BKG001', customer: 'Priya Sharma', service: 'Wedding Photography', amount: 25000, tax: 4500, total: 29500, status: 'Paid', issueDate: '2024-01-10', dueDate: '2024-01-15', paidDate: '2024-01-15' },
  { id: 'INV002', bookingId: 'BKG002', customer: 'Amit Patel', service: 'Catering', amount: 45000, tax: 8100, total: 53100, status: 'Pending', issueDate: '2024-01-12', dueDate: '2024-01-20', paidDate: null },
  { id: 'INV003', bookingId: 'BKG003', customer: 'Neha Gupta', service: 'Wedding Hall', amount: 150000, tax: 27000, total: 177000, status: 'Overdue', issueDate: '2024-01-01', dueDate: '2024-01-10', paidDate: null },
];

const InvoicePreviewModal = ({ invoice, onClose, onSendEmail }) => {
  if (!invoice) return null;

  const handlePrint = () => { window.print(); };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between">
          <h3 className="text-lg font-bold">Invoice #{invoice.id}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">EVENTPLAN</h1>
            <p className="text-gray-500">123 Event Street, Mumbai - 400001</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-xs">Bill To:</p>
              <p className="font-semibold">{invoice.customer}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Invoice Date</p>
              <p>{invoice.issueDate}</p>
              <p className="text-gray-400 text-xs mt-1">Due Date</p>
              <p>{invoice.dueDate}</p>
            </div>
          </div>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Description</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Amount</th>
               </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-sm">{invoice.service}</td>
                <td className="text-right">{formatCurrency(invoice.amount)}</td>
               </tr>
              <tr className="border-b">
                <td className="py-2 text-sm">Tax (18% GST)</td>
                <td className="text-right">{formatCurrency(invoice.tax)}</td>
               </tr>
              <tr className="font-bold">
                <td className="py-2 text-base">Total</td>
                <td className="text-right text-lg">{formatCurrency(invoice.total)}</td>
               </tr>
            </tbody>
          </table>
          <div className="flex gap-3 justify-end">
            <button onClick={handlePrint} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">🖨️ Print</button>
            <button onClick={() => onSendEmail(invoice.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">📧 Send Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenerateInvoiceModal = ({ onClose, onGenerate }) => {
  const [formData, setFormData] = useState({ bookingId: '', customer: '', service: '', amount: '', tax: '18', dueDays: '7' });
  const [previewAmount, setPreviewAmount] = useState(0);
  const [previewTax, setPreviewTax] = useState(0);
  const [previewTotal, setPreviewTotal] = useState(0);

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    const taxRate = parseFloat(formData.tax) || 0;
    const tax = amount * taxRate / 100;
    setPreviewAmount(amount);
    setPreviewTax(tax);
    setPreviewTotal(amount + tax);
    setFormData({...formData, amount: e.target.value});
  };

  const handleTaxChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    const amount = parseFloat(formData.amount) || 0;
    const tax = amount * taxRate / 100;
    setPreviewAmount(amount);
    setPreviewTax(tax);
    setPreviewTotal(amount + tax);
    setFormData({...formData, tax: e.target.value});
  };

  const handleSubmit = () => {
    const invoice = { 
      ...formData, 
      id: `INV${Date.now()}`, 
      issueDate: new Date().toISOString().split('T')[0], 
      dueDate: new Date(Date.now() + formData.dueDays * 86400000).toISOString().split('T')[0], 
      amount: parseFloat(formData.amount),
      tax: previewTax,
      total: previewTotal,
      status: 'Pending' 
    };
    onGenerate(invoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">Generate New Invoice</h3>
          <p className="text-xs text-gray-500">Create a new invoice for a booking</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Booking ID</label>
            <input 
              placeholder="e.g., BKG001" 
              value={formData.bookingId} 
              onChange={(e) => setFormData({...formData, bookingId: e.target.value})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Customer Name</label>
            <input 
              placeholder="Full name" 
              value={formData.customer} 
              onChange={(e) => setFormData({...formData, customer: e.target.value})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Service Description</label>
            <input 
              placeholder="e.g., Wedding Photography" 
              value={formData.service} 
              onChange={(e) => setFormData({...formData, service: e.target.value})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Amount (₹)</label>
            <input 
              type="number" 
              placeholder="Enter amount" 
              value={formData.amount} 
              onChange={handleAmountChange} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Tax Rate</label>
              <select value={formData.tax} onChange={handleTaxChange} className="w-full p-2 border rounded-lg">
                <option value="0">0% Tax</option>
                <option value="5">5% Tax</option>
                <option value="12">12% Tax</option>
                <option value="18">18% GST</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Due Date</label>
              <select value={formData.dueDays} onChange={(e) => setFormData({...formData, dueDays: e.target.value})} className="w-full p-2 border rounded-lg">
                <option value="7">Due in 7 days</option>
                <option value="15">Due in 15 days</option>
                <option value="30">Due in 30 days</option>
              </select>
            </div>
          </div>
          
          {previewAmount > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 mt-2 space-y-2 border">
              <p className="text-xs font-semibold text-gray-600">Preview</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount:</span>
                <span className="font-semibold">{formatCurrency(previewAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax ({formData.tax}%):</span>
                <span className="font-semibold">{formatCurrency(previewTax)}</span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-red-600">{formatCurrency(previewTotal)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Generate Invoice</button>
        </div>
      </div>
    </div>
  );
};

export const InvoiceBillingManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { 
    setIsLoading(true); 
    setTimeout(() => { 
      setInvoices(mockInvoices); 
      setIsLoading(false); 
    }, 500); 
  }, []);

  const showToastMsg = (msg) => { 
    setToast({ show: true, message: msg }); 
    setTimeout(() => setToast({ show: false, message: '' }), 3000); 
  };

  const handleGenerate = (newInvoice) => { 
    setInvoices(prev => [newInvoice, ...prev]); 
    showToastMsg(`Invoice ${newInvoice.id} generated successfully`); 
  };
  
  const handleSendEmail = (invoiceId) => { 
    showToastMsg(`Invoice ${invoiceId} sent to customer email`); 
  };
  
  const handleMarkAsPaid = (invoiceId) => { 
    setInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] } : i)); 
    showToastMsg(`Invoice ${invoiceId} marked as paid`); 
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

  const stats = { 
    total: invoices.length, 
    paid: invoices.filter(i => i.status === 'Paid').length, 
    pending: invoices.filter(i => i.status === 'Pending').length, 
    overdue: invoices.filter(i => i.status === 'Overdue').length, 
    totalAmount: invoices.reduce((sum, i) => sum + i.total, 0) 
  };

  return (
    <div>
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {toast.message}
        </div>
      )}
      
      {showPreview && (
        <InvoicePreviewModal 
          invoice={selectedInvoice} 
          onClose={() => setShowPreview(false)} 
          onSendEmail={handleSendEmail} 
        />
      )}
      
      {showGenerate && (
        <GenerateInvoiceModal 
          onClose={() => setShowGenerate(false)} 
          onGenerate={handleGenerate} 
        />
      )}

      {/* Header Section - Matching PaymentStatusTracking theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📄</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Invoice & Billing Management</h3>
              <p className="text-sm text-gray-500 mt-0.5">Generate and manage invoices for each booking</p>
            </div>
          </div>
          <button 
            onClick={() => setShowGenerate(true)} 
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.plus} size={16} /> New Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards - Matching PaymentStatusTracking style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Invoices', value: stats.total, icon: '📋', color: 'border-gray-400' },
          { label: 'Paid', value: stats.paid, icon: '✅', color: 'border-green-400' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: 'border-amber-400' },
          { label: 'Overdue', value: stats.overdue, icon: '⚠️', color: 'border-red-400' },
          { label: 'Total Value', value: formatCurrency(stats.totalAmount), icon: '💰', color: 'border-purple-400' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section - Matching PaymentStatusTracking style */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.invoice} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Invoice Records</h3>
                <p className="text-xs text-gray-400">{invoices.length} invoice{invoices.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input 
              placeholder="Search by invoice ID, booking ID or customer..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Invoice ID', 'Booking', 'Customer', 'Service', 'Amount', 'Tax', 'Total', 'Status', 'Due Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map(i => (
                <tr key={i.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{i.id}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{i.bookingId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                        {i.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{i.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{i.service}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{formatCurrency(i.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{formatCurrency(i.tax)}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{formatCurrency(i.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      i.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      i.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{i.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => { setSelectedInvoice(i); setShowPreview(true); }} 
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" 
                        title="View Invoice"
                      >
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      {i.status !== 'Paid' && (
                        <button 
                          onClick={() => handleMarkAsPaid(i.id)} 
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors" 
                          title="Mark as Paid"
                        >
                          💰
                        </button>
                      )}
                      <button 
                        onClick={() => handleSendEmail(i.id)} 
                        className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors" 
                        title="Email Invoice"
                      >
                        📧
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">
                Paid: <span className="font-semibold text-green-600">{stats.paid}</span>
              </span>
              <span className="text-gray-500">
                Pending: <span className="font-semibold text-amber-600">{stats.pending}</span>
              </span>
              <span className="text-gray-500">
                Overdue: <span className="font-semibold text-red-600">{stats.overdue}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Total Revenue: <span className="font-bold text-gray-800">{formatCurrency(stats.totalAmount)}</span>
            </span>
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