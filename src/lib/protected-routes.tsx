import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useRefreshToken } from '@/features/auth/api/refresh-token';
import { API_MOCKING } from '@/config/constants';

interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    console.log('Decoded token:', decoded.exp);
    console.log('Current time:', currentTime);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const { refresh, isLoading } = useRefreshToken(setIsAuth);

  if (API_MOCKING) {
    return <Outlet />;
  }

  const cookies = new Cookies();
  const accessToken = cookies.get('access_token');
  const refreshTokenCookie = cookies.get('refresh_token');

  if (accessToken && !isTokenExpired(accessToken)) {
    console.log('Valid access token detected.');
    setIsAuth(true);
  } else if (refreshTokenCookie) {
    console.log('No valid access token; attempting refresh.');
    refresh();
  } else {
    console.log('No tokens available. Setting isAuth false.');
    setIsAuth(false);
  }
  setIsCheckingAuth(false);

  // Log auth state on every render.
  console.log('isAuth state:', isAuth);

  if (isLoading || isCheckingAuth) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
