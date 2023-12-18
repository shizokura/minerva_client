// components/PaymentModal.tsx
import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalTerms: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-sm">
      <div className="w-[600px] flex flex-col relative z-50 p-8 max-w-md rounded-md text-left">


      </div>
     
    </div>

    
  ) : null;
};
export default ModalTerms;