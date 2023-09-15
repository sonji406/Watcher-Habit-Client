export const convertTimeToMinutes = (time, period) => {
  const timeParts = time.split(':');
  let minutes = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);

  if (period === 'PM' && parseInt(timeParts[0], 10) !== 12) {
    minutes += 12 * 60;
  }

  if (period === 'AM' && parseInt(timeParts[0], 10) === 12) {
    minutes -= 12 * 60;
  }

  return minutes;
};

export const formatTimeFromMinutes = (minutes) => {
  return `${Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;
};
