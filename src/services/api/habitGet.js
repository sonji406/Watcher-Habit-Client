import api from '../../lib/api';

const habitGetAPI = (habitId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
    { withCredentials: true },
  );
};

export default habitGetAPI;
