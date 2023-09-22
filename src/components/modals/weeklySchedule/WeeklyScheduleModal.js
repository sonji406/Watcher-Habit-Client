import React, { useRef } from 'react';
import WeeklySchedule from './WeeklySchedule';
import { useClickOutside } from '../../../hooks/useClickOutside';

const WeeklyScheduleModal = ({ onClose }) => {
  const modalContentRef = useRef();

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useClickOutside(modalContentRef, handleClose);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-40 bg-black bg-opacity-50'>
      <WeeklySchedule
        modalContentRef={modalContentRef}
        handleClose={handleClose}
      />
    </div>
  );
};

export default WeeklyScheduleModal;
