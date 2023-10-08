import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN + '/api',
});

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;

      try {
        const res = await api.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;

        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
