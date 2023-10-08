import React, { useState } from 'react';
import WatcherActions from './WatcherActions';
import HabitDuration from './HabitDuration';
import HabitTime from './HabitTime';
import HabitDaysOfWeek from './HabitDaysOfWeek';
import HabitSection from './HabitSection';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import isLoginUser from '../../../lib/isLoginUser';
import api from '../../../utils/api';

const HabitDetail = ({ isModal = false }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;

  const habitDetail = useSelector(selectConditon);
  const location = useLocation();

  const isCurrentUser = isLoginUser(habitDetail.creator._id);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitDetail._id}`,
        { withCredentials: true },
      );

      navigate(0);
    } catch (error) {
      console.error('Habit deletion failed:', error);
      setIsDeleting(false);
    }
  };

  const handleDeleteConfirmation = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    setConfirmDelete(false);
    handleDelete();
  };

  return (
    <article className='h-[calc(70vh-150px)] overflow-y-auto custom-scrollbar z-10 ml-4 mr-1.5 pr-1.5 pb-10'>
      <HabitSection title='내용' content={habitDetail.habitContent} />

      <HabitSection title='패널티' content={habitDetail.penalty} />

      <HabitDuration
        startDate={habitDetail.habitStartDate}
        endDate={habitDetail.habitEndDate}
      />

      <HabitTime
        startTime={habitDetail.startTime}
        endTime={habitDetail.endTime}
      />

      <HabitDaysOfWeek doDay={habitDetail.doDay} />

      <WatcherActions habitDetail={habitDetail} isModal={isModal} />

      {location.pathname.startsWith('/my-habit') && isCurrentUser && (
        <footer className='flex flex-wrap mt-6 w-full justify-center mb-2'>
          <div className='flex space-x-4'>
            {habitDetail.status === 'notTimeYet' && (
              <div>
                <Link
                  to={{
                    pathname: `/edit-Habit/${habitDetail._id}`,
                  }}
                  className='bg-green-bg w-32 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all hover:bg-green-800 border-2'
                >
                  수정
                </Link>
              </div>
            )}

            {confirmDelete ? (
              <nav className='flex space-x-4'>
                <p className='text-center ml-2 mt-1'>
                  이 습관을 삭제하시겠습니까?
                </p>
                <button
                  onClick={handleConfirmDelete}
                  className='bg-transparent w-10 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all hover:bg-red-500 border-2'
                >
                  네
                </button>
                <button
                  onClick={handleCancelDelete}
                  className='bg-transparent w-20 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all hover:bg-green-bg border-2'
                >
                  아니오
                </button>
              </nav>
            ) : (
              <div>
                <button
                  onClick={handleDeleteConfirmation}
                  className={`w-32 h-8 rounded-xl flex items-center justify-center text-center text-white transition-all ${
                    isDeleting
                      ? 'bg-red-500'
                      : 'bg-transparent hover:bg-red-500'
                  } border-2`}
                  disabled={isDeleting}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            )}
          </div>
        </footer>
      )}
    </article>
  );
};

export default HabitDetail;
