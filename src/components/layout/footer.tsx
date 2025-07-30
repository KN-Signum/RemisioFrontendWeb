import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import {
  MdCookie,
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdPrivacyTip,
} from 'react-icons/md';
import { FaAngleRight, FaFileContract } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SocialLinks = [
  {
    url: 'Facebook',
    icon: <FaFacebook />,
  },
  {
    url: 'Linkedin',
    icon: <FaLinkedin />,
  },
  {
    url: 'Instagram',
    icon: <FaInstagramSquare />,
  },
];

const SocialIcon = ({
  url,
  icon,
}: {
  url: string;
  icon: React.JSX.Element;
}) => {
  return (
    <div
      className="bg-primary-accent/10 hover:bg-primary-accent/20 flex cursor-pointer items-center rounded-full p-2 align-middle text-xl"
      onClick={() => window.open(url, '_blank')}
    >
      {icon}
    </div>
  );
};

const Contact = ({ icon: Icon, text }: { icon: IconType; text: string }) => {
  return (
    <div className="flex gap-2">
      <Icon className="text-secondary text-xl" />
      <span>{text}</span>
    </div>
  );
};

const FastLink = ({ text, nav }: { text: string; nav: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="hover:bg-primary-accent/10 -ml-1.5 flex w-30 cursor-pointer items-center gap-2 rounded p-1"
      onClick={() => navigate(nav)}
    >
      <FaAngleRight className="text-secondary" />
      <span>{text}</span>
    </div>
  );
};

const LegalLink = ({
  icon: Icon,
  text,
  nav,
}: {
  icon: IconType;
  text: string;
  nav: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="hover:bg-primary-accent/10 -ml-1.5 flex w-50 cursor-pointer gap-2 rounded p-1"
      onClick={() => navigate(nav)}
    >
      <Icon className="text-secondary text-xl" />
      <span>{text}</span>
    </div>
  );
};

export const Footer = () => {
  const { t } = useTranslation('layout');

  return (
    <footer className="text-primary-accent mt-10 flex w-full flex-col gap-6 bg-black/5 px-50 py-10">
      <div className="flex flex-row gap-10">
        <div className="flex-2">
          <div className="mb-4 flex items-center gap-3">
            <img src="/app_icon.png" alt="Remisio Logo" className="size-10" />
            <span className="text-3xl font-bold">Remisio</span>
          </div>
          <span>{t('footer.disclaimer')}</span>

          <div className="mt-6 flex flex-col gap-1">
            <Contact icon={MdEmail} text="kontakt@remisio.pl" />
            <Contact icon={MdPhone} text="+48 123 456 789" />
            <Contact icon={MdLocationOn} text="Wrocław, Polska" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <span className="mb-2 text-lg font-bold">
              {t('footer.quickLinks')}
            </span>
            <FastLink text={t('sidebar.dashboard')} nav="dashboard" />
            <FastLink text={t('sidebar.patients')} nav="patients" />
            <FastLink text={t('sidebar.calendar')} nav="calendar" />
            <FastLink text={t('sidebar.help')} nav="help" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <span className="mb-2 text-lg font-bold">
              {t('footer.legalInfo')}
            </span>
            <LegalLink
              icon={MdPrivacyTip}
              text={t('footer.privacyPolicy')}
              nav="/privacy-policy"
            />
            <LegalLink
              icon={FaFileContract}
              text={t('footer.termsOfService')}
              nav="/terms-of-service"
            />
            <LegalLink
              icon={MdCookie}
              text={t('footer.cookiePolicy')}
              nav="/cookie-policy"
            />
          </div>
        </div>
      </div>

      <hr className="opacity-20" />

      <div className="flex flex-col items-center gap-6">
        <span className="text-2xl font-bold">{t('footer.creators')}</span>
        <div className="flex gap-10">
          <img
            src="/logos/signum.png"
            alt="Signum"
            className="my-2.5 h-20 w-35"
          />
          <img
            src="/logos/skn_gastro.svg"
            alt="SKN Gastro"
            className="size-25"
          />
        </div>
      </div>

      <hr className="opacity-20" />

      <div className="flex justify-between">
        <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
        <div className="flex items-center gap-2">
          <span className="mr-2">{t('footer.followUs')}</span>
          {SocialLinks.map((link) => (
            <SocialIcon key={link.url} url={link.url} icon={link.icon} />
          ))}
        </div>
      </div>
    </footer>
  );
};
