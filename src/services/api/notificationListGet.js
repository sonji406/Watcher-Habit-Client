import api from '../../utils/api';

export const getNotificationList = async (userId) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/notification/${userId}`,
      { withCredentials: true },
    );
    const notifications = response.data.data;
    return notifications;
  } catch (error) {
    throw error;
  }
};
