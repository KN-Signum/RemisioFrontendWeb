import React, { useState } from 'react';
import { InputField } from '@/components/ui/input-field';
import { useTranslation } from 'react-i18next';
import { Loading } from '@/components/ui/loading';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginDataType } from '../../types/types';
import { LoginDataSchema } from '../../types/schema';

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginDataType>({email:'',password:''})

  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/dashboard');
  };

  const { mutate: login, isPending: isLoading, isError: error} = useAuthMutations().useLogin({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = LoginDataSchema.safeParse(loginData)
    if (!result.success){
      console.log(result.error)  
      return;
    }
    console.log(loginData)
    login(loginData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-2/3 flex flex-col gap-5">
      {error && <p className="text-red-500">{error}</p>}

      <InputField
        id="email"
        label={t('email')}
        type="email"
        value={loginData.email}
        onChange={(e) => setLoginData({...loginData , email: e.target.value})}
      />

      <InputField
        id="password"
        label={t('password')}
        type="password"
        value={loginData.password}
        onChange={(e) =>setLoginData({...loginData, password: e.target.value})}
      />

      <Button
        type="submit"
        className="w-full rounded bg-secondary opacity-90 py-2 text-white hover:opacity-100"
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : t('login')}
      </Button>
    </form>
  );
};
