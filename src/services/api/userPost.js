import api from '../../lib/api';

const userPostAPI = (userData) => {
  return api.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user`, userData, {
    withCredentials: true,
  });
};

export default userPostAPI;
