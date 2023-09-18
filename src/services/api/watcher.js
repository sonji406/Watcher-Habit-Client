import axios from 'axios';

export const subscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/watcher`,
      {
        watcherId,
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const unsubscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/watcher/${watcherId}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
