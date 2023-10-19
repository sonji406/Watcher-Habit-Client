import api from '../../../lib/api';

const postHabitAPI = (habitData) => {
  return api.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit`,
    habitData,
    { withCredentials: true },
  );
};

export default postHabitAPI;
