import React from 'react';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import axios from 'axios';

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  const currentUserId = getUserIdFromToken();
  const isCurrentUser = currentUserId === habitDetail.creator._id;

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
      {isCurrentUser && (
        <div>
          <Link
            to={{
              pathname: `/edit-Habit/${habitDetail._id}`,
            }}
          >
            수정
          </Link>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default HabitDetail;
