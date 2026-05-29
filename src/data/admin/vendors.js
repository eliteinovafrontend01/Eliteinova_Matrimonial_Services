export const allVendorsData = [
  { id: 'VND001', name: 'LensArt Studio', category: 'Photography', location: 'Mumbai', rating: 4.9, status: 'Active', verified: true, bookings: 124 },
  { id: 'VND002', name: 'Royal Feast', category: 'Catering', location: 'Delhi', rating: 4.8, status: 'Active', verified: true, bookings: 112 },
  { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', location: 'Jaipur', rating: 4.7, status: 'Active', verified: true, bookings: 89 },
  { id: 'VND004', name: 'DJ Rhythm Pro', category: 'Entertainment', location: 'Bangalore', rating: 4.9, status: 'Active', verified: true, bookings: 134 },
  { id: 'VND005', name: 'Dream Decor Co.', category: 'Decorations', location: 'Bangalore', rating: 4.8, status: 'Pending', verified: false, bookings: 94 },
  { id: 'VND006', name: 'Glam Bridal Studio', category: 'Bridal Styling', location: 'Mumbai', rating: 4.9, status: 'Active', verified: true, bookings: 203 },
];

export const manageProfileData = [
  { id: 'VND001', name: 'LensArt Studio', category: 'Photography', services: 3, lastUpdated: '2 days ago', rating: 4.9, bookings: 124, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'VND002', name: 'Royal Feast', category: 'Catering', services: 5, lastUpdated: '5 days ago', rating: 4.8, bookings: 112, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'VND003', name: 'DJ Rhythm Pro', category: 'Entertainment', services: 2, lastUpdated: '1 day ago', rating: 4.9, bookings: 134, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
  { id: 'VND004', name: 'Dream Decor Co.', category: 'Decorations', services: 4, lastUpdated: '10 days ago', rating: 4.8, bookings: 94, status: 'Inactive', verified: true, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400' },
  { id: 'VND005', name: 'Glam Bridal Studio', category: 'Bridal Styling', services: 6, lastUpdated: '3 days ago', rating: 4.9, bookings: 203, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-amber-400 to-yellow-400' },
];

export const verificationQueueData = [
  { id: 'VND001', name: 'LensArt Studio', category: 'Photography', owner: 'Deepak Shah', submitted: '20 Mar 2024', bizLic: 'Verified', gst: 'Verified', idProof: 'Verified', status: 'Verified', avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'VND002', name: 'Spice Route Caterers', category: 'Catering', owner: 'Sunita Reddy', submitted: '19 Mar 2024', bizLic: 'Under Review', gst: 'Verified', idProof: 'Pending', status: 'Under Review', avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', owner: 'Anil Choudhary', submitted: '18 Mar 2024', bizLic: 'Pending', gst: 'Pending', idProof: 'Verified', status: 'Pending', avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
  { id: 'VND004', name: 'Beat Makers DJ', category: 'Entertainment', owner: 'Vikram Nair', submitted: '17 Mar 2024', bizLic: 'Rejected', gst: 'Verified', idProof: 'Under Review', status: 'Rejected', avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
];

export const businessLicenseData = [
  { id: 'LIC001', vendor: 'LensArt Studio', category: 'Photography', regNo: 'MH-MUM-2019-0042', issuer: 'ROC Mumbai', validity: '31 Dec 2025', status: 'Verified', avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'LIC002', vendor: 'Royal Feast', category: 'Catering', regNo: 'DL-REG-2021-1187', issuer: 'ROC Delhi', validity: '15 Aug 2024', status: 'Expired', avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'LIC003', vendor: 'Heritage Mahal', category: 'Wedding Halls', regNo: 'RJ-JAI-2020-0331', issuer: 'ROC Jaipur', validity: '20 Jun 2026', status: 'Pending', avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
];

export const gstData = [
  { id: 'GST001', vendor: 'LensArt Studio', category: 'Photography', gstin: '27AAPFL1234A1Z5', bizName: 'LensArt Studio Pvt Ltd', bizType: 'Private Ltd', address: 'Mumbai, MH', status: 'Verified', avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'GST002', vendor: 'Royal Feast', category: 'Catering', gstin: '07BBBFC5678B2Y6', bizName: 'Royal Feast Enterprises', bizType: 'Partnership', address: 'Delhi, DL', status: 'Verified', avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'GST003', vendor: 'Heritage Mahal', category: 'Wedding Halls', gstin: '—', bizName: '—', bizType: '—', address: 'Jaipur, RJ', status: 'Pending', avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
];

export const idProofData = [
  { id: 'KYC001', vendor: 'LensArt Studio', owner: 'Deepak Shah', idType: 'Aadhaar Card', idNo: 'XXXX-XXXX-4321', dob: '12 Mar 1988', photoMatch: true, status: 'Verified', avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'KYC002', vendor: 'Royal Feast', owner: 'Sunita Reddy', idType: 'PAN Card', idNo: 'ABCPR1234D', dob: '25 Jul 1980', photoMatch: true, status: 'Verified', avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'KYC003', vendor: 'Heritage Mahal', owner: 'Anil Choudhary', idType: 'Passport', idNo: 'P1234567', dob: '03 Jan 1975', photoMatch: false, status: 'Under Review', avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
];

export const verifiedVendorsData = [
  { id: 'VND001', name: 'LensArt Studio', category: 'Photography', location: 'Mumbai', contact: '+91 98765 43210', verifiedOn: '15 Jan 2024', rating: 4.9, bookings: 124, status: 'Active', avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
  { id: 'VND002', name: 'Royal Feast', category: 'Catering', location: 'Delhi', contact: '+91 87654 32100', verifiedOn: '20 Jan 2024', rating: 4.8, bookings: 112, status: 'Active', avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
  { id: 'VND003', name: 'Grand Palace Banquets', category: 'Wedding Halls', location: 'Mumbai', contact: '+91 76543 21099', verifiedOn: '5 Feb 2024', rating: 4.9, bookings: 89, status: 'Active', avatarBg: 'bg-gradient-to-br from-blue-400 to-cyan-400' },
  { id: 'VND004', name: 'DJ Rhythm Pro', category: 'Entertainment', location: 'Bangalore', contact: '+91 65432 10988', verifiedOn: '12 Feb 2024', rating: 4.9, bookings: 134, status: 'Active', avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
];