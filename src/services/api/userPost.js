import axios from 'axios';

const userPostAPI = (userData) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user`,
    userData,
  );
};

export default userPostAPI;
