import React, { useState } from 'react';
import Modal from 'react-modal'; 

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    color: 'black',
    border: 'solid',
    backgroundColor: '#b8bcf8',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

function MyPopup({ isOpen, onClose, children }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {children}
    </Modal>
  );
}

export default MyPopup;