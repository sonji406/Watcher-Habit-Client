import React, { useState, useRef } from 'react';
import { DAYS_IN_KOREAN, DAYS_MAPPING } from '../../../constants/daysConstants';
import { useClickOutside } from '../../../hooks/useClickOutside';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

const WeeklyHabitList = ({ habits, historyHabits, date }) => {
  const isAfterYesterday = date > yesterday;

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'approvalSuccess':
        return 'border-green-500';
      case 'expiredFailure':
      case 'approvalFailure':
        return 'border-red-500';
      default:
        return 'border-main-bg';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approvalSuccess':
        return (
          <>
            성공!
            <span role='img' aria-label='축하 이모티콘' className='ml-2'>
              🎉
            </span>
          </>
        );
      case 'expiredFailure':
        return (
          <>
            기한 내에 인증 사진을 업로드하지 않았네요
            <span role='img' aria-label='우는 이모티콘' className='ml-2'>
              😢
            </span>
          </>
        );
      case 'approvalFailure':
        return (
          <>
            최소 승인 인원을 넘지 못했어요
            <span role='img' aria-label='아쉬운 이모티콘' className='ml-2'>
              😔
            </span>
          </>
        );
      default:
        return '';
    }
  };

  const relevantHabits = habits
    .reduce((acc, habit) => {
      const dayInKorean = DAYS_IN_KOREAN[date.getDay()];
      const isRelevantDay = habit.doDay.includes(
        Object.keys(DAYS_MAPPING).find(
          (key) => DAYS_MAPPING[key] === dayInKorean,
        ),
      );

      const isWithinDateRange =
        isAfterYesterday &&
        date.getFullYear() === new Date(habit.habitStartDate).getFullYear() &&
        date.getMonth() === new Date(habit.habitStartDate).getMonth() &&
        date.getDate() >= new Date(habit.habitStartDate).getDate() &&
        date.getDate() <= new Date(habit.habitEndDate).getDate();

      if (isRelevantDay && isWithinDateRange) {
        acc.push(habit);
      }

      return acc;
    }, [])
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const currentDateHistoryHabits =
    historyHabits[date.toISOString().split('T')[0]] || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabitImage, setSelectedHabitImage] = useState(null);
  const [selectedHabitStatus, setSelectedHabitStatus] = useState('');

  const openModal = (habitImage, status) => {
    setSelectedHabitImage(habitImage);
    setSelectedHabitStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHabitImage(null);
    setSelectedHabitStatus('');
    setIsModalOpen(false);
  };

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    if (isModalOpen) {
      closeModal();
    }
  });

  return (
    <div className='bg-gray-700 p-3 ml-1 mr-1 rounded-b-md overflow-y-auto h-[22vh] w-1/4 custom-scrollbar'>
      {relevantHabits.map((habit) => (
        <ul
          key={habit.habitTitle}
          className='mb-1 bg-main-bg text-white p-2 m-1 rounded-lg break-words'
        >
          <p className='text-center text-xs text-dark-gray-txt'>
            {habit.startTime} ~ {habit.endTime}
          </p>
          <p className='text-center text-sm'>{habit.habitTitle}</p>
        </ul>
      ))}

      {currentDateHistoryHabits.map((habitHistory) => (
        <ul
          key={habitHistory.habitTitle}
          className={`mb-1 text-white p-2 m-1 bg-main-bg rounded-lg break-words border-2 cursor-pointer transform transition-transform hover:scale-105 hover:bg-opacity-70 ${getStatusBorderColor(
            habitHistory.status,
          )}`}
          onClick={() =>
            openModal(habitHistory.habitImage, habitHistory.status)
          }
        >
          <p className='text-center text-xs text-dark-gray-txt'>
            <span>
              {habitHistory.startTime} ~{habitHistory.endTime}
            </span>
          </p>
          <p className='text-center text-sm'>{habitHistory.habitTitle}</p>
        </ul>
      ))}

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            ref={modalRef}
            className='relative bg-main-bg rounded-lg overflow-hidden max-w-lg w-full'
          >
            <button
              className='absolute top-2 right-2 text-white rounded-full py-1 px-3 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
              onClick={closeModal}
            >
              <span className='relative top-[-2px]'>x</span>
            </button>
            <div className='p-4'>
              <p className='text-xl text-center font-bold text-white mb-4'>
                인증샷
              </p>
              <div className='text-center text-lg mb-2'>
                {getStatusMessage(selectedHabitStatus)}
              </div>
              {selectedHabitImage ? (
                <img
                  src={selectedHabitImage}
                  alt='Selected Habit'
                  className='w-full h-auto rounded-lg'
                />
              ) : (
                <p className='text-center text-gray-400 m-20'>
                  인증샷이 없습니다
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {relevantHabits.length === 0 && currentDateHistoryHabits.length === 0 ? (
        <p className='text-center text-dark-gray-txt text-sm mt-2'>
          등록된 습관이 없습니다
        </p>
      ) : null}
    </div>
  );
};

export default WeeklyHabitList;
