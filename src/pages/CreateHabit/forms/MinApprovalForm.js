import React from 'react';

const MinApprovalForm = ({
  minApprovalCount,
  setMinApprovalCount,
  sharedGroup,
}) => {
  if (!sharedGroup) {
    minApprovalCount = 0;
    return null;
  }

  return (
    <>
      <label>최소 승인 인원</label>
      <div className='mb-4 flex items-center'>
        <button
          type='button'
          className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded'
          onClick={() => setMinApprovalCount(Math.max(minApprovalCount - 1, 0))}
        >
          -
        </button>
        <span className='px-4'>{minApprovalCount}</span>
        <button
          type='button'
          className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded'
          onClick={() => setMinApprovalCount(minApprovalCount + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default MinApprovalForm;
