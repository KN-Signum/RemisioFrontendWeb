import { eventBus } from '@/shared/events/EventBus';
import { useAuthStore } from '../store/AuthStore';
import { useEffect } from 'react';

export const useAuthEvents = () => {
  const setAuth = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const onSuccessUnsubscribe = eventBus.on('refreshTokenSuccess', () => {
      setAuth(true);
    });
    const onFailureUnsubscribe = eventBus.on('refreshTokenFailure', () => {
      setAuth(false);
    });
    return () => {
      onSuccessUnsubscribe();
      onFailureUnsubscribe();
    };
  }, [setAuth]);
};
