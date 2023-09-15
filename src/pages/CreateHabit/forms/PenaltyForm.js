import React from 'react';
import Tooltip from '../utils/Tooltip';

const PenaltyForm = ({ penalty, setPenalty }) => {
  const handlePenaltyChange = (e) => {
    setPenalty(e.target.value);
  };

  return (
    <div>
      <label className='relative'>
        패널티 내용
        <span className='ml-2 inline-block group cursor-pointer'>
          <span className='bg-gray-200 rounded-full pr-2 pl-2'>?</span>
          <Tooltip text='동기부여를 위해 패널티를 입력해야 합니다.' />
        </span>
      </label>

      <div className='mb-4'>
        <textarea
          className='w-full p-2 border rounded'
          type='text'
          value={penalty}
          onChange={handlePenaltyChange}
          placeholder='패널티 내용을 입력하세요(최대 50자)'
          minLength={2}
          maxLength={50}
        />
      </div>
    </div>
  );
};

export default PenaltyForm;
