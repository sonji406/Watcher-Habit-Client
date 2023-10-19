import api from '../../../lib/api';

const postHabitImageAPI = (habitId, formData) => {
  return api.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/image`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    },
  );
};

export default postHabitImageAPI;
