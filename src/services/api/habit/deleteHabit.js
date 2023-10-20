import api from '../../../lib/api';

const deleteHabitAPI = (habitId) => {
  return api.delete(`/habit/${habitId}`, { withCredentials: true });
};

export default deleteHabitAPI;
