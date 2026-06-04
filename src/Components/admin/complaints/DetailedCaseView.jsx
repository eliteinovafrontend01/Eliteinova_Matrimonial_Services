// src/pages/admin/complaints/DetailedCaseView.jsx
import { useState, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const DetailedCaseView = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [cases, setCases] = useState([
    { 
      id: 'CMP001', 
      ticketId: 'TKT001', 
      customer: { name: 'Aarav Patel', email: 'aarav.patel@example.com', phone: '+91 98765 43210', memberSince: 'Jan 2023', totalBookings: 12 }, 
      vendor: { id: 'VEN001', name: 'LensArt Studio', email: 'contact@lensart.com', phone: '+91 98765 43211', rating: 4.5, totalComplaints: 3 }, 
      booking: { id: 'BK-2024-001', date: '2024-01-10', eventDate: '2024-01-20', amount: 25000, service: 'Wedding Photography', status: 'Confirmed' }, 
      issue: { type: 'Service Quality', subType: 'Vendor No-Show', subject: 'Vendor no-show on event day', description: 'The vendor did not show up for the scheduled event. Attempted to contact multiple times but no response. This caused major disruption to the event.', priority: 'High', status: 'Open', created: '2024-01-15 10:30', lastUpdated: '2024-01-15 10:30', assignedTo: 'Rajesh Kumar' }, 
      documents: [{ name: 'invoice_001.pdf', url: '#', size: '245 KB', type: 'pdf' }, { name: 'chat_screenshot.png', url: '#', size: '1.2 MB', type: 'image' }],
      communications: [
        { id: 1, from: 'Customer', message: 'Vendor didn\'t show up', timestamp: '2024-01-15 10:30', type: 'complaint' },
        { id: 2, from: 'Support', message: 'We have escalated this to the vendor team', timestamp: '2024-01-15 11:00', type: 'response' }
      ]
    },
    { 
      id: 'CMP002', 
      ticketId: 'TKT002', 
      customer: { name: 'Ishita Reddy', email: 'ishita.reddy@example.com', phone: '+91 98765 43212', memberSince: 'Mar 2023', totalBookings: 8 }, 
      vendor: { id: 'VEN002', name: 'Royal Feast', email: 'info@royalfeast.com', phone: '+91 98765 43213', rating: 4.2, totalComplaints: 5 }, 
      booking: { id: 'BK-2024-002', date: '2024-01-05', eventDate: '2024-01-25', amount: 45000, service: 'Catering Services', status: 'Pending' }, 
      issue: { type: 'Payment & Refund', subType: 'Payment Failure', subject: 'Payment deducted but booking not confirmed', description: 'Amount was deducted from my account but booking status still shows pending. Need confirmation or refund.', priority: 'Critical', status: 'In Progress', created: '2024-01-14 09:15', lastUpdated: '2024-01-15 14:20', assignedTo: 'Priya Sharma' }, 
      documents: [{ name: 'payment_screenshot.jpg', url: '#', size: '856 KB', type: 'image' }],
      communications: [
        { id: 1, from: 'Customer', message: 'Payment deducted but no confirmation', timestamp: '2024-01-14 09:15', type: 'complaint' },
        { id: 2, from: 'System', message: 'Payment verification in progress', timestamp: '2024-01-14 10:00', type: 'auto' },
        { id: 3, from: 'Support', message: 'We have contacted the payment gateway', timestamp: '2024-01-15 14:20', type: 'response' }
      ]
    },
    { 
      id: 'CMP003', 
      ticketId: 'TKT003', 
      customer: { name: 'Rohan Deshmukh', email: 'rohan.d@example.com', phone: '+91 98765 43214', memberSince: 'Jun 2023', totalBookings: 5 }, 
      vendor: { id: 'VEN003', name: 'EventPlanners Inc', email: 'events@eventplanners.com', phone: '+91 98765 43215', rating: 4.8, totalComplaints: 1 }, 
      booking: { id: 'BK-2024-003', date: '2024-01-08', eventDate: '2024-01-28', amount: 75000, service: 'Event Management', status: 'Confirmed' }, 
      issue: { type: 'Service Quality', subType: 'Poor Quality', subject: 'Decoration quality below expectations', description: 'The decoration provided was not as per the agreed specifications. Colors and materials used were different.', priority: 'Medium', status: 'Resolved', created: '2024-01-13 16:45', lastUpdated: '2024-01-14 11:30', assignedTo: 'Amit Patel' }, 
      documents: [{ name: 'decoration_photos.zip', url: '#', size: '5.3 MB', type: 'zip' }],
      communications: [
        { id: 1, from: 'Customer', message: 'Decoration not matching expectations', timestamp: '2024-01-13 16:45', type: 'complaint' },
        { id: 2, from: 'Vendor', message: 'We apologize for the inconvenience', timestamp: '2024-01-14 09:00', type: 'vendor' },
        { id: 3, from: 'Support', message: 'Partial refund issued as resolution', timestamp: '2024-01-14 11:30', type: 'response' }
      ]
    },
  ]);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const statusColors = {
    Open: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'In Progress': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    Resolved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    Escalated: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    Closed: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' }
  };

  const priorityColors = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700'
  };

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchStatus = statusFilter === 'All' || c.issue.status === statusFilter;
      const matchPriority = priorityFilter === 'All' || c.issue.priority === priorityFilter;
      const matchSearch = !search || 
        c.ticketId.toLowerCase().includes(search.toLowerCase()) || 
        c.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        c.issue.subject.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [cases, search, statusFilter, priorityFilter]);

  const handleStatusUpdate = (newStatus, note) => {
    if (!selectedCase) return;
    
    setCases(prev => prev.map(c => 
      c.id === selectedCase.id 
        ? { 
            ...c, 
            issue: { 
              ...c.issue, 
              status: newStatus, 
              lastUpdated: new Date().toLocaleString() 
            },
            communications: [
              ...c.communications,
              {
                id: c.communications.length + 1,
                from: 'System',
                message: note || `Status changed to ${newStatus}`,
                timestamp: new Date().toLocaleString(),
                type: 'system'
              }
            ]
          }
        : c
    ));
    
    setSelectedCase(prev => ({
      ...prev,
      issue: { ...prev.issue, status: newStatus, lastUpdated: new Date().toLocaleString() }
    }));
    
    showToastMsg(`Case status updated to ${newStatus}`, 'success');
  };

  const handleAddCommunication = (message) => {
    if (!message.trim() || !selectedCase) return;
    
    const newComm = {
      id: selectedCase.communications.length + 1,
      from: 'Support',
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
      type: 'response'
    };
    
    setCases(prev => prev.map(c => 
      c.id === selectedCase.id 
        ? { ...c, communications: [...c.communications, newComm] }
        : c
    ));
    
    setSelectedCase(prev => ({
      ...prev,
      communications: [...prev.communications, newComm]
    }));
    
    showToastMsg('Message added successfully', 'success');
  };

  const handleFileUpload = () => {
    if (!selectedFile || !fileName.trim()) {
      showToastMsg('Please select a file', 'warning');
      return;
    }
    
    const newDoc = {
      name: fileName,
      url: '#',
      size: `${Math.floor(Math.random() * 2000 + 100)} KB`,
      type: selectedFile.type.split('/')[1]
    };
    
    setCases(prev => prev.map(c => 
      c.id === selectedCase.id 
        ? { ...c, documents: [...c.documents, newDoc] }
        : c
    ));
    
    setSelectedCase(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }));
    
    setShowUploadModal(false);
    setSelectedFile(null);
    setFileName('');
    showToastMsg('Document uploaded successfully', 'success');
  };

  const handleDownload = (docName) => {
    showToastMsg(`Downloading ${docName}...`, 'info');
    // In real implementation, trigger actual download
  };

  const statCards = [
    { label: 'All', value: cases.length, icon: '📋', color: 'bg-gray-50' },
    { label: 'Open', value: cases.filter(c => c.issue.status === 'Open').length, icon: '🟡', color: 'bg-amber-50' },
    { label: 'In Progress', value: cases.filter(c => c.issue.status === 'In Progress').length, icon: '🔄', color: 'bg-purple-50' },
    { label: 'Resolved', value: cases.filter(c => c.issue.status === 'Resolved').length, icon: '✅', color: 'bg-green-50' },
  ];

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
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Detailed Case View</h3>
            <p className="text-sm text-gray-500 mt-0.5">Access complete details including customer info, vendor details, booking reference, issue description, and supporting documents</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => setStatusFilter(s.label)}
            className={`bg-white rounded-xl p-3 shadow-sm text-center cursor-pointer transition-all hover:shadow-md ${
              statusFilter === s.label ? 'ring-2 ring-red-400 shadow-md' : ''
            }`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 space-y-3">
              {/* Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder="Search by case ID or customer..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              
              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              {/* Clear Filters */}
              {(statusFilter !== 'All' || priorityFilter !== 'All' || search) && (
                <button 
                  onClick={() => {
                    setStatusFilter('All');
                    setPriorityFilter('All');
                    setSearch('');
                  }}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Clear all filters ✕
                </button>
              )}
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredCases.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-400">No cases found</p>
                </div>
              ) : (
                filteredCases.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedCase(c)} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-all ${
                      selectedCase?.id === c.id ? 'bg-red-50 border-l-4 border-red-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{c.ticketId}</p>
                        <p className="text-xs text-gray-500">{c.customer.name}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[c.issue.status]?.bg} ${statusColors[c.issue.status]?.text}`}>
                        {c.issue.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{c.issue.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${priorityColors[c.issue.priority]}`}>
                        {c.issue.priority}
                      </span>
                      <span className="text-[10px] text-gray-400">{c.issue.created.split(' ')[0]}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Case Details Panel */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{selectedCase.ticketId}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[selectedCase.issue.status]?.bg} ${statusColors[selectedCase.issue.status]?.text}`}>
                        {selectedCase.issue.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedCase.issue.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-fit ${priorityColors[selectedCase.issue.priority]}`}>
                    {selectedCase.issue.priority} Priority
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Customer Information */}
                <div className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>👤</span> Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-400">Name:</span> {selectedCase.customer.name}</div>
                    <div><span className="text-gray-400">Email:</span> {selectedCase.customer.email}</div>
                    <div><span className="text-gray-400">Phone:</span> {selectedCase.customer.phone}</div>
                    <div><span className="text-gray-400">Member Since:</span> {selectedCase.customer.memberSince}</div>
                    <div><span className="text-gray-400">Total Bookings:</span> {selectedCase.customer.totalBookings}</div>
                  </div>
                </div>

                {/* Vendor Details */}
                <div className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🏢</span> Vendor Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-400">Name:</span> {selectedCase.vendor.name}</div>
                    <div><span className="text-gray-400">Email:</span> {selectedCase.vendor.email}</div>
                    <div><span className="text-gray-400">Phone:</span> {selectedCase.vendor.phone}</div>
                    <div><span className="text-gray-400">Rating:</span> ⭐ {selectedCase.vendor.rating} / 5.0</div>
                    <div><span className="text-gray-400">Total Complaints:</span> {selectedCase.vendor.totalComplaints}</div>
                  </div>
                </div>

                {/* Booking Reference */}
                <div className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📅</span> Booking Reference
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-400">Booking ID:</span> {selectedCase.booking.id}</div>
                    <div><span className="text-gray-400">Service:</span> {selectedCase.booking.service}</div>
                    <div><span className="text-gray-400">Booking Date:</span> {selectedCase.booking.date}</div>
                    <div><span className="text-gray-400">Event Date:</span> {selectedCase.booking.eventDate}</div>
                    <div><span className="text-gray-400">Amount:</span> ₹{selectedCase.booking.amount.toLocaleString()}</div>
                    <div><span className="text-gray-400">Status:</span> {selectedCase.booking.status}</div>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Issue Description
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedCase.issue.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div><span className="text-gray-400">Type:</span> <span className="bg-gray-100 px-2 py-0.5 rounded-full">{selectedCase.issue.type}</span></div>
                    {selectedCase.issue.subType && <div><span className="text-gray-400">Sub-Type:</span> <span className="bg-gray-100 px-2 py-0.5 rounded-full">{selectedCase.issue.subType}</span></div>}
                    <div><span className="text-gray-400">Created:</span> {selectedCase.issue.created}</div>
                    <div><span className="text-gray-400">Last Updated:</span> {selectedCase.issue.lastUpdated}</div>
                    <div><span className="text-gray-400">Assigned To:</span> {selectedCase.issue.assignedTo}</div>
                  </div>
                </div>

                {/* Communications Timeline */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>💬</span> Communications Timeline
                  </h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedCase.communications.map(comm => (
                      <div key={comm.id} className="border-l-2 border-gray-200 pl-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-semibold ${
                            comm.type === 'complaint' ? 'text-red-600' : 
                            comm.type === 'response' ? 'text-green-600' : 
                            'text-blue-600'
                          }`}>
                            {comm.from}
                          </span>
                          <span className="text-[10px] text-gray-400">{comm.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600">{comm.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Message */}
                  <div className="mt-3">
                    <textarea
                      id="newMessage"
                      placeholder="Add a response or note..."
                      rows="2"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                    />
                    <button 
                      onClick={() => {
                        const message = document.getElementById('newMessage').value;
                        handleAddCommunication(message);
                        document.getElementById('newMessage').value = '';
                      }}
                      className="mt-2 px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📎</span> Supporting Documents ({selectedCase.documents.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedCase.documents.map((doc, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>📄</span>
                          <div>
                            <p className="text-xs font-medium text-gray-700">{doc.name}</p>
                            <p className="text-[10px] text-gray-400">{doc.size}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(doc.name)}
                          className="text-xs text-blue-500 hover:text-blue-600"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="mt-3 text-sm text-red-600 font-semibold hover:text-red-700"
                  >
                    + Upload Additional Document
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <select
                    onChange={(e) => handleStatusUpdate(e.target.value, '')}
                    value={selectedCase.issue.status}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Escalated">Escalated</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    Update Case
                  </button>
                  <button className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 mb-2">Select a case from the list</p>
              <p className="text-sm text-gray-400">Click on any case to view complete details</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Upload Document</h3>
              <p className="text-sm text-gray-500">Add supporting document to this case</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select File</label>
                <input
                  type="file"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    if (e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">File Name</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowUploadModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFileUpload} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Upload
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
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};