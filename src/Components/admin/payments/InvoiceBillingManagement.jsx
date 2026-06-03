// src/components/admin/payments/InvoiceBillingManagement.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

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
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between"><h3 className="text-lg font-bold">Invoice #{invoice.id}</h3><button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><Icon d={ICONS.cancel} size={20} /></button></div>
        <div className="p-6">
          <div className="text-center mb-6"><h1 className="text-2xl font-bold">EVENTPLAN</h1><p className="text-gray-500">123 Event Street, Mumbai - 400001</p></div>
          <div className="grid grid-cols-2 gap-4 mb-6"><div><p className="text-gray-400">Bill To:</p><p className="font-semibold">{invoice.customer}</p></div><div className="text-right"><p className="text-gray-400">Invoice Date</p><p>{invoice.issueDate}</p><p className="text-gray-400 mt-1">Due Date</p><p>{invoice.dueDate}</p></div></div>
          <table className="w-full mb-6 border-collapse"><thead><tr className="border-b"><th className="text-left py-2">Description</th><th className="text-right py-2">Amount</th></tr></thead><tbody><tr className="border-b"><td className="py-2">{invoice.service}</td><td className="text-right">₹{invoice.amount.toLocaleString()}</td></tr><tr className="border-b"><td className="py-2">Tax (18% GST)</td><td className="text-right">₹{invoice.tax.toLocaleString()}</td></tr><tr className="font-bold"><td className="py-2">Total</td><td className="text-right">₹{invoice.total.toLocaleString()}</td></tr></tbody></table>
          <div className="flex gap-3 justify-end"><button onClick={handlePrint} className="px-4 py-2 border rounded-lg">🖨️ Print</button><button onClick={() => onSendEmail(invoice.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg">📧 Send Email</button></div>
        </div>
      </div>
    </div>
  );
};

const GenerateInvoiceModal = ({ onClose, onGenerate }) => {
  const [formData, setFormData] = useState({ bookingId: '', customer: '', service: '', amount: '', tax: '18', dueDays: '7' });

  const handleSubmit = () => {
    const invoice = { ...formData, id: `INV${Date.now()}`, issueDate: new Date().toISOString().split('T')[0], dueDate: new Date(Date.now() + formData.dueDays * 86400000).toISOString().split('T')[0], total: parseFloat(formData.amount) + (parseFloat(formData.amount) * parseFloat(formData.tax) / 100), status: 'Pending' };
    onGenerate(invoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Generate New Invoice</h3></div>
        <div className="p-5 space-y-3"><input placeholder="Booking ID" value={formData.bookingId} onChange={(e) => setFormData({...formData, bookingId: e.target.value})} className="w-full p-2 border rounded-lg" /><input placeholder="Customer Name" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full p-2 border rounded-lg" /><input placeholder="Service Description" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full p-2 border rounded-lg" /><input type="number" placeholder="Amount (₹)" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-2 border rounded-lg" /><div className="flex gap-2"><select value={formData.tax} onChange={(e) => setFormData({...formData, tax: e.target.value})} className="flex-1 p-2 border rounded-lg"><option value="0">0% Tax</option><option value="5">5% Tax</option><option value="12">12% Tax</option><option value="18">18% GST</option></select><select value={formData.dueDays} onChange={(e) => setFormData({...formData, dueDays: e.target.value})} className="flex-1 p-2 border rounded-lg"><option value="7">Due in 7 days</option><option value="15">Due in 15 days</option><option value="30">Due in 30 days</option></select></div></div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Generate Invoice</button></div>
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

  useEffect(() => { setIsLoading(true); setTimeout(() => { setInvoices(mockInvoices); setIsLoading(false); }, 500); }, []);

  const showToastMsg = (msg) => { setToast({ show: true, message: msg }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };

  const handleGenerate = (newInvoice) => { setInvoices(prev => [newInvoice, ...prev]); showToastMsg(`Invoice ${newInvoice.id} generated successfully`); };
  const handleSendEmail = (invoiceId) => { showToastMsg(`Invoice ${invoiceId} sent to customer email`); };
  const handleMarkAsPaid = (invoiceId) => { setInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] } : i)); showToastMsg(`Invoice ${invoiceId} marked as paid`); };

  if (isLoading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

  const stats = { total: invoices.length, paid: invoices.filter(i => i.status === 'Paid').length, pending: invoices.filter(i => i.status === 'Pending').length, overdue: invoices.filter(i => i.status === 'Overdue').length, totalAmount: invoices.reduce((sum, i) => sum + i.total, 0) };

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showPreview && <InvoicePreviewModal invoice={selectedInvoice} onClose={() => setShowPreview(false)} onSendEmail={handleSendEmail} />}
      {showGenerate && <GenerateInvoiceModal onClose={() => setShowGenerate(false)} onGenerate={handleGenerate} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex justify-between items-center"><div className="flex items-center gap-4"><div className="text-4xl">📄</div><div><h3 className="text-xl font-bold">Invoice & Billing Management</h3><p className="text-sm text-gray-500">Generate and manage invoices for each booking</p></div></div><button onClick={() => setShowGenerate(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2">+ New Invoice</button></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[{ label: 'Total Invoices', value: stats.total, icon: '📋' }, { label: 'Paid', value: stats.paid, icon: '✅' }, { label: 'Pending', value: stats.pending, icon: '⏳' }, { label: 'Overdue', value: stats.overdue, icon: '⚠️' }, { label: 'Total Value', value: `₹${(stats.totalAmount / 100000).toFixed(2)}L`, icon: '💰' }].map((s, i) => (<div key={i} className="bg-white rounded-2xl p-4 shadow-sm"><div className="flex justify-between"><div><p className="text-xs text-gray-400">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><div className="text-2xl">{s.icon}</div></div></div>))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Invoice ID', 'Booking', 'Customer', 'Service', 'Amount', 'Tax', 'Total', 'Status', 'Due Date', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead><tbody className="divide-y">{invoices.map(i => (<tr key={i.id} className="hover:bg-gray-50"><td className="px-4 py-3 text-xs font-mono">{i.id}</td><td className="px-4 py-3 text-xs">{i.bookingId}</td><td className="px-4 py-3 text-sm font-semibold">{i.customer}</td><td className="px-4 py-3 text-xs">{i.service}</td><td className="px-4 py-3 text-sm">₹{i.amount.toLocaleString()}</td><td className="px-4 py-3 text-xs">₹{i.tax.toLocaleString()}</td><td className="px-4 py-3 font-bold">₹{i.total.toLocaleString()}</td><td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${i.status === 'Paid' ? 'bg-green-100 text-green-700' : i.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{i.status}</span></td><td className="px-4 py-3 text-xs">{i.dueDate}</td><td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => { setSelectedInvoice(i); setShowPreview(true); }} className="p-1.5 rounded hover:bg-blue-50" title="View"><Icon d={ICONS.eye} size={14} /></button>{i.status !== 'Paid' && <button onClick={() => handleMarkAsPaid(i.id)} className="p-1.5 rounded hover:bg-green-50 text-green-600" title="Mark Paid">💰</button>}<button onClick={() => handleSendEmail(i.id)} className="p-1.5 rounded hover:bg-gray-100" title="Email">📧</button></div></td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
};