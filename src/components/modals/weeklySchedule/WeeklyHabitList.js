import React from 'react';

const WeeklyHabitList = ({ habits, daysMapping, daysInKorean, date }) => {
  const relevantHabits = habits
    .reduce((acc, habit) => {
      const dayInKorean = daysInKorean[date.getDay()];
      const isRelevantDay = habit.doDay.includes(
        Object.keys(daysMapping).find(
          (key) => daysMapping[key] === dayInKorean,
        ),
      );

      const isWithinDateRange =
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

  return (
    <div className='bg-gray-700 p-3 ml-1 mr-1 rounded-b-md overflow-y-auto h-[22vh] w-1/4 custom-scrollbar'>
      {relevantHabits.length > 0 ? (
        relevantHabits.map((habit) => (
          <ul
            key={habit.habitTitle}
            className='mb-2 bg-main-bg text-white p-2 m-1 rounded-lg break-words'
          >
            <p className='text-center text-xs'>
              {habit.startTime} ~ {habit.endTime}
            </p>
            <p className='text-center text-base'>{habit.habitTitle}</p>
          </ul>
        ))
      ) : (
        <p className='text-center text-dark-gray-txt text-sm mt-2'>
          등록된 습관이 없습니다
        </p>
      )}
    </div>
  );
};

export default WeeklyHabitList;
