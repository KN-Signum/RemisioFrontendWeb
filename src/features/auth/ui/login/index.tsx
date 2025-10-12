import { SplitImage, LoginForm } from '@/features/auth';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/AuthStore';


const LoginPage = () => {
  const { t } = useTranslation('auth');
  const isAuth = useAuthStore(state => state.isAuthenticated);

  if(isAuth){
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="bg-background h-screen p-8">
      <div className="flex h-full overflow-hidden rounded-xl bg-white shadow-2xl">
        <SplitImage />

        <div className="my-10 flex w-full flex-col justify-between p-8 lg:w-1/2">
          <div className="mx-auto flex max-w-sm items-center gap-x-4">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-16 w-16 object-cover"
            />
            <div className="text-primary-accent color text-3xl font-bold">
              Remisio
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <span className="text-primary-accent mb-2 text-3xl font-bold">
              {t('welcome')}
            </span>
            <span className="text-primary-accent mb-6">{t('subtitle')}</span>

            <LoginForm />
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
