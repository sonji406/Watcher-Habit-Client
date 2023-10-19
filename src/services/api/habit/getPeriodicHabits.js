import api from '../../../lib/api';

const getPeriodicHabitsAPI = (userId, startDateStr, endDateStr) => {
  return api.get(
    `/habit/periodic/${userId}?startDate=${startDateStr}&endDate=${endDateStr}`,
    { withCredentials: true },
  );
};

export default getPeriodicHabitsAPI;
