// src/pages/admin/complaints/CommunicationLogs.jsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const CommunicationLogs = () => {
  const [selectedTicket, setSelectedTicket] = useState('TKT001');
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [conversations, setConversations] = useState([
    { id: 1, ticketId: 'TKT001', sender: 'customer', senderName: 'Aarav Patel', senderEmail: 'aarav@example.com', message: 'The photographer didn\'t show up at all. Very disappointed. We waited for 2 hours.', timestamp: '2024-01-15 10:30 AM', type: 'complaint', isRead: true, attachments: [] },
    { id: 2, ticketId: 'TKT001', sender: 'admin', senderName: 'Rajesh Kumar', senderRole: 'Support Manager', message: 'We apologize for the inconvenience. We\'re looking into this right away. Can you please share your contact number?', timestamp: '2024-01-15 11:00 AM', type: 'response', isRead: true, attachments: [] },
    { id: 3, ticketId: 'TKT001', sender: 'vendor', senderName: 'LensArt Studio', senderRole: 'Vendor', message: 'We had an emergency and couldn\'t make it. We sincerely apologize. We can reschedule or provide a full refund.', timestamp: '2024-01-15 02:15 PM', type: 'response', isRead: false, attachments: [] },
    { id: 4, ticketId: 'TKT001', sender: 'admin', senderName: 'Rajesh Kumar', senderRole: 'Support Manager', message: 'Thank you for your response. We need to arrange a replacement or refund. Customer has requested a refund.', timestamp: '2024-01-15 03:00 PM', type: 'response', isRead: true, attachments: [] },
    { id: 5, ticketId: 'TKT002', sender: 'customer', senderName: 'Ishita Reddy', senderEmail: 'ishita@example.com', message: 'Payment deducted but booking not confirmed. Need urgent help. Transaction ID: TXN123456', timestamp: '2024-01-14 09:15 AM', type: 'complaint', isRead: true, attachments: ['payment_screenshot.jpg'] },
    { id: 6, ticketId: 'TKT002', sender: 'admin', senderName: 'Priya Sharma', senderRole: 'Finance Team', message: 'We\'re verifying the transaction with the payment gateway. Will update you within 2 hours.', timestamp: '2024-01-14 10:30 AM', type: 'response', isRead: true, attachments: [] },
    { id: 7, ticketId: 'TKT002', sender: 'admin', senderName: 'Priya Sharma', senderRole: 'Finance Team', message: 'We have confirmed the payment. Your booking is now confirmed. Booking ID: BK-2024-002', timestamp: '2024-01-15 09:00 AM', type: 'response', isRead: false, attachments: [] },
    { id: 8, ticketId: 'TKT003', sender: 'customer', senderName: 'Rohan Deshmukh', senderEmail: 'rohan@example.com', message: 'The decoration quality is very poor. Colors don\'t match what was agreed.', timestamp: '2024-01-13 04:45 PM', type: 'complaint', isRead: true, attachments: ['decoration_photo.jpg'] },
    { id: 9, ticketId: 'TKT003', sender: 'vendor', senderName: 'EventPlanners Inc', senderRole: 'Vendor', message: 'We apologize. We will send our team to fix the issues tomorrow.', timestamp: '2024-01-13 06:00 PM', type: 'response', isRead: true, attachments: [] },
    { id: 10, ticketId: 'TKT003', sender: 'admin', senderName: 'Amit Patel', senderRole: 'Support', message: 'Please share photos of the decoration for our records.', timestamp: '2024-01-14 10:00 AM', type: 'response', isRead: false, attachments: [] },
  ]);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Get unique tickets with metadata
  const tickets = useMemo(() => {
    const ticketMap = new Map();
    conversations.forEach(conv => {
      if (!ticketMap.has(conv.ticketId)) {
        const lastMessage = conversations.filter(c => c.ticketId === conv.ticketId).slice(-1)[0];
        ticketMap.set(conv.ticketId, {
          id: conv.ticketId,
          lastMessage: lastMessage?.message || '',
          lastTimestamp: lastMessage?.timestamp || '',
          unreadCount: conversations.filter(c => c.ticketId === conv.ticketId && !c.isRead && c.sender !== 'admin').length,
          customerName: conversations.find(c => c.ticketId === conv.ticketId && c.sender === 'customer')?.senderName || 'Unknown'
        });
      }
    });
    return Array.from(ticketMap.values());
  }, [conversations]);

  const currentMessages = useMemo(() => {
    let filtered = conversations.filter(c => c.ticketId === selectedTicket);
    
    if (filterType === 'customer') {
      filtered = filtered.filter(c => c.sender === 'customer');
    } else if (filterType === 'admin') {
      filtered = filtered.filter(c => c.sender === 'admin');
    } else if (filterType === 'vendor') {
      filtered = filtered.filter(c => c.sender === 'vendor');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.senderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [conversations, selectedTicket, filterType, searchTerm]);

  // Mark messages as read when viewing a ticket
  useEffect(() => {
    if (selectedTicket) {
      setConversations(prev => prev.map(conv => 
        conv.ticketId === selectedTicket && !conv.isRead && conv.sender !== 'admin'
          ? { ...conv, isRead: true }
          : conv
      ));
    }
  }, [selectedTicket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      showToastMsg('Please enter a message', 'warning');
      return;
    }

    const newId = Math.max(...conversations.map(c => c.id), 0) + 1;
    const replyText = replyTo ? `Re: ${replyTo.message.substring(0, 50)}...\n\n` : '';
    
    const newConv = {
      id: newId,
      ticketId: selectedTicket,
      sender: 'admin',
      senderName: 'Support Team',
      senderRole: 'Admin',
      message: replyText + newMessage.trim(),
      timestamp: new Date().toLocaleString(),
      type: 'response',
      isRead: true,
      attachments: []
    };
    
    setConversations([...conversations, newConv]);
    setNewMessage('');
    setReplyTo(null);
    showToastMsg('Message sent successfully', 'success');
  };

  const handleReply = (message) => {
    setReplyTo(message);
    setNewMessage('');
    // Focus on input
    document.getElementById('messageInput')?.focus();
  };

  const handleExportConversation = () => {
    const exportData = currentMessages.map(msg => ({
      Sender: `${msg.senderName} (${msg.sender})`,
      Message: msg.message,
      Timestamp: msg.timestamp,
      Type: msg.type
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation_${selectedTicket}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(false);
    showToastMsg('Conversation exported successfully', 'success');
  };

  const getSenderStyle = (sender) => {
    if (sender === 'customer') return 'bg-blue-50 border-blue-200 ml-0 mr-auto';
    if (sender === 'vendor') return 'bg-green-50 border-green-200 ml-0 mr-auto';
    return 'bg-gray-50 border-gray-200 ml-auto mr-0';
  };

  const getSenderIcon = (sender) => {
    if (sender === 'customer') return '👤';
    if (sender === 'vendor') return '🏢';
    return '🛡️';
  };

  const getSenderBadge = (sender) => {
    if (sender === 'customer') return 'Customer';
    if (sender === 'vendor') return 'Vendor';
    return 'Support';
  };

  const stats = {
    total: conversations.length,
    unread: conversations.filter(c => !c.isRead && c.sender !== 'admin').length,
    customers: conversations.filter(c => c.sender === 'customer').length,
    responses: conversations.filter(c => c.sender === 'admin').length
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💬</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Communication & Interaction Logs</h3>
            <p className="text-sm text-gray-500 mt-0.5">Track conversations between customer, vendor, and admin for better resolution</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total Messages</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-red-400">
          <p className="text-xs text-gray-400">Unread</p>
          <p className="text-xl font-bold text-red-600">{stats.unread}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">Customer Messages</p>
          <p className="text-xl font-bold">{stats.customers}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">Admin Responses</p>
          <p className="text-xl font-bold">{stats.responses}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Ticket List */}
          <div className="border-r border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Active Tickets</h3>
              <p className="text-xs text-gray-400 mt-1">{tickets.length} tickets</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {tickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket.id)} 
                  className={`p-3 cursor-pointer hover:bg-gray-50 transition-all ${
                    selectedTicket === ticket.id ? 'bg-red-50 border-l-4 border-red-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="text-sm font-mono font-semibold text-gray-800">{ticket.id}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{ticket.customerName}</p>
                    </div>
                    {ticket.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                        {ticket.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{ticket.lastMessage}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{ticket.lastTimestamp?.split(' ')[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-[700px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{selectedTicket}</span>
                    <span className="text-xs text-gray-400">Conversation Log</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {tickets.find(t => t.id === selectedTicket)?.customerName || 'Loading...'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowExportModal(true)}
                    className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    📥 Export
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      filterType === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('customer')}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      filterType === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    👤 Customer
                  </button>
                  <button
                    onClick={() => setFilterType('vendor')}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      filterType === 'vendor' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🏢 Vendor
                  </button>
                  <button
                    onClick={() => setFilterType('admin')}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      filterType === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    🛡️ Support
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
              {currentMessages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-gray-400">No messages found</p>
                  <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                currentMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[80%] rounded-xl p-3 border shadow-sm ${getSenderStyle(msg.sender)}`}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm">{getSenderIcon(msg.sender)}</span>
                        <span className="text-xs font-semibold text-gray-700">{msg.senderName}</span>
                        {msg.senderRole && (
                          <span className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded">
                            {msg.senderRole}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                      
                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex gap-2">
                          {msg.attachments.map((att, idx) => (
                            <div key={idx} className="bg-white rounded px-2 py-1 text-xs flex items-center gap-1">
                              <span>📎</span> {att}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Reply Button */}
                      {msg.sender !== 'admin' && (
                        <button 
                          onClick={() => handleReply(msg)} 
                          className="text-[10px] text-blue-500 mt-2 hover:text-blue-600 hover:underline transition-colors"
                        >
                          ↳ Reply
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              
              {/* Reply Indicator */}
              {replyTo && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs flex justify-between items-center animate-slide-in">
                  <span className="text-yellow-700">
                    Replying to: "{replyTo.message.substring(0, 60)}..."
                  </span>
                  <button 
                    onClick={() => setReplyTo(null)} 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="messageInput"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Type your message... (Press Enter to send)"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
                <button 
                  onClick={handleSendMessage} 
                  className="px-6 py-2 bg-red-600 text-white text-sm rounded-xl hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Send Message
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
                <span>💬 Press Enter to send</span>
                <span>🕒 Response SLA: 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowExportModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Export Conversation</h3>
              <p className="text-sm text-gray-500">Export conversation for {selectedTicket}</p>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                This will export all messages from this conversation in JSON format.
                The file will include sender details, timestamps, and message content.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowExportModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExportConversation} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};