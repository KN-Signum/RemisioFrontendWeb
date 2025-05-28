import {
  Notification,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import { createPortal } from 'react-dom';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  if (notifications.length < 1) return null;

  return createPortal(
    <div className="fixed top-12 left-1/2 z-9999 -translate-x-1/2 transform p-4">
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

type NotificationToastProps = {
  notification: Omit<Notification, 'duration'>;
  onDismiss: (id: string) => void;
};

const NotificationToast = ({
  notification,
  onDismiss,
}: NotificationToastProps) => {
  const { id, type, title, message } = notification;

  // Define colors based on notification type
  const typeColors: Record<NotificationType, string> = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div
      className={`w-full rounded-lg border-l-4 shadow-md sm:w-80 ${typeColors[type]}`}
    >
      <div className="flex justify-between p-4">
        <div>
          <p className="text-sm font-medium">{title}</p>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
