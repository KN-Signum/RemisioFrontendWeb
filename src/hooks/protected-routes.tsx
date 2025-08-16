import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useRefreshToken } from '@/features/auth/api/refresh-token';
import { API_MOCKING } from '@/config/constants';

interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export default function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const { refresh, isLoading } = useRefreshToken(() => setIsAuth(true));

  useEffect(() => {
    if (API_MOCKING) {
      setIsAuth(true);
      setAuthChecked(true);
      return;
    }

    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token');

    if (accessToken && !isTokenExpired(accessToken)) {
      setIsAuth(true);
      setAuthChecked(true);
      return;
    }

    if (refreshToken) {
      (async () => {
        try {
          await refresh();
        } finally {
          setAuthChecked(true);
        }
      })();
    } else {
      setIsAuth(false);
      setAuthChecked(true);
    }
  }, [refresh]);

  if (isLoading || !authChecked) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
