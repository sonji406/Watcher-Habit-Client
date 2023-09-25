import React, { useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import getStatusMessage from './utils/getStatusMessage';

const HabitImageModal = ({ isOpen, image, status, onClose }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  return (
    isOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          ref={modalRef}
          className='relative bg-main-bg rounded-lg overflow-hidden max-w-lg w-[500px] h-[350px] border-2 border-black'
        >
          <button
            className='absolute top-2 right-2 text-white rounded-full py-1 px-3 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
            onClick={onClose}
          >
            <span className='relative top-[-2px]'>x</span>
          </button>
          <div className='p-4'>
            <p className='text-xl text-center font-bold text-green-txt mb-4'>
              인증 사진
            </p>
            <div className='text-center text-lg mb-2'>
              {getStatusMessage(status)}
            </div>
            <div className='flex justify-center items-center'>
              {image ? (
                <img
                  src={image}
                  alt='Selected Habit'
                  className='w-[220px] h-[220px] object-cover rounded-2xl border'
                />
              ) : (
                <p className='flex w-[220px] h-[220px] bg-gray-700 border rounded-2xl justify-center items-center text-center text-gray-400 mt-2'>
                  인증 사진이 없습니다
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default HabitImageModal;
