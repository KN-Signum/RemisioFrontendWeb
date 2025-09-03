import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '@/components/layout/legal';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'pages.privacyPolicy',
  });

  return (
    <LegalPageLayout
      title={t('title', 'Polityka prywatności')}
      subtitle={t(
        'subtitle',
        'Dowiedz się, jak gromadzimy i przetwarzamy Twoje dane osobowe.',
      )}
      icon="🛡️"
      content={t('full')}
    />
  );
};

export default PrivacyPolicyPage;
