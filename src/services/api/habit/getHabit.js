import api from '../../../lib/api';

const getHabitAPI = (habitId) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
    { withCredentials: true },
  );
};

export default getHabitAPI;
