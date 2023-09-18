import React from 'react';

const HabitDaysOfWeek = ({ doDay }) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const daysOfWeekInKorean = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 text-left'>
      <span className='font-bold'>반복 요일</span>
      <div className='flex justify-center'>
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`mr-1 ml-1 mb-4 flex text-center rounded-full pr-3 pl-3 pt-1 pb-1 ${
              doDay.includes(day) ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {daysOfWeekInKorean[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitDaysOfWeek;
