import api from '../../../lib/api';

const patchHabitAPI = (habitId, habitData) => {
  return api.patch(`/habit/${habitId}`, habitData, { withCredentials: true });
};

export default patchHabitAPI;
