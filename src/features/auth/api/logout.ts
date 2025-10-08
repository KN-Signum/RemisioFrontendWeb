import { LoginResponse } from '../types';
import { ApiClient } from '@/shared/api/ApiClient';

export const logout = (): Promise<{
  data: LoginResponse;
}> => {
  const api = ApiClient.getInstance();
  return api.getProtectedClient().post('/logout');
};
