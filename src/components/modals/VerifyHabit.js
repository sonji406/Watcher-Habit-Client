import { useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import HabitVerification from '../habits/verification/HabitVerification';

const VerifyHabitModal = ({ onClose }) => {
  const modalContentRef = useRef();

  useClickOutside(modalContentRef, onClose);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-30 bg-black bg-opacity-50'>
      <div
        className='bg-dark-blue-bg border border-customGreen rounded p-5 w-8000 text-white rounded-xl'
        ref={modalContentRef}
      >
        <HabitVerification></HabitVerification>
      </div>
    </div>
  );
};

export default VerifyHabitModal;
