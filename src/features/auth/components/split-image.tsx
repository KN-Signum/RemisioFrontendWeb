import { useTranslation } from 'react-i18next';

export const SplitImage = () => {
  const { t } = useTranslation('auth');

  return (
    <div className="relative m-4 hidden w-1/2 overflow-hidden rounded-xl bg-white shadow-2xl lg:flex">
      <img
        src="/gastroAppLandingPageImage.png"
        alt="Inspirational visual"
        className="object-fit absolute inset-0 h-full w-full opacity-80"
      />
      <div className="relative z-10 flex flex-col items-start justify-end p-12 text-black">
        <h1 className="text-primary-accent text-4xl font-bold">
          {t('splitScreenTitle')}
        </h1>
        <p className="text-primary-accent mt-4">{t('splitScreenSubtitle')}</p>
      </div>
    </div>
  );
};
