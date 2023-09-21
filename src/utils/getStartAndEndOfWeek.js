const getStartAndEndOfWeek = (date) => {
  const day = date.getDay();
  const start = new Date(date);
  const end = new Date(start);

  start.setDate(date.getDate() - day);
  end.setDate(start.getDate() + 6);

  return [start, end];
};

export default getStartAndEndOfWeek;
