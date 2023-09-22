import React from 'react';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import isLoginUser from '../../../lib/isLoginUser';
import axios from 'axios';

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);
  const location = useLocation();

  const isCurrentUser = isLoginUser(habitDetail.creator._id);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitDetail._id}`,
      );

      window.location.reload();
    } catch (error) {
      console.error('Habit deletion failed:', error);
    }
  };

  return (
    <div className='h-[calc(70vh-130px)] overflow-y-auto custom-scrollbar z-10 ml-4 mr-1.5 pr-1.5 pb-10'>
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
      {location.pathname.startsWith('/my-habit') && isCurrentUser && (
        <div className='flex justify-center mt-6 space-x-4'>
          <Link
            to={{
              pathname: `/edit-Habit/${habitDetail._id}`,
            }}
            className='bg-green-bg w-32 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all hover:bg-green-800 border-2'
          >
            수정
          </Link>

          <button
            onClick={handleDelete}
            className='bg-transparent w-32 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all hover:bg-red-500 border-2'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitDetail;
