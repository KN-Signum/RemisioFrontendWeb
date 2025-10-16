import React, { useState } from 'react';
import { InputField } from '@/components/ui/input-field';
import { useTranslation } from 'react-i18next';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginDataType } from '../../types/types';
import { createLoginDataSchema } from '../../types/schema';
import { MyLogger } from '@/shared/logger/Logger';

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginDataType>({email:'',password:''})
  const [errorMessage, setErrorMessage] = useState("")
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const schema = createLoginDataSchema(t('errors.emailHelp'),t('errors.passwordHelp'))

  const onSuccess = () => {
    navigate('/dashboard');
  };

  const { mutate: login, isPending: isLoading } = useAuthMutations().useLogin({ onSuccess });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    MyLogger.debug("FORM","Starting login process with provided data:",loginData)
    const result = schema.safeParse(loginData)
    if (!result.success){
      MyLogger.error("FORM","Validation failed",result.error.issues)
      setErrorMessage(result.error.issues[0].message)  
      return;
    }
    MyLogger.debug("FORM","Validation succeeded, login data and validation result:", loginData, result)
    
    login(loginData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-2/3 flex flex-col gap-5">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
        isLoading={isLoading}
      >
         {t('login')}
      </Button>
    </form>
  );
};
