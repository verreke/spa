import React, { createContext, useState, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [lastFocusedElement, setLastFocusedElement] = useState(null);

  const openModal = useCallback((content) => {
    setLastFocusedElement(document.activeElement);
    setModalContent(content);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    if (lastFocusedElement) lastFocusedElement.focus();
    setModalContent(null);
    document.body.style.overflow = 'unset';
  }, [lastFocusedElement]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={closeModal}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            {modalContent}
          </div>
        </div>,
        document.body
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
