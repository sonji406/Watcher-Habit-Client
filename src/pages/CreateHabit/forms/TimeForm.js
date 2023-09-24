import React, { useState } from 'react';
import validationMessages from './message/validationMessages';

const TimeForm = ({
  startTime,
  setStartTime,
  timePeriod,
  setTimePeriod,
  duration,
  setDuration,
}) => {
  const [timeValidation, setTimeValidation] = useState('');
  const [durationValidation, setDurationValidation] = useState('');

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
    if (e.target.value) {
      setTimeValidation('');
    } else {
      setTimeValidation(validationMessages.timeEmpty);
    }
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    const newMinute = startTime.split(':')[1];
    setStartTime(`${newHour}:${newMinute}`);
    setTimeValidation('');
  };

  const handleMinuteChange = (e) => {
    const newHour = startTime.split(':')[0];
    const newMinute = e.target.value;
    setStartTime(`${newHour}:${newMinute}`);
    setTimeValidation('');
  };

  const handleDurationHourChange = (e) => {
    const newDuration = e.target.value * 60 + (duration % 60);
    setDuration(newDuration);

    if (newDuration > 0) {
      setDurationValidation('');
    } else {
      setDurationValidation(validationMessages.durationEmpty);
    }
  };

  const handleDurationMinuteChange = (e) => {
    const newDuration = Math.floor(duration / 60) * 60 + Number(e.target.value);
    setDuration(newDuration);

    if (newDuration > 0) {
      setDurationValidation('');
    } else {
      setDurationValidation(validationMessages.durationEmpty);
    }
  };

  const hourOptions =
    timePeriod === 'AM'
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 12 }, (_, i) => i + 1);

  const durationOptions = Array.from({ length: 13 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, '0'),
  );

  return (
    <>
      <label className='text-white ml-2'>
        시간*<span className='text-red-500 ml-2'>{timeValidation}</span>
        <span className='text-red-500 ml-2'>{durationValidation}</span>
      </label>
      <div className='mb-6 mt-2 grid grid-cols-2 gap-0 items-center justify-center'>
        <div className='flex items-center space-x-2 ml-8 mb-6'>
          <select
            className='p-2 border-2 border-gray-500 rounded bg-dark-blue-bg text-white shadow-lg mx-2'
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          <select
            className='p-2 border-2 border-gray-500 rounded bg-dark-blue-bg text-white shadow-lg'
            value={startTime.split(':')[0]}
            onChange={handleHourChange}
          >
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span className='text-white'>시</span>
          <select
            className='p-2 border-2 border-gray-500 rounded bg-dark-blue-bg text-white shadow-lg'
            value={startTime.split(':')[1]}
            onChange={handleMinuteChange}
          >
            {minuteOptions.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span className='text-white'>분 부터</span>
        </div>

        <div className='flex items-center space-x-2 mb-6 ml-2'>
          <select
            className='p-2 border-2 border-gray-500 rounded bg-dark-blue-bg text-white shadow-lg'
            value={Math.floor(duration / 60)}
            onChange={handleDurationHourChange}
          >
            {durationOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span className='text-white'>시간</span>

          <select
            className='p-2 border-2 border-gray-500 rounded bg-dark-blue-bg text-white shadow-lg'
            onChange={handleDurationMinuteChange}
          >
            {minuteOptions.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span className='text-white'>분 동안 진행하기</span>
        </div>
      </div>
    </>
  );
};

export default TimeForm;
