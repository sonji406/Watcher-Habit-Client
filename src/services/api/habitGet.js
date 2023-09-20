import axios from 'axios';

const habitGetAPI = (habitId) => {
  return axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
  );
};

export default habitGetAPI;
