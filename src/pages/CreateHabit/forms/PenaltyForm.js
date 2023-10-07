import React, { useState } from 'react';
import Tooltip from '../utils/Tooltip';
import validationMessages from './message/validationMessages';

const PenaltyForm = ({ penalty, setPenalty }) => {
  const tooltipText = (
    <>
      <div>
        <span className='text-black'>
          동기부여를 위해 패널티를 입력해야 합니다.
        </span>
      </div>
    </>
  );

  const [penaltyValidation, setPenaltyValidation] = useState('');

  const handlePenaltyChange = (e) => {
    setPenalty(e.target.value);

    if (!e.target.value) {
      setPenaltyValidation(validationMessages.penaltyEmpty);
    } else if (e.target.value.length < 2 || e.target.value.length > 50) {
      setPenaltyValidation(validationMessages.penaltyLength);
    } else {
      setPenaltyValidation('');
    }
  };

  return (
    <section>
      <header>
        <label className='relative text-white ml-2'>
          패널티 내용*
          <span className='mt-2 inline-block group cursor-pointer'>
            <span className='bg-dark-blue-bg text-white border-2 rounded-full shadow-lg pr-2 pl-2 ml-1'>
              ?
            </span>
            <Tooltip text={tooltipText} />
          </span>
          <span className='text-red-500 ml-2'>{penaltyValidation}</span>
        </label>
      </header>

      <div className='mb-6 mt-2'>
        <textarea
          className='w-full p-2 border-2 border-gray-500 shadow-lg rounded bg-dark-blue-bg text-white'
          type='text'
          value={penalty}
          onChange={handlePenaltyChange}
          placeholder='패널티 내용을 입력하세요 (최대 50자)'
          minLength={2}
          maxLength={50}
        />
      </div>
    </section>
  );
};

export default PenaltyForm;
