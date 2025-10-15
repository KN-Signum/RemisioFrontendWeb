import * as z from 'zod'
import { createLoginDataSchema } from './schema';

export interface LoginRequestDto {
  email: string;
  password: string;
}
export type LoginDataType = z.infer<ReturnType<typeof createLoginDataSchema>>

export interface LoginResponse {
  access_token: string;
}

export type UseLoginOptions = {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
};
export type UseLogoutOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};