import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,  children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <button onClick={onClose} className="top-2 right-2">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;