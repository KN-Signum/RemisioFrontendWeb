import { AxiosResponse } from 'axios';
import { ApiClient } from '@/shared/api/ApiClient';

export function logout(): Promise<AxiosResponse<void>>{
  const api = ApiClient.getInstance();
  return api.getProtectedClient().post<void>('/logout');
};
