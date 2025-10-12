import { http, HttpResponse } from 'msw';
import { API_URL, AUTH_URL } from '@/config/constants';
import { LoginRequestDto } from '@/features/auth';

const login = http.post(`${AUTH_URL}/login`, async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestDto;

  // Simulate a successful login, backend ma zwracać sam token
  if (email === 'test@test.pl' && password === 'test') {
    return HttpResponse.json({
      access_token:
        'G9jdG9yIiwiaWQiOiI2ZDY4OTkwYWIwYjhjMzIwODZlYWI0YWFjZmM3NTNkYiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3Mzc3NDQ0ODl9.4Sp8jN02qKjsWSqO3hniXwdVnF0OObSM2I7gEZGxr24',
      });
  }

  // Simulate an error for invalid credentials
  return HttpResponse.json(
    { error: 'Invalid username or password' },
    { status: 401 },
  );
});
const refresh = http.post(`${AUTH_URL}/refresh`, async () => {
  //Zawsze zwracam jakiś token, bo refresh jest w http-only cookie i nie mam jak sprawdzić czy jest
  return HttpResponse.json({
    access_token:
      'G9jdG9yIiwiaWQiOiI2ZDY4OTkwYWIwYjhjMzIwODZlYWI0YWFjZmM3NTNkYiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3Mzc3NDQ0ODl9.4Sp8jN02qKjsWSqO3hniXwdVnF0OObSM2I7gEZGxr24',
  });

});
const logout = http.post(`${API_URL}/logout`,async () =>{
  return HttpResponse.json({
    success: true
  })
})
export const handlers = [login, refresh, logout];
