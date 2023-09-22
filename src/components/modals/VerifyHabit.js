import { useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import HabitDetailAndVerification from '../habits/HabitDetailAndVerification';

const VerifyHabitModal = ({ onClose }) => {
  const modalContentRef = useRef();

  useClickOutside(modalContentRef, onClose);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-30 bg-black bg-opacity-50'>
      <div
        className='h-[80vh] bg-dark-blue-bg border border-customGreen pt-6 pr-4 rounded w-8000 text-white rounded-xl overflow-hidden'
        ref={modalContentRef}
      >
        <HabitDetailAndVerification isModal={true}></HabitDetailAndVerification>
      </div>
    </div>
  );
};

export default VerifyHabitModal;
