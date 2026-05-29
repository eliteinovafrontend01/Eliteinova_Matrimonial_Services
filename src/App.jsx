import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from './Components/Header';
import VendorLoginForm from './pages/VendorLoginForm';

// Import existing page components
import Home from './pages/Home';
import Photography from './pages/Photography'; 
import Catering from './pages/Catering';
import WeddingHalls from './pages/WeddingHalls';
import Decoration from './pages/Decoration';
import Entertainment from './pages/Entertainment';
import Invitation from './pages/Invitation';
import Styling from './pages/Styling';
import VendorLogin from './pages/VendorLogin';
import VendorProfile from './pages/VendorProfile'; 

// Import customer authentication pages
import CustomerProfile from './pages/CustomerProfile';
import CustomerLogin from './pages/CustomerLogin';
import RegisterChoice from './pages/RegisterChoice';
import LoginChoice from './pages/LoginChoice';

// Customer Registration Modal
import CustomerRegistrationForm from './Components/CustomerRegistrationForm';

// Import all vendor form components
import PhotographyVendorForm from './Components/PhotographyForm';
import CateringVendorForm from './Components/CateringForm';
import WeddingHallsVendorForm from './Components/WeddingHallsForm';
import DecorationsVendorForm from './Components/DecorationsForm';
import EntertainmentVendorForm from './Components/EntertainmentForm';
import InvitationVendorForm from './Components/InvitationForm';
import StylingVendorForm from './Components/StylingForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import OfficeDashboard from './pages/office/OfficeDashboard';

import BackgroundInvestigationsForm from './Components/BackgroundInvestigationsForm';
import BackgroundInvestigationsPage from './pages/BackgroundInvestigationsPage';
// Import Pre-Matrimonial Verification page
import PreMatrimonialVerification from './pages/PreMatrimonialVerification';

import FloatingButtons from './Components/FloatingButtons';

// NOTE: VendorDetails is now a modal component used inside each page.
// It is NO LONGER used as a route here in App.jsx.

// Create a wrapper component for VendorProfile with params
const VendorProfileWrapper = () => {
  const { vendorId } = useParams();
  return <VendorProfile vendorId={vendorId} />;
};

