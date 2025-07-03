import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
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
  <div className={`mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 sm:flex-row ${reverse ? 'sm:flex-row-reverse' : ''}`}>
    <img src={img} className="h-93 w-full rounded-xl object-cover shadow-lg" />
    <div className="max-w-lg">
      <h2 className="text-3xl font-extrabold text-primary-accent">{title}</h2>
      <p className="mt-4 text-base text-primary-accent">{text}</p>
    </div>
  </div>
)

export const LandingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const stats: Stat[] = [
    { value: '4', label: 'Key Deliverables' },
    { value: '13', label: 'Functional Features' },
    { value: '2', label: 'Scientific Talks' },
    { value: '0 €', label: 'Licensing Costs' },
  ]

  return (
    <div className="min-h-screen w-full bg-background font-['Roboto']">
      <header className="mx-auto flex w-full max-w-7xl items-center px-4 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Remisio logo" className="h-10 sm:h-12" />
          <span className="text-xl font-semibold text-primary-accent sm:text-3xl">Remisio</span>
          <nav className="ml-10 hidden items-center gap-8 text-sm font-medium text-primary-accent md:flex">
            <a href="#">Home</a>
            <a href="#info">Info</a>
            <a href="#download">Application</a>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4 whitespace-nowrap">
          <button onClick={() => navigate('/login')} className="text-sm font-medium text-primary-accent">
            Sign in
          </button>
          <Button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background">
            Contact
          </Button>
        </div>
      </header>

      <section className="relative mx-auto flex min-h-[550px] w-full max-w-7xl items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary-accent)] to-[var(--color-primary)] px-8 py-20">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-primary-accent">Remisio • Digital IBD Care</p>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">Remisio&nbsp;łączy<br />pacjentów&nbsp;i&nbsp;lekarzy</h1>
          <p className="text-sm text-foreground/80 sm:text-base">Pacjenci zyskują kontrolę nad chorobą, lekarze – widok trendów i powiadomienia o nagłych zmianach. Jedna baza, zero papieru.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-primary-accent px-6 py-3 text-sm font-semibold text-background">Pobierz aplikację</Button>
            <Button onClick={() => navigate('/doctor')} className="rounded-full border border-primary-accent bg-transparent px-6 py-3 text-sm font-semibold text-primary-accent">Panel lekarza</Button>
          </div>
        </div>
        <div className="ml-auto hidden h-full w-1/2 md:block">
          <img
            src="/hero.png"
            alt="Lekarz rozmawia z pacjentem"
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
        <InfoSlice title="Your Personal IBD Companion" text="Track symptoms, medications and lifestyle factors in one place. Remisio helps you and your doctor understand patterns and adjust treatment early." img="public/dashboard_image.png" />
        <InfoSlice title="Dashboard for Healthcare Professionals" text="Clinicians gain real-time insights into patient-reported outcomes, enabling proactive care and data-driven decisions." img="public/dashboard_image.png" reverse />
      </section>

      <section id="download" className="mt-20 flex flex-col items-center gap-8 px-4">
        <span className="text-lg font-semibold text-primary-accent">{t('landing-page.download', { defaultValue: 'Download Our App' })}</span>
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
