import api from '../../lib/api';

const userCheckAPI = (email) => {
  return api.get(`/user/check?email=${email}`, { withCredentials: true });
};

export default userCheckAPI;
