import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { NotificationTypeColorDict, NotificationToastProps } from './types';
import { notificationsStore } from './store';
import { useCallback } from 'react';
import { useStore } from 'zustand';

const BORDER_COLORS: NotificationTypeColorDict = {
  info: 'border-l-blue-500',
  success: 'border-l-green-500',
  warning: 'border-l-yellow-500',
  error: 'border-l-red-500',
} as const;
const TEXT_COLORS: NotificationTypeColorDict = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
} as const;

export const Notifications = () => {
  const notifications = useStore(notificationsStore, s => s.notifications)
  const dismissNotification = useStore(notificationsStore, s => s.dismissNotification)

  if (notifications.length < 1) return null;

  return createPortal(
    <div className="fixed top-12 left-1/2 z-50 -translate-x-1/2 p-4">
      <div className="flex flex-col-reverse gap-4">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </div>,
    document.body,
  );
};

const NotificationToast = ({
  notification,
  onDismiss,
}: NotificationToastProps) => {
  const { t } = useTranslation('notifications');
  const { id, type, message } = notification;

  const handleDismiss = useCallback(() => { onDismiss(id) }, [id, onDismiss])

  return (
    <div
      className={`w-full bg-white rounded-lg border-l-4 shadow-md sm:w-80 ${BORDER_COLORS[type]}`}
    >
      <div className="flex justify-between p-4">
        <div>
          <p className={`text-sm font-medium ${TEXT_COLORS[type]}`}>{t(type)}</p>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
