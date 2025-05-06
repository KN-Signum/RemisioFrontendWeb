import { useState } from 'react';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { Logo } from '../../features/auth/components/Logo';
import { SplitImage } from '../../features/auth/components/SplitImage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(undefined);

        try {
            navigate('/dashboard');
        } catch (err) {
            setError(t('login.failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <SplitImage />

            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
                <div className="absolute top-0 right-0 w-1/2 flex justify-center p-8">
                    <Logo />
                </div>
                <div className="max-w-md mx-auto w-full">
                    <h2 className="text-3xl font-bold mb-2 text-primary-accent">{t('login.welcome')}</h2>
                    <p className="mb-6 text-gray-500 text-primary-accent">{t('login.subtitle')}</p>

                    <LoginForm onSubmit={handleLogin} isLoading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
