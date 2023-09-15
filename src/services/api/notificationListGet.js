import axios from 'axios';

export const getNotificationList = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/notification/${userId}`,
    );
    const notifications = response.data.data;
    return notifications;
  } catch (error) {
    throw error;
  }
};
