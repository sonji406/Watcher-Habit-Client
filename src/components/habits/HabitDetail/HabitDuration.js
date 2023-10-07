import React from 'react';

const HabitDuration = ({ startDate: start, endDate: end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedStartDate = startDate.toLocaleDateString('ko-KR', options);
  const formattedEndDate = endDate.toLocaleDateString('ko-KR', options);

  const durationDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4'>
      <span className='font-bold text-left block'>기한</span>
      <div className='text-center text-xl'>
        {formattedStartDate} ~ {formattedEndDate}
        <span className='ml-3 text-green-txt'>{durationDays}일 동안</span>
      </div>
    </div>
  );
};

export default HabitDuration;
