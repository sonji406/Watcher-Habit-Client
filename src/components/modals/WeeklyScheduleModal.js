import React, { useState, useEffect, useRef } from 'react';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { useClickOutside } from '../../hooks/useClickOutside';
import axios from 'axios';

const getStartAndEndOfWeek = (date) => {
  const day = date.getDay();
  const start = new Date(date);
  const end = new Date(start);

  start.setDate(date.getDate() - day);
  end.setDate(start.getDate() + 6);

  return [start, end];
};

const WeeklyScheduleModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState([]);

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      setIsLoading(true);

      try {
        const userId = getUserIdFromToken();

        const [startDate, endDate] = getStartAndEndOfWeek(new Date());

        const habitsResponse = await axios.get(
          `${
            process.env.REACT_APP_SERVER_DOMAIN
          }/api/habit/periodic/${userId}?startDate=${
            startDate.toISOString().split('T')[0]
          }&endDate=${endDate.toISOString().split('T')[0]}`,
        );

        setWeeklySchedule(habitsResponse.data);
      } catch (error) {
        console.error('Failed to fetch weekly schedule', error);
      }

      setIsLoading(false);
    };

    fetchWeeklySchedule();
  }, []);

  const modalContentRef = useRef();

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useClickOutside(modalContentRef, handleClose);

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
    <div className='fixed inset-0 w-full flex items-center justify-center z-40 bg-black bg-opacity-50'>
      {isLoading ? (
        <section className='items-center justify-center'>
          <div className='ml-4 text-white'>주간 계획표를 불러오는 중</div>
          <div className='w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin'></div>
        </section>
      ) : (
        <article
          className='bg-dark-blue-bg border h-[70vh] border-customGreen relative rounded p-5 w-3/5 text-white rounded-xl overflow-hidden'
          ref={modalContentRef}
        >
          <h1 className='text-center font-extrabold mb-4'>주간계획표</h1>

          <button
            onClick={handleClose}
            className='absolute top-3 right-5 text-2xl text-white hover:text-red-600 transition duration-200 ease-in-out'
          >
            ×
          </button>

          <nav className='grid grid-cols-7 gap-2 '>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                className='bg-green-bg p-1 h-8 rounded-t-md text-center font-semibold'
                key={day}
              >
                {day}
              </div>
            ))}
          </nav>

          <main className='grid grid-cols-7 gap-2 h-[50vh] overflow-y-auto custom-scrollbar'>
            {daysInKorean.map((day, dayIdx) => (
              <div
                className='bg-gray-700 p-3 rounded-b-md overflow-y-auto h-full custom-scrollbar'
                key={dayIdx}
              >
                <ul>
                  {weeklySchedule
                    .filter((habit) =>
                      habit.doDay.includes(
                        Object.keys(daysMapping).find(
                          (key) => daysMapping[key] === day,
                        ),
                      ),
                    )
                    .map((habit, idx) => (
                      <li key={idx} className='mb-2'>
                        <div className='bg-main-bg text-white p-2 m-1 rounded-lg hover:bg-dark-green-bg transform hover:scale-95 transition duration-200 ease-in-out'>
                          <button className='w-full'>
                            <p className='text-xs text-left'>
                              {habit.startTime} ~ {habit.endTime}
                            </p>
                            <p className='text-xl'>{habit.habitTitle}</p>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </main>
        </article>
      )}
    </div>
  );
};

export default WeeklyScheduleModal;
