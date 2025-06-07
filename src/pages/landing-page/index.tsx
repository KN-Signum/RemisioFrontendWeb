import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  href: string;
  src: string;
  alt: string;
  name: string;
}

const Card = (props: CardProps) => {
  const { href, src, alt, name } = props;
  return (
    <a href={href}>
      <div
        className="bg-foreground/40 border-primary-accent/60 flex flex-col items-center gap-2 rounded-sm border hover:cursor-pointer hover:opacity-80 xl:p-7 2xl:p-15"
        style={{
          boxShadow: '0.1rem 0.07rem 3px var(--color-primary-accent)',
        }}
      >
        <img src={src} alt={alt} className="xl:size-20 2xl:size-35" />
        <span className="text-primary-accent text-center text-2xl font-bold">
          {name}
        </span>
      </div>
    </a>
  );
};

export const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-background h-screen px-50 py-8">
      <div
        className="bg-primary/40 text-primary-accent border-primary-accent/60 flex h-full w-full flex-col rounded-sm border px-20 py-6"
        style={{
          boxShadow: '0.1rem 0.07rem 3px var(--color-primary-accent)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-10">
            <img
              src="/logos/skn_gastro.svg"
              alt="SKN Gastroenterologii"
              className="xl:size-25 2xl:size-30"
              style={{
                scale: '1.4',
              }}
            />
            <img
              src="/logos/signum.png"
              alt="SIGNUM"
              className="xl:h-20 xl:w-50 2xl:h-30 2xl:w-70"
            />
          </div>
          <Button
            className="bg-primary-accent px-12 py-3 text-xl font-bold"
            onClick={() => navigate('/login')}
          >
            {t('landing-page.cta')}
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 xl:mt-1 2xl:mt-6">
          <img
            src="/app_icon.png"
            alt="GastroApp icon"
            className="xl:size-35 2xl:size-60"
          />
          <span className="text-primary-accent text-3xl font-bold">
            {t('landing-page.download')}
          </span>
        </div>
        <div className="mt-12 flex items-center justify-center gap-30">
          <Card
            href="https://play.google.com"
            src="/logos/android.png"
            alt="Android"
            name="Android"
          />
          <Card
            href="https://apps.apple.com"
            src="/logos/apple.png"
            alt="iOS"
            name="iOS"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
