import api from '../../../lib/api';

const getPeriodicHabitsAPI = (userId, startDateStr, endDateStr) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/periodic/${userId}?startDate=${startDateStr}&endDate=${endDateStr}`,
    { withCredentials: true },
  );
};

export default getPeriodicHabitsAPI;
