import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout';
import { cn } from '@/utils/cn';
import {
    AiOutlineUser,
    AiOutlineGlobal,
    AiOutlineBell,
    AiOutlineSafety,
    AiOutlineInfo,
    AiOutlineLogout
} from 'react-icons/ai';

const borderClasses =
    'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-4 shadow-primary-accent shadow-xs';

type SettingsSectionProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
};

const SettingsSection = ({ title, description, icon, children }: SettingsSectionProps) => {
    return (
        <div className={cn(borderClasses, 'flex-col gap-4 px-6')}>
            <div className="flex items-center gap-3">
                <div className="text-primary-accent">{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold text-primary-accent">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
            <div className="pl-8">{children}</div>
        </div>
    );
};

type ToggleProps = {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label: string;
};

const Toggle = ({ enabled, onChange, label }: ToggleProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">{label}</span>
            <button
                onClick={() => onChange(!enabled)}
                className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    enabled ? 'bg-primary-accent' : 'bg-gray-300'
                )}
            >
                <span
                    className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    )}
                />
            </button>
        </div>
    );
};

type SelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    label: string;
};

const Select = ({ value, onChange, options, label }: SelectProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded border border-gray-300 px-3 py-1 focus:border-primary-accent focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);
    const [language, setLanguage] = useState(i18n.language);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    const handleLogout = () => {
        // TODO: Implement logout functionality
        console.log('Logout clicked');
    };

    return (
        <Layout>
            <div className="flex w-full flex-col gap-4 overflow-y-auto">
                {/* Header */}
                <div className={cn(borderClasses, 'items-center justify-between px-6')}>
                    <div>
                        <h1 className="text-2xl font-bold text-primary-accent">{t('settings.title')}</h1>
                        <p className="text-gray-600">{t('settings.subtitle')}</p>
                    </div>
                </div>

                {/* Profile Settings */}
                <SettingsSection
                    title={t('settings.profile.title')}
                    description={t('settings.profile.description')}
                    icon={<AiOutlineUser className="size-6" />}
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('settings.profile.name')}</span>
                            <span className="text-gray-500">Dr. Jan Kowalski</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('settings.profile.email')}</span>
                            <span className="text-gray-500">jan.kowalski@example.com</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('settings.profile.specialization')}</span>
                            <span className="text-gray-500">{t('settings.profile.gastroenterology')}</span>
                        </div>
                    </div>
                </SettingsSection>

                {/* Language Settings */}
                <SettingsSection
                    title={t('settings.language.title')}
                    description={t('settings.language.description')}
                    icon={<AiOutlineGlobal className="size-6" />}
                >
                    <Select
                        label={t('settings.language.select')}
                        value={language}
                        onChange={handleLanguageChange}
                        options={[
                            { value: 'pl', label: 'Polski' },
                            { value: 'en', label: 'English' },
                        ]}
                    />
                </SettingsSection>

                {/* Notification Settings */}
                <SettingsSection
                    title={t('settings.notifications.title')}
                    description={t('settings.notifications.description')}
                    icon={<AiOutlineBell className="size-6" />}
                >
                    <div className="space-y-2">
                        <Toggle
                            enabled={emailNotifications}
                            onChange={setEmailNotifications}
                            label={t('settings.notifications.email')}
                        />
                        <Toggle
                            enabled={pushNotifications}
                            onChange={setPushNotifications}
                            label={t('settings.notifications.push')}
                        />
                    </div>
                </SettingsSection>

                {/* Privacy Settings */}
                <SettingsSection
                    title={t('settings.privacy.title')}
                    description={t('settings.privacy.description')}
                    icon={<AiOutlineSafety className="size-6" />}
                >
                    <div className="space-y-2">
                        <Toggle
                            enabled={dataSharing}
                            onChange={setDataSharing}
                            label={t('settings.privacy.dataSharing')}
                        />
                    </div>
                </SettingsSection>

                {/* About */}
                <SettingsSection
                    title={t('settings.about.title')}
                    description={t('settings.about.description')}
                    icon={<AiOutlineInfo className="size-6" />}
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('settings.about.version')}</span>
                            <span className="text-gray-500">1.0.0</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('settings.about.developer')}</span>
                            <span className="text-gray-500">Koło Naukowe Signum</span>
                        </div>
                    </div>
                </SettingsSection>

                {/* Logout */}
                <div className={cn(borderClasses, 'items-center justify-center px-6')}>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
                    >
                        <AiOutlineLogout className="size-5" />
                        {t('settings.logout')}
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
