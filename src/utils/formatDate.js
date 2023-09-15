const formatDate = (isoString) => {
  const dateObj = new Date(isoString);
  const date = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  const time = `${String(dateObj.getHours()).padStart(2, '0')}:${String(
    dateObj.getMinutes(),
  ).padStart(2, '0')}`;
  return { date, time };
};

export default formatDate;
