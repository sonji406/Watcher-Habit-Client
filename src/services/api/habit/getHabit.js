import api from '../../../lib/api';

const getHabitAPI = (habitId) => {
  return api.get(`/habit/${habitId}`, { withCredentials: true });
};

export default getHabitAPI;
