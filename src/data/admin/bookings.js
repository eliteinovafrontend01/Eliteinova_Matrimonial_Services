// src/data/admin/bookings.js
export const allBookingsData = [
  { id: 'BK-001', customer: 'John Doe', service: 'Wedding Photography', vendor: 'Sarah Photography', bookingDate: '2024-01-15', eventDate: '2024-02-20', status: 'Confirmed', payment: 'Paid', amount: '₹15,000' },
  { id: 'BK-002', customer: 'Jane Smith', service: 'Birthday Party', vendor: 'Event Masters', bookingDate: '2024-01-16', eventDate: '2024-02-25', status: 'Pending', payment: 'Partial', amount: '₹8,000' },
  { id: 'BK-003', customer: 'Mike Johnson', service: 'Corporate Event', vendor: 'Corporate Solutions', bookingDate: '2024-01-14', eventDate: '2024-02-18', status: 'In Progress', payment: 'Pending', amount: '₹25,000' },
  { id: 'BK-004', customer: 'Sarah Williams', service: 'Wedding Catering', vendor: 'Gourmet Delights', bookingDate: '2024-01-13', eventDate: '2024-02-22', status: 'Completed', payment: 'Paid', amount: '₹30,000' },
  { id: 'BK-005', customer: 'Robert Brown', service: 'Conference Setup', vendor: 'Tech Events', bookingDate: '2024-01-12', eventDate: '2024-02-19', status: 'Cancelled', payment: 'Refunded', amount: '₹12,000' },
  { id: 'BK-006', customer: 'Emily Davis', service: 'Birthday Party', vendor: 'Party Planners', bookingDate: '2024-01-17', eventDate: '2024-02-28', status: 'Confirmed', payment: 'Paid', amount: '₹10,000' },
  { id: 'BK-007', customer: 'David Wilson', service: 'Wedding Photography', vendor: 'Sarah Photography', bookingDate: '2024-01-18', eventDate: '2024-03-01', status: 'Pending', payment: 'Partial', amount: '₹20,000' },
];

export const availableVendors = [
  { id: 1, name: 'Sarah Photography', category: 'Photography', location: 'Mumbai', rating: 4.8, available: true, price: '₹15,000' },
  { id: 2, name: 'Event Masters', category: 'Event Planning', location: 'Mumbai', rating: 4.6, available: true, price: '₹20,000' },
  { id: 3, name: 'Corporate Solutions', category: 'Corporate Events', location: 'Pune', rating: 4.9, available: false, price: '₹30,000' },
  { id: 4, name: 'Gourmet Delights', category: 'Catering', location: 'Mumbai', rating: 4.7, available: true, price: '₹25,000' },
  { id: 5, name: 'Party Planners', category: 'Event Planning', location: 'Mumbai', rating: 4.5, available: true, price: '₹12,000' },
  { id: 6, name: 'Tech Events', category: 'Technical', location: 'Pune', rating: 4.8, available: true, price: '₹18,000' },
];