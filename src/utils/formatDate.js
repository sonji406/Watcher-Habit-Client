const formatDate = (isoString) => {
  const dateObj = new Date(isoString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;

  const hour = String(dateObj.getHours()).padStart(2, '0');
  const minute = String(dateObj.getMinutes()).padStart(2, '0');

  const time = `${hour}:${minute}`;

  return { date, time };
};

export default formatDate;
