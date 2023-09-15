import React from 'react';

const RepeatForm = ({ doDay, setDoDay }) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const toggleDay = (day) => {
    setDoDay((prevDoDay) => {
      if (prevDoDay.includes(day)) {
        return prevDoDay.filter((d) => d !== day);
      } else {
        return [...prevDoDay, day];
      }
    });
  };

  const toggleAllDays = () => {
    if (doDay.length === 7) {
      setDoDay([]);
    } else {
      setDoDay(daysOfWeek);
    }
  };

  return (
    <div>
      <label>반복 주기</label>
      <div className='mb-4 flex justify-between'>
        <button
          type='button'
          className={`py-2 px-4 border rounded ${
            doDay.length === 7 ? 'bg-green-bg' : ''
          }`}
          onClick={toggleAllDays}
        >
          매일
        </button>

        <span>매주</span>
        {daysOfWeek.map((day) => (
          <button
            type='button'
            key={day}
            className={`py-2 px-4 border rounded ${
              doDay.includes(day) ? 'bg-green-bg' : ''
            }`}
            onClick={() => {
              toggleDay(day);
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepeatForm;
