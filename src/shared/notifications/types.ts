export type NotificationType = 'info' | 'warning' | 'success' | 'error';
export type NotificationEntity = {
  id: string;
  type: NotificationType;
  duration?: number;
  message?: string;
};
export type NotificationObject = Omit<NotificationEntity, "id">

export type NotificationsStore = {
  notifications: NotificationEntity[];
  showNotification: (notification: NotificationObject) => void;
  dismissNotification: (id: string) => void;
};
export type NotificationToastProps = {
  notification: Omit<NotificationEntity, 'duration'>;
  onDismiss: (id: string) => void;
};
export type NotificationTypeColorDict = Record<NotificationType,string>