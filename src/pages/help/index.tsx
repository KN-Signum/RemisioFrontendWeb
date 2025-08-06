import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout';
import { cn } from '@/utils/cn';
import {
    AiOutlineQuestionCircle,
    AiOutlineFileText,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineBook,
    AiOutlineVideoCamera,
    AiOutlineDown,
    AiOutlineRight
} from 'react-icons/ai';

const borderClasses =
    'flex bg-foreground border-2 border-primary-accent/60 rounded-sm py-4 shadow-primary-accent shadow-xs';

type FAQItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50"
            >
                <span className="font-medium text-gray-900">{question}</span>
                {isOpen ? (
                    <AiOutlineDown className="h-5 w-5 text-gray-500" />
                ) : (
                    <AiOutlineRight className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

type HelpSectionProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
};

const HelpSection = ({ title, description, icon, children }: HelpSectionProps) => {
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

type ContactCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    action: string;
    onClick: () => void;
};

const ContactCard = ({ icon, title, description, action, onClick }: ContactCardProps) => {
    return (
        <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="flex items-start gap-3">
                <div className="text-primary-accent">{icon}</div>
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                    <button
                        onClick={onClick}
                        className="mt-2 text-sm text-primary-accent hover:underline"
                    >
                        {action}
                    </button>
                </div>
            </div>
        </div>
    );
};

const HelpPage = () => {
    const { t } = useTranslation();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const faqData = [
        {
            question: t('help.faq.questions.login.question'),
            answer: t('help.faq.questions.login.answer'),
        },
        {
            question: t('help.faq.questions.patients.question'),
            answer: t('help.faq.questions.patients.answer'),
        },
        {
            question: t('help.faq.questions.data.question'),
            answer: t('help.faq.questions.data.answer'),
        },
        {
            question: t('help.faq.questions.notifications.question'),
            answer: t('help.faq.questions.notifications.answer'),
        },
        {
            question: t('help.faq.questions.backup.question'),
            answer: t('help.faq.questions.backup.answer'),
        },
    ];

    const handleFAQToggle = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleEmailSupport = () => {
        window.location.href = 'mailto:kontakt@remisio.pl';
    };

    const handlePhoneSupport = () => {
        window.location.href = 'tel:+48123456789';
    };

    const handleUserGuide = () => {
        // TODO: Open user guide
        console.log('User guide clicked');
    };

    const handleVideoTutorials = () => {
        // TODO: Open video tutorials
        console.log('Video tutorials clicked');
    };

    return (
        <Layout>
            <div className="flex w-full flex-col gap-4 overflow-y-auto">
                {/* Header */}
                <div className={cn(borderClasses, 'items-center justify-between px-6')}>
                    <div>
                        <h1 className="text-2xl font-bold text-primary-accent">{t('help.title')}</h1>
                        <p className="text-gray-600">{t('help.subtitle')}</p>
                    </div>
                </div>

                {/* Quick Help */}
                <HelpSection
                    title={t('help.quickHelp.title')}
                    description={t('help.quickHelp.description')}
                    icon={<AiOutlineQuestionCircle className="size-6" />}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <ContactCard
                            icon={<AiOutlineFileText className="h-6 w-6" />}
                            title={t('help.quickHelp.userGuide.title')}
                            description={t('help.quickHelp.userGuide.description')}
                            action={t('help.quickHelp.userGuide.action')}
                            onClick={handleUserGuide}
                        />
                        <ContactCard
                            icon={<AiOutlineVideoCamera className="h-6 w-6" />}
                            title={t('help.quickHelp.tutorials.title')}
                            description={t('help.quickHelp.tutorials.description')}
                            action={t('help.quickHelp.tutorials.action')}
                            onClick={handleVideoTutorials}
                        />
                    </div>
                </HelpSection>

                {/* FAQ Section */}
                <HelpSection
                    title={t('help.faq.title')}
                    description={t('help.faq.description')}
                    icon={<AiOutlineBook className="size-6" />}
                >
                    <div className="space-y-0">
                        {faqData.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openFAQ === index}
                                onToggle={() => handleFAQToggle(index)}
                            />
                        ))}
                    </div>
                </HelpSection>

                {/* Contact Support */}
                <HelpSection
                    title={t('help.contact.title')}
                    description={t('help.contact.description')}
                    icon={<AiOutlineMail className="size-6" />}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <ContactCard
                            icon={<AiOutlineMail className="h-6 w-6" />}
                            title={t('help.contact.email.title')}
                            description={t('help.contact.email.description')}
                            action={t('help.contact.email.action')}
                            onClick={handleEmailSupport}
                        />
                        <ContactCard
                            icon={<AiOutlinePhone className="h-6 w-6" />}
                            title={t('help.contact.phone.title')}
                            description={t('help.contact.phone.description')}
                            action={t('help.contact.phone.action')}
                            onClick={handlePhoneSupport}
                        />
                    </div>
                </HelpSection>

                {/* System Information */}
                <HelpSection
                    title={t('help.system.title')}
                    description={t('help.system.description')}
                    icon={<AiOutlineFileText className="size-6" />}
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('help.system.version')}</span>
                            <span className="text-gray-500">1.0.0</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('help.system.browser')}</span>
                            <span className="text-gray-500">
                                {navigator.userAgent.split(' ').find(item => item.includes('Chrome')) || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{t('help.system.lastUpdate')}</span>
                            <span className="text-gray-500">2025-08-06</span>
                        </div>
                    </div>
                </HelpSection>
            </div>
        </Layout>
    );
};

export default HelpPage;
