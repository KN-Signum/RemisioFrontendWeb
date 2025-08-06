import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '../../../components/layout/LegalPageLayout';

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <LegalPageLayout
            title={t('privacyPolicy.title', 'Polityka prywatności')}
            subtitle={t('privacyPolicy.subtitle', 'Dowiedz się, jak gromadzimy i przetwarzamy Twoje dane osobowe.')}
            icon="🛡️"
            content={t('privacyPolicy.full')}
            translationKey="privacyPolicy"
        />
    );
};

export default PrivacyPolicyPage;
