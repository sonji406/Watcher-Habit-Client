import api from '../../../lib/api';

const postUserAPI = (body) => {
  return api.post('/user', body, {
    withCredentials: true,
  });
};

export default postUserAPI;
