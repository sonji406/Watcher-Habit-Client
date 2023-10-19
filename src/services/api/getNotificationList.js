import api from '../../lib/api';

const getNotificationListAPI = (userId) => {
  try {
    const response = api.get(`/notification/${userId}`, {
      withCredentials: true,
    });
    const notifications = response.data.data;

    return notifications;
  } catch (error) {
    throw error;
  }
};

export default getNotificationListAPI;
