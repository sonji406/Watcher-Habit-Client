import React from 'react';
import ClockArcs from './ClockArcs';

const HabitTime = ({ startTime, endTime }) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const durationHours = endHour - startHour;
  const durationMinutes = endMinute - startMinute;
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  const timeDisplay = [
    durationHours > 0 ? `${durationHours}시간` : '',
    durationMinutes > 0 ? `${durationMinutes}분` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 w-2/3 ml-2 flex justify-between'>
      <div className='w-1/2'>
        <span className='font-bold text-left block'>시간</span>
        <div className='text-center text-xl'>{startTime}</div>
        <div className='text-center text-xl mb-4'>~ {endTime}</div>
        <div className='text-center text-xl mb-2'>하루에 {timeDisplay}</div>
      </div>
      <div className='w-1/2 flex justify-center mt-4'>
        <ClockArcs startMinutes={startMinutes} endMinutes={endMinutes} />
      </div>
    </div>
  );
};

export default HabitTime;
