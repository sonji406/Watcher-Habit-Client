import api from '../../../lib/api';

const checkUserAPI = (email) => {
  return api.get(`/user/check?email=${email}`, { withCredentials: true });
};

export default checkUserAPI;
