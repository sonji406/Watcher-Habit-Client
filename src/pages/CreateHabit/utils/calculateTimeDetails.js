const calculateTimeDetails = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const timePeriod = startHour < 12 ? 'AM' : 'PM';

  const hour = startHour % 12 === 0 ? 12 : startHour % 12;

  const minute = startMinute;

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  let duration = endTotalMinutes - startTotalMinutes;

  return {
    timePeriod,
    hour,
    minute,
    duration,
  };
};

export default calculateTimeDetails;
