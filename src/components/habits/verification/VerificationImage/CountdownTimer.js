import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }) => {
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();

      const endDateTime = new Date(
        `${now.getFullYear()}-${
          now.getMonth() + 1
        }-${now.getDate()} ${endTime}:00`,
      );

      const differenceInSeconds = (endDateTime - now) / 1000;

      if (differenceInSeconds <= 0 && differenceInSeconds > -1800) {
        setSecondsLeft(Math.round(1800 + differenceInSeconds));
      } else {
        setSecondsLeft(null);
      }
    };

    const intervalId = setInterval(checkTime, 1000);
    return () => clearInterval(intervalId);
  }, [endTime]);

  if (secondsLeft === null) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className='text-customDarkGray'>
      제한 시간 : {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default CountdownTimer;
