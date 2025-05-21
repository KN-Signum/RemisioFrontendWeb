import React, { useState } from 'react';
import { InputField } from '@/components/ui/input-field';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <InputField
        id="email"
        label={t('login.email')}
        type="email"
        placeholder={t('login.email_placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        id="password"
        label={t('login.password')}
        type="password"
        placeholder={t('login.password_placeholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex gap-1">
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0s]" />
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0.2s]" />
            <span className="animate-dot-flash h-1.5 w-1.5 rounded-full bg-white [animation-delay:0.4s]" />
          </span>
        ) : (
          t('login.login')
        )}
      </button>
    </form>
  );
};
