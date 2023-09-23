import React, { useState } from 'react';

const RepeatForm = ({ doDay, setDoDay }) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const daysOfWeekKR = ['일', '월', '화', '수', '목', '금', '토'];
  const [repeatValidation, setRepeatValidation] = useState('');

  const toggleDay = (day) => {
    setDoDay((prevDoDay) => {
      let newDoDay;
      if (prevDoDay.includes(day)) {
        newDoDay = prevDoDay.filter((d) => d !== day);
      } else {
        newDoDay = [...prevDoDay, day];
      }

      if (newDoDay.length === 0) {
        setRepeatValidation('반복 주기를 선택해 주세요.');
      } else {
        setRepeatValidation('');
      }

      return newDoDay;
    });
  };

  const toggleAllDays = () => {
    if (doDay.length === 7) {
      setDoDay([]);
      setRepeatValidation('반복 주기를 선택해 주세요.');
    } else {
      setDoDay(daysOfWeek);
      setRepeatValidation('');
    }
  };

  return (
    <>
      <label className='text-white ml-2'>
        반복 주기*{' '}
        {repeatValidation && (
          <span className='text-red-500 ml-2'>{repeatValidation}</span>
        )}
      </label>
      <div className='mb-6 mt-2 flex items-center justify-center'>
        <div className='bg-dark-blue-bg py-2 px-5 border-2 border-gray-500 rounded-xl shadow-lg mt-2 mr-2 flex flex-col items-center'>
          <span className='text-green-txt text-sm'>매일</span>
          <div className='flex space-x-2 mt-2'>
            <button
              type='button'
              className={`py-2 px-4 border-2 border-gray-500 hover:border-customGreen shadow-lg rounded-3xl bg-dark-blue-bg text-white ${
                doDay.length === 7 ? 'bg-green-bg' : ''
              }`}
              onClick={toggleAllDays}
            >
              매일
            </button>
          </div>
        </div>

        <div className='bg-dark-blue-bg py-2 px-7 border-2 border-gray-500 rounded-xl shadow-lg mt-2 flex flex-col items-center'>
          <span className='text-green-txt text-sm'>매주</span>
          <div className='flex space-x-2 mt-2'>
            {daysOfWeek.map((day, index) => (
              <button
                type='button'
                key={day}
                className={`py-2 px-4 border-2 border-gray-500 hover:border-customGreen shadow-lg rounded-3xl bg-dark-blue-bg text-white ${
                  doDay.includes(day) ? 'bg-green-bg' : ''
                }`}
                onClick={() => {
                  toggleDay(day);
                }}
              >
                {daysOfWeekKR[index]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepeatForm;
