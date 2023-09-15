import React from 'react';

const RepeatForm = ({ doDay, setDoDay }) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div>
      <label>반복 주기</label>
      <div className='mb-4 flex justify-between'>
        <button
          className={`py-2 px-4 border rounded ${
            doDay.length === 7 ? 'bg-green-bg' : ''
          }`}
          onClick={() => {
            if (doDay.length === 7) {
              setDoDay([]);
            } else {
              setDoDay(daysOfWeek);
            }
          }}
        >
          매일
        </button>

        <span>매주</span>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`py-2 px-4 border rounded ${
              doDay.includes(day) ? 'bg-green-bg' : ''
            }`}
            onClick={() => {
              setDoDay((prevDoDay) => {
                if (prevDoDay.includes(day)) {
                  return prevDoDay.filter((d) => d !== day);
                } else {
                  return [...prevDoDay, day];
                }
              });
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
