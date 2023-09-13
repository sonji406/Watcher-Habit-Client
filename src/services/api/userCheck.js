import axios from 'axios';

const userCheckAPI = (email) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/check?email=${email}`,
  );
};

export default userCheckAPI;
