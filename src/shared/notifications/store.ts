import { v4 as uuidv4 } from 'uuid';
import { createStore, useStore } from 'zustand';
import { NotificationsStore } from './types';

const MAX_NOTIFICATIONS = 2;

export const notificationsStore = createStore<NotificationsStore>(
  (set, get) => ({
    notifications: [],
    showNotification: (notification) => {
      const id = uuidv4();
      if (get().notifications.length >= MAX_NOTIFICATIONS) return;
      set((state) => ({
        notifications: [...state.notifications, { id, ...notification }],
      }));
      if (notification.duration) {
        setTimeout(() => {
          get().dismissNotification(id);
        }, notification.duration);
      }
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  }),
);

export const useNotificationsStore = () => useStore(notificationsStore);