// Create wrapper components for each page to pass the openVendorForm prop
const PhotographyWrapper = ({ openVendorForm }) => <Photography openVendorForm={openVendorForm} />;
const CateringWrapper = ({ openVendorForm }) => <Catering openVendorForm={openVendorForm} />;
const WeddingHallsWrapper = ({ openVendorForm }) => <WeddingHalls openVendorForm={openVendorForm} />;
const DecorationWrapper = ({ openVendorForm }) => <Decoration openVendorForm={openVendorForm} />;
const EntertainmentWrapper = ({ openVendorForm }) => <Entertainment openVendorForm={openVendorForm} />;
const InvitationWrapper = ({ openVendorForm }) => <Invitation openVendorForm={openVendorForm} />;
const StylingWrapper = ({ openVendorForm }) => <Styling openVendorForm={openVendorForm} />;
const BackgroundInvestigationsWrapper = ({ openVendorForm }) => <BackgroundInvestigationsPage openVendorForm={openVendorForm} />;
const VendorLoginWrapper = ({ openVendorForm }) => <VendorLogin openVendorForm={openVendorForm} />;

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFormType, setActiveFormType] = useState(null);
  const [showVendorLoginModal, setShowVendorLoginModal] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const openVendorForm = (formType) => {
    console.log(`App.jsx: Opening ${formType} form`);
    setActiveFormType(formType);
    setIsFormOpen(true);
  };

  const closeVendorForm = () => {
    setIsFormOpen(false);
    setActiveFormType(null);
  };

  const openVendorLoginModal = () => {
    setShowVendorLoginModal(true);
  };

  const closeVendorLoginModal = () => {
    setShowVendorLoginModal(false);
  };

  // Function to render the correct form based on type
  const renderVendorForm = () => {
    switch (activeFormType) {
      case 'photography':
        return <PhotographyVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'catering':
        return <CateringVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'wedding-halls':
        return <WeddingHallsVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'decorations':
        return <DecorationsVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'entertainment':
        return <EntertainmentVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'invitation':
        return <InvitationVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'styling':
        return <StylingVendorForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      case 'background-investigations':
        return <BackgroundInvestigationsForm isOpen={isFormOpen} onClose={closeVendorForm} />;
      default:
        return null;
    }
  };

  // Check if current path is admin panel to hide Header
  useEffect(() => {
    const checkPath = () => {
    const isAdminPath = window.location.pathname.startsWith('/admin-panel');
    const isOfficePath = window.location.pathname.startsWith('/office-panel');
    setShowHeader(!isAdminPath && !isOfficePath);
  };
    
    checkPath();
    
    // Listen for route changes
    window.addEventListener('popstate', checkPath);
    return () => {
      window.removeEventListener('popstate', checkPath);
    };
  }, []);

  // Listen for form opening events from anywhere in the app
  useEffect(() => {
    const handleGlobalFormOpen = (event) => {
      if (event.detail && event.detail.formType) {
        openVendorForm(event.detail.formType);
      }
    };
    window.addEventListener('openVendorFormGlobal', handleGlobalFormOpen);
    return () => {
      window.removeEventListener('openVendorFormGlobal', handleGlobalFormOpen);
    };
  }, []);

  // Layout wrapper component that conditionally renders Header
  const Layout = ({ children }) => {
    const location = window.location.pathname;
    const isAdminRoute = location.startsWith('/admin-panel') || location.startsWith('/office-panel');
    
    return (
      <div className="min-h-screen">
        {!isAdminRoute && (
          <Header 
            onOpenVendorForm={openVendorForm} 
            onOpenVendorLoginModal={openVendorLoginModal}
          />
        )}
        {children}
        {!isAdminRoute && <FloatingButtons />}
      </div>
    );
  };

  return (
    <Router>
      <Layout>
        {isFormOpen && renderVendorForm()}

        {showVendorLoginModal && (
          <VendorLoginForm 
            onClose={closeVendorLoginModal}
            showRegisterOptions={true}
          />
        )}

        <Routes>
          {/* ── Admin Dashboard — full screen, NO Header ── */}
          <Route path="/admin-panel" element={<AdminDashboard />} />
          <Route path="/admin-panel/*" element={<AdminDashboard />} />

          {/* ── Office Dashboard — full screen, NO Header ── */}   {/* ← ADD THIS */}
          <Route path="/office-panel" element={<OfficeDashboard />} />
          <Route path="/office-panel/*" element={<OfficeDashboard />} />

          {/* PRE-MATRIMONIAL VERIFICATION PAGE */}
          <Route path="/pre-matrimonial-verification" element={<PreMatrimonialVerification />} />
          
          {/* ============================================ */}
          {/* CUSTOMER AUTHENTICATION ROUTES */}
          {/* ============================================ */}
          <Route path="/register-choice" element={<RegisterChoice />} />
          <Route path="/login-choice" element={<LoginChoice />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          
          {/* ============================================ */}
          {/* CUSTOMER SERVICE LISTING PAGES */}
          {/* ============================================ */}
          <Route path="/photography" element={<PhotographyWrapper openVendorForm={openVendorForm} />} />
          <Route path="/catering" element={<CateringWrapper openVendorForm={openVendorForm} />} />
          <Route path="/wedding-halls" element={<WeddingHallsWrapper openVendorForm={openVendorForm} />} />
          <Route path="/decorations" element={<DecorationWrapper openVendorForm={openVendorForm} />} />
          <Route path="/entertainment" element={<EntertainmentWrapper openVendorForm={openVendorForm} />} />
          <Route path="/invitation" element={<InvitationWrapper openVendorForm={openVendorForm} />} />
          <Route path="/styling" element={<StylingWrapper openVendorForm={openVendorForm} />} />
          <Route path="/background-investigations" element={<BackgroundInvestigationsWrapper openVendorForm={openVendorForm} />} />
          
          {/* ============================================ */}
          {/* VENDOR LOGIN & PROFILE ROUTES */}
          {/* ============================================ */}
          <Route path="/vendor-login" element={<VendorLoginWrapper openVendorForm={openVendorForm} />} />
          <Route path="/vendor-profile" element={<VendorProfileWrapper />} />
          <Route path="/vendor-profile/:vendorId" element={<VendorProfileWrapper />} />
          <Route path="/vendor-dashboard" element={<VendorProfileWrapper />} />
          <Route path="/vendor-dashboard/:vendorId" element={<VendorProfileWrapper />} />
          
          {/* ============================================ */}
          {/* VENDOR REGISTRATION FORM ROUTES */}
          {/* ============================================ */}
          <Route path="/register/photography" element={
            <PhotographyVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/catering" element={
            <CateringVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/wedding-halls" element={
            <WeddingHallsVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/decorations" element={
            <DecorationsVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/entertainment" element={
            <EntertainmentVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/invitation" element={
            <InvitationVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/styling" element={
            <StylingVendorForm isOpen={true} onClose={() => window.history.back()} />
          } />
          <Route path="/register/background-investigations" element={
            <BackgroundInvestigationsForm isOpen={true} onClose={() => window.history.back()} />
          } />
          
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;