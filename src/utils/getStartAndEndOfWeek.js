const getStartAndEndOfWeek = (date) => {
  const day = date.getDay();

  const start = new Date(date);
  const end = new Date(date);

  start.setDate(date.getDate() - day);
  end.setDate(date.getDate() + 6 - day);

  return [start, end];
};

export default getStartAndEndOfWeek;
