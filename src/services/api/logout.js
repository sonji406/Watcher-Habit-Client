import axios from 'axios';

const logoutAPI = () => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default logoutAPI;
