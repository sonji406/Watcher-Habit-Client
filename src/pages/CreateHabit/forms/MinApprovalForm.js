import React, { useState } from 'react';
import validationMessages from './message/validationMessages';

const MinApprovalForm = ({
  minApprovalCount,
  setMinApprovalCount,
  sharedGroup,
}) => {
  const handleDecrease = () => {
    const newValue = Math.max(minApprovalCount - 1, 0);
    setMinApprovalCount(newValue);
    if (sharedGroup && newValue <= 0) {
      setValidationMessage(validationMessages.minApprovalCountGroupShare);
    } else {
      setValidationMessage('');
    }
  };

  const [validationMessage, setValidationMessage] = useState('');

  const handleIncrease = () => {
    setMinApprovalCount(minApprovalCount + 1);
    if (validationMessage) {
      setValidationMessage('');
    }
  };

  if (!sharedGroup) {
    minApprovalCount = 0;
    return null;
  }

  return (
    <>
      <label className='text-white ml-2'>
        최소 승인 인원*
        <span className='text-center text-red-500 ml-2'>
          {validationMessage}
        </span>
      </label>
      <div className='mb-4 mt-2 flex flex-row items-center justify-center'>
        <button
          type='button'
          className='flex items-center justify-center bg-dark-blue-bg w-[40px] h-[40px] hover:bg-black border-2 border-gray-500 text-white shadow-lg font-bold rounded-full text-2xl'
          onClick={handleDecrease}
        >
          -
        </button>
        <span className='text-white px-4'>{minApprovalCount} 명</span>
        <button
          type='button'
          className='flex items-center justify-center bg-dark-blue-bg w-[40px] h-[40px] hover:bg-black border-2 border-gray-500 text-white shadow-lg font-bold rounded-full text-2xl'
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
      <div className='text-white text-center text-sm rounded border border-customDarkGray shadow-lg py-1 px-6 mt-2 items-center'>
        만약 인증 시간까지 최소 승인 인원보다 Watcher의 수가 적을 경우
        <br />
        최소 승인 인원은 Watcher의 수로 자동 조정됩니다
      </div>
    </>
  );
};

export default MinApprovalForm;
