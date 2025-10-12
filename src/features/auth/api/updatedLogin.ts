import { LoginRequestDto, LoginResponse } from '../types/types';
import { ApiClient } from '@/shared/api/ApiClient';

export const login = (
  creditentials: LoginRequestDto,
): Promise<{
  data: LoginResponse;
}> => {
  const api = ApiClient.getInstance();
  return api.getProtectedClient().post('/login', creditentials);
};


