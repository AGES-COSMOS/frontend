import React from 'react';
import './modal.scss';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const ModalInteracoesFeed: React.FC<ModalProps> = ({
  isOpen = false,
  onClose = () => {
    console.log('a');
  },
  title = 'Default Title',
  children = <p>Default Content</p>,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default ModalInteracoesFeed;
