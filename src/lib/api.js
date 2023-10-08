import axios from 'axios';
import ERROR_MESSAGES from '../constants/errorMessages';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN + '/api',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.error === ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED) {
        window.location.href = '/';
        return Promise.reject(error);
      }

      if (!error.config._retry) {
        error.config._retry = true;
        try {
          const res = await api.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/refreshToken`,
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
    }
    return Promise.reject(error);
  },
);

export default api;
