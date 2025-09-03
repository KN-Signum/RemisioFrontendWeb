import { API_URL } from '@/config/constants';
import { notificationsStore } from '@/stores/notifications';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const apiClient = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies.get('access_token')}`,
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    notificationsStore.getState().showNotification({
      type: 'error',
      duration: 5000,
      message,
    });

    console.error(message);

    return Promise.reject(error);
  },
);
