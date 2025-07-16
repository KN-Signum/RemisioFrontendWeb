import { http, HttpResponse } from 'msw';
import { AUTH_URL } from '@/config/constants';
import { LoginRequestDto } from '@/features/auth';

const login = http.post(`${AUTH_URL}/login`, async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestDto;

  // Simulate a successful login
  if (email === 'test@test' && password === 'test') {
    return HttpResponse.json({
      id: '6d68990ab0b8c32086eab4aacfc753db',
      email: 'johnoe@eample.com',
      role: 'doctor',
      access_token:
        'G9jdG9yIiwiaWQiOiI2ZDY4OTkwYWIwYjhjMzIwODZlYWI0YWFjZmM3NTNkYiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3Mzc3NDQ0ODl9.4Sp8jN02qKjsWSqO3hniXwdVnF0OObSM2I7gEZGxr24',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZG9jdG9yIiwiaWQiOiI2ZDY4OTkwYWIwYjhjMzIwODZlYWI0YWFjZmM3NTNkYiIsInR5cGUiOiJyZWZyZXNoIiwiZXhwIjoxNzM3ODI5MDg5fQ.STA9XF5zN3Bes5EksT80quA94S5iVQVCrwmq-pFOlmI',
    });
  }

  // Simulate an error for invalid credentials
  return HttpResponse.json(
    { error: 'Invalid username or password' },
    { status: 401 },
  );
});

export const handlers = [login];
