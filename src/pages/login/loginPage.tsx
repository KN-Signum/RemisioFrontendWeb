import { useState } from 'react';
import { Logo, SplitImage, LoginRequestDto } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputField } from '@/components/ui/input-field';
import { useLogin } from '@/features/auth/api/login';

const initialValue: LoginRequestDto = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSuccess = () => {
    console.log('Login successful');
    navigate('/dashboard');
  };

  const login = useLogin({ onSuccess });

  const [userLogInInfo, setuserLogInInfo] =
    useState<LoginRequestDto>(initialValue);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    console.log('Submitting login form', userLogInInfo);
    e.preventDefault();
    try {
      login.submit(userLogInInfo);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="bg-background h-screen p-8">
      <div className="flex h-full overflow-hidden rounded-xl bg-white shadow-2xl">
        <SplitImage />

        <div className="my-10 flex w-full flex-col justify-between p-8 lg:w-1/2">
          <Logo />
          <div className="flex w-full flex-col items-center justify-center">
            <span className="text-primary-accent mb-2 text-3xl font-bold">
              {t('login.welcome')}
            </span>
            <span className="text-primary-accent mb-6 text-gray-500">
              {t('login.subtitle')}
            </span>

            <form
              className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50"
              onSubmit={handleSubmit}
            >
              <InputField
                id="email"
                label={t('login.email')}
                type="email"
                placeholder={t('login.email_placeholder')}
                value={userLogInInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setuserLogInInfo({
                    ...userLogInInfo,
                    email: e.target.value,
                  })
                }
              />

              <InputField
                id="password"
                label={t('login.password')}
                type="password"
                placeholder={t('login.password_placeholder')}
                value={userLogInInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setuserLogInInfo({
                    ...userLogInInfo,
                    password: e.target.value,
                  })
                }
              />
              {login.isLoading ? (
                <div className="bg-secondary-accent flex h-8 w-full items-center justify-center gap-2 rounded-sm">
                  <div
                    className="bg-secondary size-2 animate-bounce rounded-full"
                    style={{ animationDelay: '0s' }}
                  ></div>
                  <div
                    className="bg-secondary size-2 animate-bounce rounded-full"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="bg-secondary size-2 animate-bounce rounded-full"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              ) : (
                <button
                  className="hover:opacity-80"
                  type="submit"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    borderRadius: 'calc(var(--radius) - 4px)',
                    padding: '0.3rem 0rem',
                  }}
                >
                  <span className="text-foreground font-bold">
                    {t('login.login')}
                  </span>
                </button>
              )}
            </form>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
