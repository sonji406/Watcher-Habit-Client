import React, { useState, useRef } from 'react';
import { DAYS_IN_KOREAN, DAYS_MAPPING } from '../../../constants/daysConstants';
import { useClickOutside } from '../../../hooks/useClickOutside';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

const WeeklyHabitList = ({ habits, historyHabits, date }) => {
  const isAfterYesterday = date > yesterday;

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'approvalSuccess':
        return 'bg-green-500';
      case 'expiredFailure':
        return 'bg-red-500';
      case 'approvalFailure':
        return 'bg-orange-500';
      default:
        return 'bg-main-bg';
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

  const openModal = (habitImage) => {
    setSelectedHabitImage(habitImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHabitImage(null);
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
          className={`mb-1 ${getStatusBackgroundColor(
            habitHistory.status,
          )} text-white p-2 m-1 rounded-lg break-words cursor-pointer`}
          onClick={() => openModal(habitHistory.habitImage)}
        >
          <p className='text-center text-xs text-dark-gray-txt'>
            {habitHistory.startTime} ~ {habitHistory.endTime}
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
              x
            </button>
            <div className='p-4'>
              <p className='text-xl text-center font-bold text-white mb-4'>
                인증샷
              </p>
              {selectedHabitImage ? (
                <img
                  src={selectedHabitImage}
                  alt='Selected Habit'
                  className='w-full h-auto rounded-lg'
                />
              ) : (
                <p className='text-center text-gray-400'>인증샷이 없습니다</p>
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
