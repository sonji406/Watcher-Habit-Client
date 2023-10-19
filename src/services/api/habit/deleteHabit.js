import api from '../../../lib/api';

const deleteHabitAPI = (habitId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
    { withCredentials: true },
  );
};

export default deleteHabitAPI;
