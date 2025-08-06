import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '../../../components/layout/LegalPageLayout';

const TermsOfServicePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <LegalPageLayout
            title={t('termsOfService.title', 'Regulamin')}
            subtitle={t('termsOfService.subtitle', 'Zapoznaj się z zasadami korzystania z aplikacji Remisio.')}
            icon="📋"
            content={t('termsOfService.full')}
            translationKey="termsOfService"
        />
    );
};

export default TermsOfServicePage;
