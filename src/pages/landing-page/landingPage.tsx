import { Link } from 'react-router-dom';

export const LandingPage = () => (
  <div className="bg-background flex min-h-screen items-center justify-center p-6">
    <div className="border-primary-accent/50 bg-primary/60 flex w-full max-w-5xl flex-col items-center gap-10 rounded-lg border-2 py-10">
      {/* górny rząd logotypów + przycisk logowania */}
      <div className="flex w-full items-center justify-between px-10">
        <div className="flex items-center gap-8">
          <img
            src="/logos/skn_gastro.svg"
            alt="SKN Gastroenterologii"
            className="h-20"
          />
          <img src="/logos/signum.png" alt="SIGNUM" className="h-16" />
        </div>

        {/* przycisk logowania wyrzucony na prawo */}
        <Link
          to="/login"
          className="bg-primary-accent hover:bg-primary/80 rounded-lg px-8 py-2 font-semibold text-white shadow transition"
        >
          Zaloguj&nbsp;się
        </Link>
      </div>

      {/* ikona aplikacji */}
      <img
        src="/app_icon.png"
        alt="GastroApp icon"
        className="h-42 rounded-xl"
      />

      {/* nagłówek */}
      <h2 className="text-primary-accent text-2xl font-bold">
        Pobierz aplikację dla:
      </h2>

      {/* kafelki Android & iOS */}
      <div className="grid grid-cols-2 gap-10">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noreferrer"
          className="border-primary/40 flex flex-col items-center gap-4 rounded-lg border bg-white/30 px-14 py-10 transition hover:scale-105 hover:shadow-lg"
        >
          <img src="/logos/android.png" alt="Android" className="h-24" />
          <span className="text-primary-accent text-xl font-semibold">
            Android
          </span>
        </a>

        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noreferrer"
          className="border-primary/40 flex flex-col items-center gap-4 rounded-lg border bg-white/30 px-14 py-10 transition hover:scale-105 hover:shadow-lg"
        >
          <img src="/logos/apple.png" alt="iOS" className="h-24" />
          <span className="text-primary-accent text-xl font-semibold">IOS</span>
        </a>
      </div>
    </div>
  </div>
);

export default LandingPage;
