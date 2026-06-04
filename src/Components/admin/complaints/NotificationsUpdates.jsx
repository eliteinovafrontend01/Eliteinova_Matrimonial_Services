// src/pages/admin/complaints/NotificationsUpdates.jsx
import { useState } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const NotificationsUpdates = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'sms', recipient: 'Aarav Patel', phone: '987****210', template: 'complaint_acknowledgment', status: 'sent', sentAt: '2024-01-15 10:35', content: 'Your complaint TKT001 has been registered. We will update you within 24 hours.' },
    { id: 2, type: 'email', recipient: 'Ishita Reddy', email: 'ish***@example.com', template: 'status_update', status: 'sent', sentAt: '2024-01-15 09:20', content: 'Your complaint TKT002 status has been updated to In Progress.' },
    { id: 3, type: 'push', recipient: 'Rohan Deshmukh', device: 'iOS', template: 'resolution', status: 'delivered', sentAt: '2024-01-14 16:45', content: 'Your complaint TKT003 has been resolved. Please share your feedback.' },
    { id: 4, type: 'email', recipient: 'Neha Gupta', email: 'neh***@example.com', template: 'escalation', status: 'pending', sentAt: null, content: 'Your complaint has been escalated to senior management.' },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newNotification, setNewNotification] = useState({ type: 'email', recipient: '', subject: '', message: '', ticketId: '' });

  const notificationTemplates = [
    { id: 'complaint_acknowledgment', name: 'Complaint Acknowledgment', subject: 'We have received your complaint', message: 'Dear {customer}, your complaint {ticketId} has been registered. Our team will look into it and get back to you within 24 hours.' },
    { id: 'status_update', name: 'Status Update', subject: 'Update on your complaint', message: 'Dear {customer}, the status of your complaint {ticketId} has been updated to {status}.' },
    { id: 'resolution', name: 'Resolution Notification', subject: 'Your complaint has been resolved', message: 'Dear {customer}, your complaint {ticketId} has been resolved. Resolution: {resolution}. Please let us know if you are satisfied.' },
    { id: 'escalation', name: 'Escalation Notification', subject: 'Your complaint has been escalated', message: 'Dear {customer}, your complaint {ticketId} has been escalated to {escalatedTo} for priority handling.' },
  ];

  const handleSendNotification = () => {
    const newId = notifications.length + 1;
    const newNotif = {
      id: newId,
      type: newNotification.type,
      recipient: newNotification.recipient,
      [newNotification.type === 'email' ? 'email' : 'phone']: newNotification.recipient,
      template: 'custom',
      status: 'sent',
      sentAt: new Date().toLocaleString(),
      content: newNotification.message,
      subject: newNotification.subject
    };
    setNotifications([newNotif, ...notifications]);
    setShowComposeModal(false);
    setNewNotification({ type: 'email', recipient: '', subject: '', message: '', ticketId: '' });
  };

  const getTypeIcon = (type) => {
    if (type === 'sms') return '📱';
    if (type === 'email') return '✉️';
    return '🔔';
  };

  const getStatusBadge = (status) => {
    if (status === 'sent' || status === 'delivered') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notifications & Updates</h3>
            <p className="text-sm text-gray-500 mt-0.5">Keep all parties informed about complaint status and resolution updates via SMS, email, or push notifications</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <button onClick={() => setShowComposeModal(true)} className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
              ✉️ Compose Notification
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-sm">Notification Templates</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {notificationTemplates.map(template => (
                <div key={template.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">{template.name}</p>
                  <p className="text-xs text-gray-400 truncate">{template.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-800">Recent Notifications</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {notifications.map(notif => (
                <div key={notif.id} onClick={() => setSelectedNotification(notif)} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">To: {notif.recipient}</p>
                          <p className="text-xs text-gray-500">{notif.type === 'email' ? notif.email : notif.phone}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(notif.status)}`}>{notif.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{notif.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-gray-400">Template: {notif.template}</span>
                        {notif.sentAt && <span className="text-[10px] text-gray-400">Sent: {notif.sentAt}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowComposeModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold">Compose Notification</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input type="radio" value="email" checked={newNotification.type === 'email'} onChange={() => setNewNotification({...newNotification, type: 'email'})} /> Email
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="sms" checked={newNotification.type === 'sms'} onChange={() => setNewNotification({...newNotification, type: 'sms'})} /> SMS
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="push" checked={newNotification.type === 'push'} onChange={() => setNewNotification({...newNotification, type: 'push'})} /> Push
                </label>
              </div>
              <input type="text" placeholder="Recipient (email/phone)" value={newNotification.recipient} onChange={(e) => setNewNotification({...newNotification, recipient: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Subject" value={newNotification.subject} onChange={(e) => setNewNotification({...newNotification, subject: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <textarea placeholder="Message" rows="4" value={newNotification.message} onChange={(e) => setNewNotification({...newNotification, message: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
              <input type="text" placeholder="Related Ticket ID (optional)" value={newNotification.ticketId} onChange={(e) => setNewNotification({...newNotification, ticketId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <div className="flex gap-3">
                <button onClick={() => setShowComposeModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleSendNotification} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};