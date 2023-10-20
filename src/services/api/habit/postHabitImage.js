import api from '../../../lib/api';

const postHabitImageAPI = (habitId, body) => {
  return api.post(`/habit/${habitId}/image`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export default postHabitImageAPI;
