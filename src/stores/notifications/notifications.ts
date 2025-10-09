import { v4 as uuidv4 } from 'uuid';
import { createStore, useStore } from 'zustand';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  duration?: number;
  message?: string;
};

export type NotificationsStore = {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
};

export const notificationsStore = createStore<NotificationsStore>(
  (set, get) => ({
    notifications: [],
    showNotification: (notification) => {
      const id = uuidv4();
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

export const useNotifications = () => useStore(notificationsStore);
