import React, { useState } from 'react';
import { InputField } from "@/features/components/input-field";
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    isLoading?: boolean;
    error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                disabled={isLoading}
            >
                {isLoading ? t('login.loading') ?? '...' : t('login.login')}
            </button>
        </form>
    );
};
