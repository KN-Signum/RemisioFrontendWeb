import { apiClient } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const refreshToken = (): Promise<{
  data: { access_token: string };
}> => {
  console.log('Refreshing token...');
  return apiClient.post('/refresh_token/');
};

export const useRefreshToken = (setIsAuth: (val: boolean) => void) => {
  const { mutate: refresh, isPending: isLoading } = useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ data }) => {
      console.log('Token refreshed successfully:', data.access_token);
      cookies.set('access_token', data.access_token);
      setIsAuth(true);
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
      setIsAuth(false);
      // Handle error (e.g., show a notification)
    },
  });

  return { refresh, isLoading };
};
