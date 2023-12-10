// components/Modal.tsx
import { FC, ReactNode } from 'react';

interface ModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  children: ReactNode;
}

const PasswordChangeSuccessModal: FC<ModalProps> = ({ isModalOpen, onModalClose, children }) => {
  return isModalOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="relative z-40 bg-black p-8 max-w-md rounded-md text-left">
        <button onClick={onModalClose} className="absolute top-0 right-0 p-4 focus:outline-none t text-blue-500">
          Close
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default PasswordChangeSuccessModal;