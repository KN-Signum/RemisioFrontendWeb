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
  AiOutlineRight,
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

const HelpSection = ({
  title,
  description,
  icon,
  children,
}: HelpSectionProps) => {
  return (
    <div className={cn(borderClasses, 'flex-col gap-4 px-6')}>
      <div className="flex items-center gap-3">
        <div className="text-primary-accent">{icon}</div>
        <div>
          <h3 className="text-primary-accent text-lg font-semibold">{title}</h3>
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

const ContactCard = ({
  icon,
  title,
  description,
  action,
  onClick,
}: ContactCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="text-primary-accent">{icon}</div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          <button
            onClick={onClick}
            className="text-primary-accent mt-2 text-sm hover:underline"
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

const HelpPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'pages.help' });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: t('faq.questions.login.question'),
      answer: t('faq.questions.login.answer'),
    },
    {
      question: t('faq.questions.patients.question'),
      answer: t('faq.questions.patients.answer'),
    },
    {
      question: t('faq.questions.data.question'),
      answer: t('faq.questions.data.answer'),
    },
    {
      question: t('faq.questions.notifications.question'),
      answer: t('faq.questions.notifications.answer'),
    },
    {
      question: t('faq.questions.backup.question'),
      answer: t('faq.questions.backup.answer'),
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
            <h1 className="text-primary-accent text-2xl font-bold">
              {t('title')}
            </h1>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>
        </div>

        {/* quickHelp. Help */}
        <HelpSection
          title={t('quickHelp.title')}
          description={t('quickHelp.description')}
          icon={<AiOutlineQuestionCircle className="size-6" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ContactCard
              icon={<AiOutlineFileText className="h-6 w-6" />}
              title={t('quickHelp.userGuide.title')}
              description={t('quickHelp.userGuide.description')}
              action={t('quickHelp.userGuide.action')}
              onClick={handleUserGuide}
            />
            <ContactCard
              icon={<AiOutlineVideoCamera className="h-6 w-6" />}
              title={t('quickHelp.tutorials.title')}
              description={t('quickHelp.tutorials.description')}
              action={t('quickHelp.tutorials.action')}
              onClick={handleVideoTutorials}
            />
          </div>
        </HelpSection>

        {/* FAQ Section */}
        <HelpSection
          title={t('faq.title')}
          description={t('faq.description')}
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
          title={t('contact.title')}
          description={t('contact.description')}
          icon={<AiOutlineMail className="size-6" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ContactCard
              icon={<AiOutlineMail className="h-6 w-6" />}
              title={t('contact.email.title')}
              description={t('contact.email.description')}
              action={t('contact.email.action')}
              onClick={handleEmailSupport}
            />
            <ContactCard
              icon={<AiOutlinePhone className="h-6 w-6" />}
              title={t('contact.phone.title')}
              description={t('contact.phone.description')}
              action={t('contact.phone.action')}
              onClick={handlePhoneSupport}
            />
          </div>
        </HelpSection>

        {/* System Information */}
        <HelpSection
          title={t('system.title')}
          description={t('system.description')}
          icon={<AiOutlineFileText className="size-6" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">{t('system.version')}</span>
              <span className="text-gray-500">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">{t('system.browser')}</span>
              <span className="text-gray-500">
                {navigator.userAgent
                  .split(' ')
                  .find((item) => item.includes('Chrome')) || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">{t('system.lastUpdate')}</span>
              <span className="text-gray-500">2025-08-06</span>
            </div>
          </div>
        </HelpSection>
      </div>
    </Layout>
  );
};

export default HelpPage;
