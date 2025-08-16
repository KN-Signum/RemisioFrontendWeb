import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

const CookiePolicyPage: React.FC = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'pages.cookiePolicy',
  });

  return (
    <LegalPageLayout
      title={t('title', 'Polityka cookies')}
      subtitle={t(
        'subtitle',
        'Dowiedz się, jak używamy plików cookies w aplikacji Remisio.',
      )}
      icon="🍪"
      content={t('full')}
    />
  );
};

export default CookiePolicyPage;
