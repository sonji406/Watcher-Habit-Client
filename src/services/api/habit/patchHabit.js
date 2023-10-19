import api from '../../../lib/api';

const patchHabitAPI = (habitId, habitData) => {
  return api.patch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
    habitData,
    { withCredentials: true },
  );
};

export default patchHabitAPI;
