const getStartAndEndOfWeek = (date) => {
  console.log('Initial date:', date);

  const day = date.getDay();
  console.log('Day of the week (0 = Sunday):', day);

  const start = new Date(date);
  const end = new Date(date);

  start.setDate(date.getDate() - day);
  end.setDate(date.getDate() + 6 - day);

  console.log('Start of the week:', start);
  console.log('End of the week:', end);

  return [start, end];
};

export default getStartAndEndOfWeek;
