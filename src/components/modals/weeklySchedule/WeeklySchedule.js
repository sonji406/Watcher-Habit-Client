import React from 'react';
import getStartAndEndOfWeek from '../../../utils/getStartAndEndOfWeek';
import WeeklyHabitList from './WeeklyHabitList';

const getDatesOfWeek = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const WeeklySchedule = ({ weeklySchedule, modalContentRef, handleClose }) => {
  const [startOfWeek, endOfWeek] = getStartAndEndOfWeek(new Date());
  const datesOfWeek = getDatesOfWeek(startOfWeek, endOfWeek);

  const daysMapping = {
    sun: '일',
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
  };

  const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <article
      className='bg-dark-blue-bg border h-[70vh] border-customGreen relative rounded p-5 w-3/5 text-white rounded-xl overflow-hidden'
      ref={modalContentRef}
    >
      <header className='text-center font-extrabold mb-4'>주간계획표</header>
      <button
        onClick={handleClose}
        className='absolute top-3 right-5 text-2xl text-white hover:text-red-600 transition duration-200 ease-in-out'
      >
        ×
      </button>

      <section className='flex'>
        <div className='bg-green-bg p-1 ml-1 mr-1 rounded-t-md text-center w-1/4 font-semibold'>
          이번주 습관 목록
        </div>
        {datesOfWeek.slice(0, 3).map((date) => (
          <div
            key={date}
            className='bg-green-bg p-1 ml-1 mr-1 rounded-t-md text-center w-1/4 font-semibold'
          >
            {daysInKorean[date.getDay()]} ({date.getMonth() + 1}/
            {date.getDate()})
          </div>
        ))}
      </section>

      <section className='flex mb-4'>
        <div className='bg-gray-700 p-3 ml-1 mr-1 rounded-b-md overflow-y-auto h-[22vh] w-1/4 custom-scrollbar'>
          {weeklySchedule
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((habit) => (
              <div
                key={habit.habitTitle}
                className='mb-2 bg-main-bg text-white p-2 m-1 rounded-lg break-words'
              >
                <p className='text-center text-base'>{habit.habitTitle}</p>
              </div>
            ))}
        </div>

        {datesOfWeek.slice(0, 3).map((date) => (
          <WeeklyHabitList
            key={date}
            habits={weeklySchedule}
            daysMapping={daysMapping}
            daysInKorean={daysInKorean}
            date={date}
          />
        ))}
      </section>

      <section className='flex'>
        {datesOfWeek.slice(3).map((date) => (
          <div
            key={date}
            className='bg-green-bg p-1 ml-1 mr-1 rounded-t-md text-center w-1/4 font-semibold'
          >
            {daysInKorean[date.getDay()]} ({date.getMonth() + 1}/
            {date.getDate()})
          </div>
        ))}
      </section>

      <section className='flex mb-4'>
        {datesOfWeek.slice(3).map((date) => (
          <WeeklyHabitList
            key={date}
            habits={weeklySchedule}
            daysMapping={daysMapping}
            daysInKorean={daysInKorean}
            date={date}
          />
        ))}
      </section>
    </article>
  );
};

export default WeeklySchedule;
