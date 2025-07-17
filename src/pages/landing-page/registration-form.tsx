import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { useTranslation } from 'react-i18next';

export const RegistrationForm = () => {
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="bg-background min-h-screen w-full font-['Roboto']">
            <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl">
                {/* Left side - Image */}
                <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary-accent)] to-[var(--color-primary)] md:flex">
                    <img
                        src="/hero.png"
                        alt=""
                        className="h-full w-full object-contain p-12"
                    />
                </div>

                {/* Right side - Form */}
                <div className="flex w-full flex-col items-center justify-center px-4 md:w-1/2 md:px-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-primary-accent text-3xl font-bold">
                                Registration Form
                            </h2>
                            <p className="text-primary-accent/80 mt-2 text-sm">
                                To get the Android application, we need your email to send you an invitation to the testing group. After that, you can install the app by clicking the link sent via Google Console.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-primary-accent block text-sm font-medium"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="border-primary-accent/20 placeholder:text-primary-accent/50 focus:border-primary-accent mt-1 block w-full rounded-md border bg-transparent p-2 text-sm text-primary-accent focus:outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="bg-primary text-background hover:bg-primary/90 w-full rounded-full py-2 text-sm font-semibold transition-colors"
                            >
                                Send
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