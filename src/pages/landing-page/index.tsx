import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Stat {
  value: string;
  label: string;
}

interface CardProps {
  href: string;
  src: string;
  alt: string;
  name: string;
}

interface InfoSliceProps {
  title: string;
  text: string;
  img: string;
  reverse?: boolean;
}

const Card = ({ href, src, alt, name }: CardProps) => (
  <a href={href} className="transition-opacity hover:opacity-80">
    <div className="border-primary-accent/40 bg-foreground/50 flex flex-col items-center gap-2 rounded-lg border p-6 shadow">
      <img src={src} alt={alt} className="h-14 w-14 sm:h-20 sm:w-20" />
      <span className="text-primary-accent font-semibold">{name}</span>
    </div>
  </a>
);

const InfoSlice = ({ title, text, img, reverse }: InfoSliceProps) => (
  <div
    className={`mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:flex-row ${reverse ? 'sm:flex-row-reverse' : ''} bg-transparent`}
  >
    <img
      src={img}
      alt="" /* alt dla a11y */
      className="h-93 w-full object-contain" /* usunięto rounded-xl i shadow-lg */
    />

    <div className="max-w-lg">
      <h2 className="text-primary-accent text-3xl font-extrabold">{title}</h2>
      <p className="text-primary-accent mt-4 text-base">{text}</p>
    </div>
  </div>
);

export const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats: Stat[] = [
    { value: '4', label: t('landing-page.stat_1') },
    { value: '13', label: t('landing-page.stat_2') },
    { value: '2', label: t('landing-page.stat_3') },
    { value: '0 PLN', label: t('landing-page.stat_4') },
  ];

  return (
    <div className="bg-background min-h-screen w-full font-['Roboto']">
      <header className="mx-auto flex w-full max-w-7xl items-center px-4 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Remisio logo" className="h-10 sm:h-12" />
          <span className="text-primary-accent text-xl font-semibold sm:text-3xl">
            {t('landing-page.title')}
          </span>
          <nav className="text-primary-accent ml-10 hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#">{t('landing-page.home')}</a>
            <a href="#info">{t('landing-page.info')}</a>
            <a href="#download">{t('landing-page.application')}</a>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4 whitespace-nowrap">
          <button
            onClick={() => navigate('/login')}
            className="text-primary-accent text-sm font-medium"
          >
            {t('landing-page.sign_in')}
          </button>
          <Button className="bg-primary text-background rounded-full px-5 py-2 text-sm font-semibold">
            {t('landing-page.contact')}
          </Button>
        </div>
      </header>

      <section className="relative mx-auto flex min-h-[550px] w-full max-w-7xl items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary-accent)] to-[var(--color-primary)] px-8 py-20">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="text-primary-accent text-xs tracking-widest uppercase">
            {t('landing-page.title')} • {t('landing-page.subtitle')}
          </p>
          <h1 className="text-foreground text-4xl leading-tight font-extrabold sm:text-6xl">
            <Trans i18nKey="landing-page.hero_headline" />
          </h1>
          <p className="text-foreground/80 text-sm sm:text-base">
            {t('landing-page.body')}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              onClick={() =>
                document
                  .getElementById('download')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-primary-accent text-background rounded-full px-6 py-3 text-sm font-semibold"
            >
              {t('landing-page.download_app')}
            </Button>
            <Button
              onClick={() => {}}
              className="border-primary-accent text-primary-accent rounded-full border bg-transparent px-6 py-3 text-sm font-semibold"
            >
              {t('landing-page.demo')}
            </Button>
          </div>
        </div>
        <div className="ml-auto hidden h-full w-1/2 md:block">
          <img
            src="/hero.png"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </section>

      <section className="mx-auto -mt-12 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/90 p-6 shadow backdrop-blur sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-primary-accent text-2xl font-extrabold">
                {s.value}
              </span>
              <span className="text-primary-accent text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="info">
        <InfoSlice
          title={t('landing-page.row_title_1')}
          text={t('landing-page.row_subtitle_1')}
          img="remisio_mobile_demo.png"
        />
        <InfoSlice
          title={t('landing-page.row_title_2')}
          text={t('landing-page.row_subtitle_2')}
          img="dashboard_image.png"
          reverse
        />
      </section>

      <section
        id="download"
        className="mt-20 flex flex-col items-center gap-8 px-4"
      >
        <span className="text-primary-accent text-lg font-semibold">
          {t('landing-page.download_app', { defaultValue: 'Download Our App' })}
        </span>
        <div className="flex gap-8">
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
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
