import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { SplitImage } from '@/features/auth/components/SplitImage';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const RegistrationForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = t('registration.email_subject');
        const body = t('registration.email_body', { email });

        const mailtoLink = `mailto:kontakt@remisio.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="bg-background min-h-screen w-full font-['Roboto']">
            <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl">
                <SplitImage />
                {/* Right side - Form */}
                <div className="flex w-full flex-col items-center justify-center px-4 md:w-1/2 md:px-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-primary-accent text-3xl font-bold">
                                {t('registration.title')}
                            </h2>
                            <p className="text-primary-accent/80 mt-2 text-sm">
                                {t('registration.description')}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-primary-accent block text-sm font-medium"
                                >
                                    {t('registration.email_label')}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-primary-accent/20 placeholder:text-primary-accent/50 focus:border-primary-accent mt-1 block w-full rounded-md border bg-transparent p-2 text-sm text-primary-accent focus:outline-none"
                                    placeholder={t('registration.email_placeholder')}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="bg-primary text-background hover:bg-primary/90 w-full rounded-full py-2 text-sm font-semibold transition-colors"
                            >
                                {t('registration.submit_button')}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegistrationForm;