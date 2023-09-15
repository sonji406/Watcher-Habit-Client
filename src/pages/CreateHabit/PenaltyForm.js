import React from 'react';

const PenaltyForm = ({ penalty, setPenalty }) => {
  return (
    <div>
      <label>패널티 내용</label>
      <div className='mb-4'>
        <textarea
          className='w-full p-2 border rounded'
          type='text'
          value={penalty}
          onChange={(e) => setPenalty(e.target.value)}
          placeholder='패널티 내용을 입력하세요(최대 50자)'
          minLength={2}
          maxLength={50}
        />
      </div>
    </div>
  );
};

export default PenaltyForm;
