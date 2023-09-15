import React from 'react';

const TimeForm = ({
  startTime,
  setStartTime,
  timePeriod,
  setTimePeriod,
  duration,
  setDuration,
}) => {
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    const newMinute = startTime.split(':')[1];
    setStartTime(`${newHour}:${newMinute}`);
  };

  const handleMinuteChange = (e) => {
    const newHour = startTime.split(':')[0];
    const newMinute = e.target.value;
    setStartTime(`${newHour}:${newMinute}`);
  };

  const handleDurationHourChange = (e) => {
    setDuration(e.target.value * 60);
  };

  const handleDurationMinuteChange = (e) => {
    setDuration(Math.floor(duration / 60) * 60 + Number(e.target.value));
  };

  const hourOptions =
    timePeriod === 'AM'
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 12 }, (_, i) => i + 1);

  const durationOptions = Array.from({ length: 13 }, (_, i) => i);
  const minuteOptions = ['00', '15', '30', '45'];

  return (
    <div>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <div className='flex items-center space-x-2'>
          <span>시작시간 </span>
          <select
            className='p-2 border rounded'
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          <select
            className='p-2 border rounded'
            value={startTime.split(':')[0]}
            onChange={handleHourChange}
          >
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span>시</span>

          <select
            className='p-2 border rounded'
            value={startTime.split(':')[1]}
            onChange={handleMinuteChange}
          >
            {minuteOptions.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span>분 부터</span>
        </div>

        <div className='flex space-x-2'>
          <select
            className='p-2 border rounded'
            value={Math.floor(duration / 60)}
            onChange={handleDurationHourChange}
          >
            {durationOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <span>시간</span>

          <select
            className='p-2 border rounded'
            value={duration % 60}
            onChange={handleDurationMinuteChange}
          >
            {minuteOptions.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span>분 동안</span>
        </div>
      </div>
    </div>
  );
};

export default TimeForm;
