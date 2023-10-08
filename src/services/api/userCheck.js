import api from '../../utils/api';

const userCheckAPI = (email) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/check?email=${email}`,
    { withCredentials: true },
  );
};

export default userCheckAPI;
