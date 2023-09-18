import React from 'react';
import { useSelector } from 'react-redux';
import AuthorAndVisibility from './AuthorAndVisibility';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import EmptyHabitDetailState from './EmptyHabitDetailState';

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  if (isEmptyObject(habitDetail)) {
    return <EmptyHabitDetailState />;
  }

  return (
    <div className='h-full overflow-hidden bg-dark-blue-bg rounded-3xl z-10 relative p-3'>
      <div className='h-full overflow-y-auto pt-4 pr-2 custom-scrollbar'>
        <div className='p-4 rounded-lg flex justify-between items-end'>
          <h1 className='text-3xl text-center flex-1'>
            {habitDetail.habitTitle}
          </h1>
        </div>

        <AuthorAndVisibility
          creator={habitDetail.creator}
          sharedGroup={habitDetail.sharedGroup}
        />

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
    </div>
  );
};

export default HabitDetail;
