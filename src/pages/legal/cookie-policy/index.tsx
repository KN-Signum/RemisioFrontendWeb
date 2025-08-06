import { useTranslation } from 'react-i18next';
import { LegalPageLayout } from '../../../components/layout/LegalPageLayout';

const CookiePolicyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <LegalPageLayout
            title={t('cookiePolicy.title', 'Polityka cookies')}
            subtitle={t('cookiePolicy.subtitle', 'Dowiedz się, jak używamy plików cookies w aplikacji Remisio.')}
            icon="🍪"
            content={t('cookiePolicy.full')}
            translationKey="cookiePolicy"
        />
    );
};

export default CookiePolicyPage;
