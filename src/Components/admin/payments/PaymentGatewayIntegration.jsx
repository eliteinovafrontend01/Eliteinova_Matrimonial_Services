// src/components/admin/payments/PaymentGatewayIntegration.jsx
import { useState, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

// Helper function to format currency with appropriate units
const formatCurrency = (amount) => {
  // Extract numeric value if string with ₹ symbol is passed
  let numericAmount = amount;
  if (typeof amount === 'string') {
    numericAmount = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    if (isNaN(numericAmount)) return amount;
  }
  
  if (numericAmount >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(numericAmount / 10000000).toFixed(2)}Cr`;
  } else if (numericAmount >= 100000) { // 1 Lakh = 100,000
    return `₹${(numericAmount / 100000).toFixed(2)}L`;
  } else if (numericAmount >= 1000) { // 1 Thousand = 1,000
    return `₹${(numericAmount / 1000).toFixed(1)}K`;
  } else {
    return `₹${numericAmount}`;
  }
};

const razorpayConfig = {
  id: 'razorpay',
  name: 'Razorpay',
  logo: '🪙',
  status: 'Connected',
  liveMode: true,
  apiKey: 'rzp_live_xxxxxxxxxxxx',
  keySecret: 'rzp_live_secret_xxxxxxxxxxxx',
  webhookSecret: 'whsec_xxxxxxxxxxxx',
  webhookUrl: 'https://api.eventplan.com/webhooks/razorpay',
  fees: {
    upi: '0%',
    cards: '2%',
    netbanking: '2%',
    wallets: '2%',
    international: '3%',
    minFee: '₹5'
  },
  paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'NetBanking', 'Wallet', 'EMI', 'International Cards'],
  settlement: {
    cycle: 'T+2 days',
    nextSettlement: '2024-01-20',
    pendingAmount: 45000,
    settledThisMonth: 850000
  },
  supportedCurrencies: ['INR', 'USD', 'EUR', 'GBP'],
  webhookEvents: ['payment.captured', 'payment.failed', 'refund.created', 'order.paid'],
};

// Connect/Configure Razorpay Modal
const ConfigureRazorpayModal = ({ config, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    apiKey: config?.apiKey || '',
    keySecret: config?.keySecret || '',
    webhookSecret: config?.webhookSecret || '',
    webhookUrl: config?.webhookUrl || '',
    mode: config?.liveMode ? 'live' : 'test'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave({
      apiKey: formData.apiKey,
      keySecret: formData.keySecret,
      webhookSecret: formData.webhookSecret,
      webhookUrl: formData.webhookUrl,
      liveMode: formData.mode === 'live'
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 border-b rounded-t-2xl">
          <h3 className="text-lg font-bold">Configure Razorpay</h3>
          <p className="text-sm text-gray-500">Enter your Razorpay API credentials</p>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-700">📌 Need API keys? <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noopener noreferrer" className="underline">Get from Razorpay Dashboard</a></p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Key ID <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={formData.apiKey} 
              onChange={(e) => setFormData({...formData, apiKey: e.target.value})} 
              placeholder="rzp_live_xxxxxxxxxxxx"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Found in Razorpay Dashboard → Settings → API Keys</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Key Secret <span className="text-red-500">*</span></label>
            <input 
              type="password" 
              value={formData.keySecret} 
              onChange={(e) => setFormData({...formData, keySecret: e.target.value})} 
              placeholder="Your Razorpay Key Secret"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 font-mono text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Webhook Secret</label>
            <input 
              type="text" 
              value={formData.webhookSecret} 
              onChange={(e) => setFormData({...formData, webhookSecret: e.target.value})} 
              placeholder="whsec_xxxxxxxxxxxx"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">For signature verification (optional but recommended)</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Webhook URL</label>
            <input 
              type="text" 
              value={formData.webhookUrl} 
              onChange={(e) => setFormData({...formData, webhookUrl: e.target.value})} 
              className="w-full p-2 border rounded-lg bg-gray-50 font-mono text-sm"
              readOnly
            />
            <p className="text-xs text-gray-400 mt-1">Add this URL to Razorpay Webhook settings</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Mode</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="test" checked={formData.mode === 'test'} onChange={() => setFormData({...formData, mode: 'test'})} />
                <span className="text-sm">🔬 Test Mode</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="live" checked={formData.mode === 'live'} onChange={() => setFormData({...formData, mode: 'live'})} />
                <span className="text-sm">🔴 Live Mode</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button 
            onClick={handleSubmit} 
            disabled={!formData.apiKey || !formData.keySecret || isSaving}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Webhook Events Modal
const WebhookEventsModal = ({ onClose }) => {
  const [events, setEvents] = useState([
    { id: 1, event: 'payment.captured', timestamp: '2024-01-15 10:30:00', status: 'Success', amount: 25000, bookingId: 'BKG001', paymentId: 'pay_xyz123' },
    { id: 2, event: 'payment.failed', timestamp: '2024-01-14 15:20:00', status: 'Failed', amount: 150000, bookingId: 'BKG003', paymentId: 'pay_failed456', reason: 'Insufficient funds' },
    { id: 3, event: 'refund.created', timestamp: '2024-01-13 09:45:00', status: 'Success', amount: 35000, bookingId: 'BKG004', paymentId: 'pay_refund789' },
    { id: 4, event: 'order.paid', timestamp: '2024-01-12 14:30:00', status: 'Success', amount: 45000, bookingId: 'BKG002', paymentId: 'pay_order456' },
    { id: 5, event: 'payment.authorized', timestamp: '2024-01-11 11:15:00', status: 'Success', amount: 75000, bookingId: 'BKG006', paymentId: 'pay_auth123' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredEvents = events.filter(e => filter === 'all' || e.status.toLowerCase() === filter);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Razorpay Webhook Events</h3>
            <p className="text-sm text-gray-500">Real-time payment events from Razorpay</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-xs rounded-lg ${filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>All Events</button>
            <button onClick={() => setFilter('success')} className={`px-3 py-1.5 text-xs rounded-lg ${filter === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Success</button>
            <button onClick={() => setFilter('failed')} className={`px-3 py-1.5 text-xs rounded-lg ${filter === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>Failed</button>
          </div>
          
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-2">Event</th>
                <th className="py-2">Timestamp</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Booking ID</th>
                <th className="py-2">Status</th>
               </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-mono text-xs">{event.event}</td>
                  <td className="py-2 text-xs">{event.timestamp}</td>
                  <td className="py-2 font-semibold">{formatCurrency(event.amount)}</td>
                  <td className="py-2 text-xs font-mono">{event.bookingId}</td>
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      event.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <button className="text-xs text-red-600">Clear History</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

// Test Payment Modal
const TestPaymentModal = ({ onClose, onTest }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onTest({ amount: parseFloat(amount), paymentMethod });
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">Test Payment</h3>
          <p className="text-sm text-gray-500">Simulate a test payment through Razorpay</p>
        </div>
        
        <div className="p-5 space-y-4">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-xs text-yellow-700">🧪 Test Mode Active - No real money will be charged</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Test Amount (₹)</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded-lg">
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI (PhonePe, GPay)</option>
              <option value="netbanking">NetBanking</option>
              <option value="wallet">Wallet</option>
              <option value="emi">EMI</option>
            </select>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Test Card Details:</p>
            <p className="text-xs font-mono">4111 1111 1111 1111 | 12/25 | 111</p>
          </div>
        </div>
        
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
          <button 
            onClick={handleSubmit} 
            disabled={!amount || isProcessing}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Process Test Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Methods Manager Modal
const PaymentMethodsModal = ({ config, onClose, onUpdate }) => {
  const [methods, setMethods] = useState([
    { id: 'upi', name: 'UPI', enabled: true, icon: '📱', fee: '0%' },
    { id: 'card', name: 'Credit/Debit Cards', enabled: true, icon: '💳', fee: '2%' },
    { id: 'netbanking', name: 'NetBanking', enabled: true, icon: '🏦', fee: '2%' },
    { id: 'wallet', name: 'Digital Wallets', enabled: true, icon: '👛', fee: '2%' },
    { id: 'emi', name: 'EMI', enabled: false, icon: '📊', fee: '1.5%' },
    { id: 'international', name: 'International Cards', enabled: false, icon: '🌍', fee: '3%' },
  ]);

  const handleToggle = (id) => {
    setMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleSave = () => {
    onUpdate({ enabledMethods: methods.filter(m => m.enabled).map(m => m.name) });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">Manage Payment Methods</h3>
          <p className="text-sm text-gray-500">Enable/Disable payment methods for customers</p>
        </div>
        
        <div className="p-5 space-y-3">
          {methods.map(method => (
            <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-xl">{method.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{method.name}</p>
                  <p className="text-xs text-gray-400">Fee: {method.fee}</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle(method.id)}
                className={`w-10 h-5 rounded-full transition-colors ${method.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${method.enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// Disconnect Modal
const DisconnectModal = ({ onClose, onDisconnect }) => {
  const [confirmText, setConfirmText] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b bg-red-50">
          <h3 className="text-lg font-bold text-red-600">Disconnect Razorpay</h3>
        </div>
        
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to disconnect Razorpay? This will stop all payment processing through this gateway.
          </p>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-xs text-red-700">⚠️ Warning: Any pending transactions will fail. Active subscriptions will be paused.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Type "DISCONNECT" to confirm</label>
            <input 
              type="text" 
              value={confirmText} 
              onChange={(e) => setConfirmText(e.target.value)} 
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
          <button 
            onClick={onDisconnect} 
            disabled={confirmText !== 'DISCONNECT'}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
          >
            Disconnect Gateway
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export const PaymentGatewayIntegration = () => {
  const [config, setConfig] = useState(razorpayConfig);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showTestPaymentModal, setShowTestPaymentModal] = useState(false);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToastMsg = (msg, type = 'success') => { 
    setToast({ show: true, message: msg, type }); 
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); 
  };

  const handleSaveConfig = (newConfig) => {
    setConfig(prev => ({ 
      ...prev, 
      ...newConfig,
      status: 'Connected',
      liveMode: newConfig.liveMode
    }));
    showToastMsg('Razorpay configuration saved successfully!', 'success');
  };

  const handleDisconnect = () => {
    setConfig(prev => ({ ...prev, status: 'Disabled', liveMode: false }));
    showToastMsg('Razorpay disconnected', 'warning');
    setShowDisconnectModal(false);
  };

  const handleToggleLiveMode = () => {
    setConfig(prev => ({ ...prev, liveMode: !prev.liveMode }));
    showToastMsg(`Switched to ${!config.liveMode ? 'Live' : 'Test'} mode`, 'success');
  };

  const handleTestWebhook = () => {
    showToastMsg('Test webhook sent to Razorpay. Check Events tab for response.', 'success');
  };

  const handleTestPayment = (data) => {
    showToastMsg(`Test payment of ${formatCurrency(data.amount)} via ${data.paymentMethod} successful!`, 'success');
  };

  const handleUpdatePaymentMethods = (data) => {
    showToastMsg('Payment methods updated successfully', 'success');
  };

  const handleRetryFailedWebhook = () => {
    showToastMsg('Retrying failed webhook events...', 'info');
  };

  return (
    <div>
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg animate-slide-in ${
          toast.type === 'success' ? 'bg-green-500' : toast.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
        } text-white`}>
          {toast.message}
        </div>
      )}

      {showConfigureModal && (
        <ConfigureRazorpayModal 
          config={config}
          onClose={() => setShowConfigureModal(false)} 
          onSave={handleSaveConfig}
        />
      )}

      {showWebhookModal && (
        <WebhookEventsModal onClose={() => setShowWebhookModal(false)} />
      )}

      {showTestPaymentModal && (
        <TestPaymentModal 
          onClose={() => setShowTestPaymentModal(false)} 
          onTest={handleTestPayment}
        />
      )}

      {showPaymentMethodsModal && (
        <PaymentMethodsModal 
          config={config}
          onClose={() => setShowPaymentMethodsModal(false)} 
          onUpdate={handleUpdatePaymentMethods}
        />
      )}

      {showDisconnectModal && (
        <DisconnectModal 
          onClose={() => setShowDisconnectModal(false)} 
          onDisconnect={handleDisconnect}
        />
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🪙</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Razorpay Payment Gateway</h3>
            <p className="text-sm text-gray-500">Seamless integration for secure and reliable transactions</p>
          </div>
        </div>
      </div>

      {/* Main Gateway Card */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg">
                🪙
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Razorpay</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {config.status}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.liveMode ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {config.liveMode ? '🔴 LIVE MODE' : '⚪ TEST MODE'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {config.status !== 'Connected' && (
                <button onClick={() => setShowConfigureModal(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Connect Razorpay
                </button>
              )}
              {config.status === 'Connected' && (
                <button onClick={() => setShowDisconnectModal(true)} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Disconnect
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b bg-gray-50">
          <div>
            <p className="text-xs text-gray-400">Total Volume (MTD)</p>
            <p className="text-xl font-bold text-gray-800">{formatCurrency(850000)}</p>
            <p className="text-xs text-green-600">↑ +12.5%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Success Rate</p>
            <p className="text-xl font-bold text-gray-800">98.5%</p>
            <p className="text-xs text-green-600">↑ +2.1%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Avg. Response Time</p>
            <p className="text-xl font-bold text-gray-800">1.2s</p>
            <p className="text-xs text-green-600">↓ -0.3s</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Fees Paid</p>
            <p className="text-xl font-bold text-gray-800">{formatCurrency(17000)}</p>
            <p className="text-xs text-amber-600">This month</p>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">API Configuration</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Key ID</p>
                <p className="font-mono text-sm">{config.apiKey}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Key Secret</p>
                <p className="font-mono text-sm">••••••••••••••••</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Webhook URL</p>
                <p className="font-mono text-sm break-all">{config.webhookUrl}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">Settlement Details</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Settlement Cycle</p>
                <p className="font-semibold">{config.settlement.cycle}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Next Settlement</p>
                <p className="font-semibold">{config.settlement.nextSettlement}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Pending Settlement</p>
                <p className="font-semibold text-amber-600">{formatCurrency(config.settlement.pendingAmount)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
            <button onClick={() => setShowConfigureModal(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Edit Configuration
            </button>
            <button onClick={handleToggleLiveMode} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              {config.liveMode ? 'Switch to Test Mode' : 'Switch to Live Mode'}
            </button>
            <button onClick={() => setShowPaymentMethodsModal(true)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Manage Payment Methods
            </button>
            <button onClick={() => setShowWebhookModal(true)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              View Webhook Events
            </button>
            <button onClick={handleTestWebhook} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Test Webhook
            </button>
            <button onClick={() => setShowTestPaymentModal(true)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Test Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800">💳 Active Payment Methods</h4>
            <button onClick={() => setShowPaymentMethodsModal(true)} className="text-xs text-red-600">Manage</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm">✅ UPI</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm">✅ Cards</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm">✅ NetBanking</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm">✅ Wallets</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm">⭕ EMI</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm">⭕ International</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h4 className="font-bold text-gray-800 mb-3">💰 Fee Structure</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>UPI</span>
              <span className="text-green-600">0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cards, NetBanking, Wallets</span>
              <span>2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>International Cards</span>
              <span>3% + ₹5</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t">
              <span>Minimum Fee</span>
              <span>₹5 per transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">📚</div>
          <h4 className="font-bold text-gray-800">Razorpay Integration Guide</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">1️⃣ <span>Create Razorpay account on <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">razorpay.com</a></span></li>
            <li className="flex items-start gap-2">2️⃣ <span>Navigate to Dashboard → Settings → API Keys</span></li>
            <li className="flex items-start gap-2">3️⃣ <span>Generate Live/Test API keys</span></li>
            <li className="flex items-start gap-2">4️⃣ <span>Add Webhook URL in Dashboard → Webhooks</span></li>
            <li className="flex items-start gap-2">5️⃣ <span>Enable payment methods (UPI, Cards, NetBanking)</span></li>
          </ul>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">6️⃣ <span>Set up webhook events: payment.captured, payment.failed</span></li>
            <li className="flex items-start gap-2">7️⃣ <span>Configure settlement preferences</span></li>
            <li className="flex items-start gap-2">8️⃣ <span>Test in test mode with card: 4111 1111 1111 1111</span></li>
            <li className="flex items-start gap-2">9️⃣ <span>Switch to Live mode after successful testing</span></li>
            <li className="flex-items-start gap-2">🔟 <span>Monitor transactions and webhook events</span></li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};