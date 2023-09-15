import React from 'react';

const DateForm = ({
  habitStartDate,
  setHabitStartDate,
  habitEndDate,
  setHabitEndDate,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (e) => {
    setHabitStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setHabitEndDate(e.target.value);
  };

  return (
    <div>
      <label>기한</label>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <input
          className='p-2 border rounded'
          type='date'
          value={habitStartDate}
          min={today}
          onChange={handleStartDateChange}
          placeholder='Start Date'
        />
        <input
          className='p-2 border rounded'
          type='date'
          value={habitEndDate}
          min={habitStartDate}
          onChange={handleEndDateChange}
          placeholder='End Date'
        />
      </div>
    </div>
  );
};

export default DateForm;
