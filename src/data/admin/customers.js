export const sampleCustomers = [
  { id: 'CUS001', name: 'Aarav Patel', email: 'aarav.patel@email.com', phone: '+91 98765 43210', location: 'Mumbai', registered: '12 Jan 2024', status: 'Active', verified: true, bookings: 3 },
  { id: 'CUS002', name: 'Ishita Reddy', email: 'ishita.reddy@email.com', phone: '+91 87654 32109', location: 'Delhi', registered: '28 Feb 2024', status: 'Active', verified: true, bookings: 1 },
  { id: 'CUS003', name: 'Rohan Deshmukh', email: 'rohan.deshmukh@email.com', phone: '+91 76543 21098', location: 'Chennai', registered: '5 Mar 2024', status: 'Pending', verified: false, bookings: 0 },
  { id: 'CUS004', name: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '+91 65432 10987', location: 'Bangalore', registered: '19 Mar 2024', status: 'Blocked', verified: true, bookings: 5 },
  { id: 'CUS005', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', location: 'Pune', registered: '2 Apr 2024', status: 'Active', verified: true, bookings: 2 },
  { id: 'CUS006', name: 'Meera Nair', email: 'meera.nair@email.com', phone: '+91 43210 98765', location: 'Hyderabad', registered: '14 Apr 2024', status: 'Inactive', verified: false, bookings: 1 },
];

export const profileData = [
  { id: 'CUS001', name: 'Aarav Patel', email: 'aarav.patel@email.com', phone: '+91 98765 43210', location: 'Mumbai', registered: '12 Jan 2024', status: 'Active', verified: true, bookings: 3, lastUpdate: '2 days ago' },
  { id: 'CUS002', name: 'Ishita Reddy', email: 'ishita.reddy@email.com', phone: '+91 87654 32109', location: 'Delhi', registered: '28 Feb 2024', status: 'Active', verified: true, bookings: 1, lastUpdate: '5 days ago' },
  { id: 'CUS003', name: 'Rohan Deshmukh', email: 'rohan.deshmukh@email.com', phone: '+91 76543 21098', location: 'Chennai', registered: '5 Mar 2024', status: 'Pending', verified: false, bookings: 0, lastUpdate: '1 day ago' },
  { id: 'CUS004', name: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '+91 65432 10987', location: 'Bangalore', registered: '19 Mar 2024', status: 'Blocked', verified: true, bookings: 5, lastUpdate: '10 days ago' },
  { id: 'CUS005', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', location: 'Pune', registered: '2 Apr 2024', status: 'Active', verified: true, bookings: 2, lastUpdate: '3 days ago' },
];

export const customerComplaintsData = [
  { id: 'TKT001', customer: 'Aarav Patel', issue: 'Vendor no-show on event day', type: 'Booking', status: 'Open', priority: 'High', created: '2 hrs ago' },
  { id: 'TKT002', customer: 'Ishita Reddy', issue: 'Payment deducted but booking not confirmed', type: 'Payment', status: 'In Progress', priority: 'Critical', created: '5 hrs ago' },
  { id: 'TKT003', customer: 'Rohan Deshmukh', issue: 'Decoration quality below expectations', type: 'Vendor', status: 'Resolved', priority: 'Medium', created: '1 day ago' },
  { id: 'TKT004', customer: 'Meera Nair', issue: 'Cannot update profile photo', type: 'Platform', status: 'Open', priority: 'Low', created: '2 days ago' },
  { id: 'TKT005', customer: 'Neha Gupta', issue: 'Refund not received after cancellation', type: 'Payment', status: 'Escalated', priority: 'Critical', created: '3 days ago' },
];