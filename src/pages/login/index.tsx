import { useState } from 'react';
import { SplitImage, LoginRequestDto } from '@/features/auth';
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
  const { t } = useTranslation('auth');

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
      newErrors.email = t('errors.emailNotEmpty');
    }

    if (!userLogInInfo.password.trim()) {
      newErrors.password = t('passwordNotEmpty');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Submitting login form', userLogInInfo);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    login.mutate(userLogInInfo);
  };

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

            <form
              className="flex w-full flex-col gap-4 xl:px-20 2xl:px-50"
              onSubmit={handleSubmit}
            >
              <InputField
                id="email"
                label={t('email')}
                type="email"
                placeholder={t('emailPlaceholder')}
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
                label={t('password')}
                type="password"
                placeholder={t('passwordPlaceholder')}
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
                isLoading={login.isPending}
              >
                {t('login')}
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
