import api from '../../../lib/api';

const postGroupAPI = (body) => {
  return api.post('/group', body, {
    withCredentials: true,
  });
};

export default postGroupAPI;
