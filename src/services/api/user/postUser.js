import api from '../../../lib/api';

const userPostAPI = (body) => {
  return api.post('/user', body, {
    withCredentials: true,
  });
};

export default userPostAPI;
