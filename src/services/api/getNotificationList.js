import api from '../../lib/api';

const getNotificationList = (userId) => {
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

export default getNotificationList;
