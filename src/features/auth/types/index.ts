export interface LoginRequestDto {
  email: string;
  password: string;
}

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
