import axios from 'axios';

const loginAPI = (payload) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
    payload,
  );
};

export default loginAPI;
