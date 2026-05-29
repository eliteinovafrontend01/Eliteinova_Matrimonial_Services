import React, { useState } from 'react';
import PhotographyVendorForm from './PhotographyForm';
import EntertainmentVendorForm from './EntertainmentForm';
import InvitationVendorForm from './InvitationForm';
import StylingVendorForm from './StylingForm';
import CateringVendorForm from './CateringForm';
import WeddingHallsVendorForm from './WeddingHallsForm';
import DecorationsVendorForm from './DecorationsForm';

const FormManager = ({ isOpen, formType, onClose }) => {
  if (!isOpen) return null;

  const renderForm = () => {
    switch (formType) {
      case 'photography':
        return <PhotographyVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'entertainment':
        return <EntertainmentVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'invitation':
        return <InvitationVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'styling':
        return <StylingVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'catering':
        return <CateringVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'wedding-halls':
        return <WeddingHallsVendorForm isOpen={isOpen} onClose={onClose} />;
      case 'decorations':
        return <DecorationsVendorForm isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  };

  return renderForm();
};

export default FormManager;