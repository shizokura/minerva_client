// components/Modal.tsx
import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-sm">
      <div className="w-[1000px] flex flex-col relative z-50 p-8 max-w-md rounded-md text-left">
        <button onClick={onClose} className="absolute top-0 right-0 text-white text-xl place-self-end">
          X
        </button>
        {children}
      </div>
    </div>
  ) : null;
};
export default Modal;