import { AUTH_URL } from '@/config/constants';
import { notificationsStore } from '@/stores/notifications';
import Axios from 'axios';

export const authClient = Axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.error || error.message;

    notificationsStore.getState().showNotification({
      type: 'error',
      duration: 5000,
      message,
    });

    console.error(message);

    return Promise.reject(error);
  },
);
