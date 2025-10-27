import { useEffect } from 'react';
import { notificationsStore } from './store';
import { eventBus } from '../events/EventBus';
import { useStore } from 'zustand';

export const useNotificationsEvents = () => {
  const showNotification = useStore(
    notificationsStore,
    (s) => s.showNotification,
  );

  useEffect(() => {
    const unsubscribe = eventBus.on('showNotification', (message: string) => {
      showNotification({
        message: message,
        duration: 3000,
        type: 'error',
      });
    });

    return () => {
      unsubscribe();
    };
  }, [showNotification]);
};
