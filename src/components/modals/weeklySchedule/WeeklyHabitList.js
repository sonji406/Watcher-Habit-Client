import React, { useState } from 'react';
import getStatusBorderColor from './utils/getStatusBorderColor';
import formatDate from './utils/formatDate';
import HabitImageModal from './HabitImageModal';
import { DAYS_IN_KOREAN, DAYS_MAPPING } from '../../../constants/daysConstants';

const WeeklyHabitList = ({ habits, historyHabits, date }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate = formatDate(date);
  const formattedToday = formatDate(today);

  let relevantHabits = [];
  if (formattedDate >= formattedToday) {
    relevantHabits = habits.reduce((acc, habit) => {
      const dayInKorean = DAYS_IN_KOREAN[date.getDay()];
      const isRelevantDay = habit.doDay.includes(
        Object.keys(DAYS_MAPPING).find(
          (key) => DAYS_MAPPING[key] === dayInKorean,
        ),
      );

      const habitStartDate = formatDate(new Date(habit.habitStartDate));
      const habitEndDate = formatDate(new Date(habit.habitEndDate));

      if (
        isRelevantDay &&
        formattedDate >= habitStartDate &&
        formattedDate <= habitEndDate
      ) {
        acc.push(habit);
      }

      return acc;
    }, []);
  }

  const currentDateHistoryHabits = historyHabits[formattedDate] || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabitImage, setSelectedHabitImage] = useState(null);
  const [selectedHabitStatus, setSelectedHabitStatus] = useState('');

  return (
    <div className='bg-gray-700 p-3 ml-1 mr-1 rounded-b-md overflow-y-auto h-[25vh] w-1/4 custom-scrollbar'>
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
          className={`relative mb-1 text-white p-2 m-1 bg-main-bg rounded-lg break-words border-2 cursor-pointer transform transition-transform hover:scale-105 hover:bg-opacity-70 ${getStatusBorderColor(
            habitHistory.status,
          )}`}
          onClick={() => {
            setSelectedHabitImage(habitHistory.habitImage);
            setSelectedHabitStatus(habitHistory.status);
            setIsModalOpen(true);
          }}
        >
          <p className='text-center text-xs text-dark-gray-txt'>
            <span>
              {habitHistory.startTime} ~ {habitHistory.endTime}
            </span>
          </p>
          <p className='text-center text-sm'>{habitHistory.habitTitle}</p>
        </ul>
      ))}

      <HabitImageModal
        isOpen={isModalOpen}
        image={selectedHabitImage}
        status={selectedHabitStatus}
        onClose={() => setIsModalOpen(false)}
      />

      {relevantHabits.length === 0 && currentDateHistoryHabits.length === 0 ? (
        <p className='text-center text-dark-gray-txt text-sm mt-2'>
          등록된 습관이 없습니다
        </p>
      ) : null}
    </div>
  );
};

export default WeeklyHabitList;
