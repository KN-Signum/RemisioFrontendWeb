import { useState } from 'react';
import { Logo, SplitImage, LoginRequestDto } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputField } from '@/components/ui/input-field';
import { useLogin } from '@/features/auth/api/login';
import { Button } from '@/components/ui/button';

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

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!userLogInInfo.email.trim()) {
      newErrors.email = t('login.email_not_empty');
    }

    if (!userLogInInfo.password.trim()) {
      newErrors.password = t('login.password_not_empty');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Submitting login form', userLogInInfo);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
                error={errors.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setuserLogInInfo({
                    ...userLogInInfo,
                    email: e.target.value,
                  });
                  clearError('email');
                }}
              />

              <InputField
                id="password"
                label={t('login.password')}
                type="password"
                placeholder={t('login.password_placeholder')}
                value={userLogInInfo.password}
                error={errors.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setuserLogInInfo({
                    ...userLogInInfo,
                    password: e.target.value,
                  });
                  clearError('password');
                }}
              />

              <Button
                className="font-bold"
                type="submit"
                isLoading={login.isLoading}
              >
                {t('login.login')}
              </Button>
            </form>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
