import React from 'react';

const HabitDuration = ({ startDate: start, endDate: end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const durationDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 w-1/3 mr-2'>
      <span className='font-bold text-left block'>기한</span>
      <div className='text-center text-xl'>
        {startDate.toLocaleDateString()}
      </div>
      <div className='text-center text-xl mb-4'>
        ~ {endDate.toLocaleDateString()}
      </div>
      <div className='text-center text-xl mb-2'>{durationDays}일 동안</div>
    </div>
  );
};

export default HabitDuration;
