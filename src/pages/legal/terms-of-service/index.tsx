import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '@/components/layout/legal';

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'pages.termsOfService',
  });

  return (
    <LegalPageLayout
      title={t('title', 'Regulamin')}
      subtitle={t(
        'subtitle',
        'Zapoznaj się z zasadami korzystania z aplikacji Remisio.',
      )}
      icon="📋"
      content={t('full')}
    />
  );
};

export default TermsOfServicePage;
