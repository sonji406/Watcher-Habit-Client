import React from 'react';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import { useSelector } from 'react-redux';

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  return (
    <div className='h-[calc(70vh-130px)] overflow-y-auto custom-scrollbar z-10 ml-4 mr-1.5 pr-1.5'>
      <HabitSection title='내용' content={habitDetail.habitContent} />
      <HabitSection title='패널티' content={habitDetail.penalty} />

      <div className='flex justify-between'>
        <HabitDuration
          startDate={habitDetail.habitStartDate}
          endDate={habitDetail.habitEndDate}
        />
        <HabitTime
          startTime={habitDetail.startTime}
          endTime={habitDetail.endTime}
        />
      </div>

      <HabitDaysOfWeek doDay={habitDetail.doDay} />

      <WatcherActions habitDetail={habitDetail} />
    </div>
  );
};

export default HabitDetail;
