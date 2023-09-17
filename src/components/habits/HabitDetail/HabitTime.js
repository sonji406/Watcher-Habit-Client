import React from 'react';
import ClockArcs from './ClockArcs';

const HabitTime = ({ startTime, endTime }) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  let durationHours = endHour - startHour;
  let durationMinutes = endMinute - startMinute;
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  let timeDisplay = '';
  if (durationHours > 0 && durationMinutes > 0) {
    timeDisplay = `${durationHours}시간 ${durationMinutes}분`;
  } else if (durationHours > 0) {
    timeDisplay = `${durationHours}시간`;
  } else if (durationMinutes > 0) {
    timeDisplay = `${durationMinutes}분`;
  }

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
