import React from 'react';
import { useSelector } from 'react-redux';
import AuthorAndVisibility from './AuthorAndVisibility';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  console.log(habitDetail);

  if (!habitDetail || isEmptyObject(habitDetail)) {
    return (
      <div className='h-[70vh] text-dark-gray-txt flex justify-center items-center text-center'>
        좌측의 카드를 클릭하여
        <br />
        해당 습관의 상세 정보를 확인할 수 있습니다
      </div>
    );
  }

  const startDate = new Date(habitDetail.habitStartDate);
  const endDate = new Date(habitDetail.habitEndDate);
  const durationDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

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
        <div className='bg-main-bg p-4 rounded-lg mb-4 text-center'>
          <p className='font-bold text-left'>내용</p>
          <p className='mb-4 text-2xl'>{habitDetail.habitContent}</p>
        </div>

        <div className='bg-main-bg p-4 rounded-lg mb-4 text-center'>
          <p className='font-bold text-left'>패널티</p>
          <p className='mb-4 text-2xl'>{habitDetail.penalty}</p>
        </div>

        <div className='flex justify-between'>
          <HabitDuration
            startDate={habitDetail.habitStartDate}
            endDate={habitDetail.habitEndDate}
            durationDays={durationDays}
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
