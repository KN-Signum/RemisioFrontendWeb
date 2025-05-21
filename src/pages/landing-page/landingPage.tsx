import { Link } from "react-router-dom";

export const LandingPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-5xl rounded-lg border-2 border-primary-accent/50 bg-primary/60 py-10 flex flex-col items-center gap-10">

            {/* górny rząd logotypów + przycisk logowania */}
            <div className="w-full flex items-center justify-between px-10">
                <div className="flex items-center gap-8">
                    <img src="/logos/skn_gastro.svg" alt="SKN Gastroenterologii" className="h-20" />
                    <img src="/logos/signum.png" alt="SIGNUM" className="h-16" />
                </div>

                {/* przycisk logowania wyrzucony na prawo */}
                <Link
                    to="/login"
                    className="bg-primary-accent text-white font-semibold px-8 py-2 rounded-lg shadow
               hover:bg-primary/80 transition"
                >
                    Zaloguj&nbsp;się
                </Link>
            </div>

            {/* ikona aplikacji */}
            <img src="/app_icon.png" alt="GastroApp icon" className="h-42 rounded-xl" />

            {/* nagłówek */}
            <h2 className="text-2xl font-bold text-primary-accent">Pobierz aplikację dla:</h2>

            {/* kafelki Android & iOS */}
            <div className="grid grid-cols-2 gap-10">
                <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-4 bg-white/30 px-14 py-10 rounded-lg border
                     border-primary/40 hover:shadow-lg hover:scale-105 transition"
                >
                    <img src="/logos/android.png" alt="Android" className="h-24" />
                    <span className="text-xl font-semibold text-primary-accent">Android</span>
                </a>

                <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-4 bg-white/30 px-14 py-10 rounded-lg border
                     border-primary/40 hover:shadow-lg hover:scale-105 transition"
                >
                    <img src="/logos/apple.png" alt="iOS" className="h-24" />
                    <span className="text-xl font-semibold text-primary-accent">IOS</span>
                </a>
            </div>
        </div>
    </div>
);

export default LandingPage;
