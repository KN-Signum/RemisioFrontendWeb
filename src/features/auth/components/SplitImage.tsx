import { useTranslation } from "react-i18next";

export const SplitImage = () => {
    const { t } = useTranslation();

    return (
        <div className="hidden lg:flex w-1/2 bg-white relative rounded-xl shadow-2xl overflow-hidden m-4">
            <img
                src="/gastroAppLandingPageImage.png"
                alt="Inspirational visual"
                className="absolute inset-0 h-full w-full object-fit opacity-80"
            />
            <div className="relative z-10 flex flex-col justify-end items-start p-12 text-black">
                <h1 className="text-4xl font-bold">{t('login.split_screen_title')}</h1>
                <p className="mt-4">
                    {t('login.split_screen_subtitle')}
                </p>
            </div>
        </div>
    );
}