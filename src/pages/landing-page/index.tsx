import { Button } from '@/components/ui/button'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface Stat {
  value: string
  label: string
}

interface CardProps {
  href: string
  src: string
  alt: string
  name: string
}

interface InfoSliceProps {
  title: string
  text: string
  img: string
  reverse?: boolean
}

const Card = ({ href, src, alt, name }: CardProps) => (
  <a href={href} className="transition-opacity hover:opacity-80">
    <div className="flex flex-col items-center gap-2 rounded-lg border border-primary-accent/40 bg-foreground/50 p-6 shadow">
      <img src={src} alt={alt} className="h-14 w-14 sm:h-20 sm:w-20" />
      <span className="font-semibold text-primary-accent">{name}</span>
    </div>
  </a>
)

const InfoSlice = ({ title, text, img, reverse }: InfoSliceProps) => (
  <div
    className={`mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16
                sm:flex-row ${reverse ? 'sm:flex-row-reverse' : ''}
                bg-transparent`}
  >
    <img
      src={img}
      alt=""                                  /* alt dla a11y */
      className="h-93 w-full object-contain"  /* usunięto rounded-xl i shadow-lg */
    />

    <div className="max-w-lg">
      <h2 className="text-3xl font-extrabold text-primary-accent">
        {title}
      </h2>
      <p className="mt-4 text-base text-primary-accent">
        {text}
      </p>
    </div>
  </div>
);


export const LandingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const stats: Stat[] = [
    { value: '4', label: t('landing-page.stat_1') },
    { value: '13', label: t('landing-page.stat_2') },
    { value: '2', label: t('landing-page.stat_3') },
    { value: '0 PLN', label: t('landing-page.stat_4') },
  ]

  return (
    <div className="min-h-screen w-full bg-background font-['Roboto']">
      <header className="mx-auto flex w-full max-w-7xl items-center px-4 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Remisio logo" className="h-10 sm:h-12" />
          <span className="text-xl font-semibold text-primary-accent sm:text-3xl">{t('landing-page.title')}</span>
          <nav className="ml-10 hidden items-center gap-8 text-sm font-medium text-primary-accent md:flex">
            <a href="#">{t('landing-page.home')}</a>
            <a href="#info">{t('landing-page.info')}</a>
            <a href="#download">{t('landing-page.application')}</a>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4 whitespace-nowrap">
          <button onClick={() => navigate('/login')} className="text-sm font-medium text-primary-accent">
            {t('landing-page.sign_in')}
          </button>
          <Button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background">
            {t('landing-page.contact')}
          </Button>
        </div>
      </header>

      <section className="relative mx-auto flex min-h-[550px] w-full max-w-7xl items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary-accent)] to-[var(--color-primary)] px-8 py-20">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-primary-accent">{t('landing-page.title')} • {t('landing-page.subtitle')}</p>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-6xl"><Trans i18nKey="landing-page.hero_headline" /></h1>
          <p className="text-sm text-foreground/80 sm:text-base">{t('landing-page.body')}</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-primary-accent px-6 py-3 text-sm font-semibold text-background">{t('landing-page.download_app')}</Button>
            <Button onClick={() => { }} className="rounded-full border border-primary-accent bg-transparent px-6 py-3 text-sm font-semibold text-primary-accent">{t('landing-page.demo')}</Button>
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
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/90 p-6 backdrop-blur shadow sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-primary-accent">{s.value}</span>
              <span className="text-xs text-primary-accent">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="info">
        <InfoSlice title={t('landing-page.row_title_1')} text={t('landing-page.row_subtitle_1')} img="remisio_mobile_demo.png" />
        <InfoSlice title={t('landing-page.row_title_2')} text={t('landing-page.row_subtitle_2')} img="dashboard_image.png" reverse />
      </section>

      <section id="download" className="mt-20 flex flex-col items-center gap-8 px-4">
        <span className="text-lg font-semibold text-primary-accent">{t('landing-page.download_app', { defaultValue: 'Download Our App' })}</span>
        <div className="flex gap-8">
          <Card href="https://play.google.com" src="/logos/android.png" alt="Android" name="Android" />
          <Card href="https://apps.apple.com" src="/logos/apple.png" alt="iOS" name="iOS" />
        </div>
      </section>

      <footer className="mt-20 w-full bg-foreground/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-sm text-foreground/70 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Remisio</span>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
