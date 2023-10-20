import api from '../../../lib/api';

const postHabitAPI = (body) => {
  return api.post('/habit', body, { withCredentials: true });
};

export default postHabitAPI;
