import React, { useState } from 'react';

const MinApprovalForm = ({
  minApprovalCount,
  setMinApprovalCount,
  sharedGroup,
}) => {
  const handleDecrease = () => {
    const newValue = Math.max(minApprovalCount - 1, 0);
    setMinApprovalCount(newValue);
    if (sharedGroup && newValue <= 0) {
      setValidationMessage(
        '그룹 공유 시 최소 승인 인원은 1명 이상이어야 합니다.',
      );
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
      <label className='text-white ml-2'>최소 승인 인원 </label>
      <div className='mb-4 mt-2 flex items-center'>
        <button
          type='button'
          className='bg-dark-blue-bg hover:bg-black border-2 border-gray-500 text-white shadow-lg font-bold py-1 px-2 rounded'
          onClick={handleDecrease}
        >
          -
        </button>
        <span className='text-white px-4'>{minApprovalCount} 명</span>
        <button
          type='button'
          className='bg-dark-blue-bg hover:bg-black border-2 border-gray-500 text-white shadow-lg font-bold py-1 px-2 rounded'
          onClick={handleIncrease}
        >
          +
        </button>
        <div className='text-white text-center text-sm rounded border border-customDarkGray shadow-lg py-1 px-6 ml-4'>
          만약 인증 시간까지 최소 승인 인원보다 Watcher의 수가 적을 경우
          <br />
          최소 승인 인원은 Watcher의 수로 자동 조정됩니다
        </div>
      </div>
      <div className='text-red-500 mt-2'>{validationMessage}</div>
    </>
  );
};

export default MinApprovalForm;
