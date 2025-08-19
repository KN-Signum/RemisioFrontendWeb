import { useMutation } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { LoginRequestDto, LoginResponse } from '../types';
import { authClient } from '@/lib/auth-client';

const cookies = new Cookies();

export const login = (
  creditentials: LoginRequestDto,
): Promise<{
  data: LoginResponse;
}> => {
  return authClient.post('/login', creditentials);
};

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
};

export const useLogin = ({ onSuccess }: UseLoginOptions = {}) =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      cookies.set('access_token', data.access_token);
      cookies.set('refresh_token', data.refresh_token);
      onSuccess?.(data);
    },
  });
