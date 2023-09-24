import React from 'react';

const HabitTime = ({ startTime, endTime }) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const durationHours = endHour - startHour;
  const durationMinutes = endMinute - startMinute;

  const timeDisplay = [
    durationHours > 0 ? `${durationHours}시간` : '',
    durationMinutes > 0 ? `${durationMinutes}분` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 mr-2'>
      <div>
        <span className='font-bold text-left block'>시간</span>
        <div className='text-center text-xl'>
          {startTime} ~ {endTime}
          <span className='ml-3 text-green-txt'>하루에 {timeDisplay}씩</span>
        </div>
      </div>
    </div>
  );
};

export default HabitTime;
