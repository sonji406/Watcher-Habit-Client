import React from 'react';
import { useSelector } from 'react-redux';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import EmptyHabitDetailState from './EmptyHabitDetailState';
import { isEmptyObject } from '../../../utils/objectUtils';

const HabitDetail = ({ habitDetail }) => {
  if (isEmptyObject(habitDetail)) {
    return <EmptyHabitDetailState />;
  }

  return (
    <div className='h-full overflow-y-auto custom-scrollbar z-10 relative ml-4 mr-1.5 pr-1.5'>
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
