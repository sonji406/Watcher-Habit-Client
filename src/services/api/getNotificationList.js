import api from '../../lib/api';

const getNotificationList = async (userId) => {
  try {
    const response = await api.get(`/notification/${userId}`, {
      withCredentials: true,
    });
    const notifications = response.data.data;

    return notifications;
  } catch (error) {
    throw error;
  }
};

export default getNotificationList;
