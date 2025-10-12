import * as z from 'zod'

import { LoginDataSchema } from './schema';
export interface LoginRequestDto {
  email: string;
  password: string;
}
export type LoginDataType = z.infer<typeof LoginDataSchema>

export interface GetMeResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  role: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}
export type UseLoginOptions = {
    onSuccess?: (data: LoginResponse) => void;
    onError?: (error: unknown) => void;
};
export type UseLogoutOptions = {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
};