import { Outlet, Navigate} from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore';


export default function ProtectedRoutes() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
