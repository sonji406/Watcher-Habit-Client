import api from '../../../../lib/api';

const subscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await api.patch(
      `/habit/${habitId}/watcher`,
      {
        watcherId,
      },
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    console.error('subscribeWatcher error:', error);
  }
};

const unsubscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await api.delete(`/habit/${habitId}/watcher/${watcherId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error('subscribeWatcher error:', error);
  }
};

const watcherAPI = {
  subscribeWatcher,
  unsubscribeWatcher,
};

export default watcherAPI;
