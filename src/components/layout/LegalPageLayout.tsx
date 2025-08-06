import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface LegalPageLayoutProps {
    title: string;
    subtitle: string;
    icon: string;
    content: string;
    translationKey: string;
}

function parseContent(raw: string): { jsx: React.ReactElement[]; toc: TocItem[] } {
    const lines = raw.split('\n');
    const out: React.ReactElement[] = [];
    const toc: TocItem[] = [];

    function parseInline(text: string): React.ReactNode {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .split(/<(\/?(?:strong|em))>/)
            .map((part, idx) => {
                if (part === 'strong' || part === '/strong') return null;
                if (part === 'em' || part === '/em') return null;
                if (idx > 0 && part === 'strong') return null;
                const prevTag = idx > 0 ? text.split(/<(\/?(?:strong|em))>/)[idx - 1] : null;
                if (prevTag === 'strong') return <strong key={idx} className="font-semibold text-primary-accent">{part}</strong>;
                if (prevTag === 'em') return <em key={idx} className="italic">{part}</em>;
                return part;
            })
            .filter(Boolean);
    }

    lines.forEach((line, idx) => {
        line = line.trim();
        if (line.startsWith('# ')) {
            const text = line.substring(2);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            toc.push({ id, text, level: 1 });
            out.push(
                <h1 id={id} key={idx} className="text-3xl font-bold mt-12 mb-6 first:mt-0 text-primary-accent border-b border-primary-accent/20 pb-3">
                    {parseInline(text)}
                </h1>
            );
        } else if (line.startsWith('## ')) {
            const text = line.substring(3);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            toc.push({ id, text, level: 2 });
            out.push(
                <h2 id={id} key={idx} className="text-2xl font-semibold mt-10 mb-4 text-primary-accent">
                    {parseInline(text)}
                </h2>
            );
        } else if (line.startsWith('### ')) {
            const text = line.substring(4);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            toc.push({ id, text, level: 3 });
            out.push(
                <h3 id={id} key={idx} className="text-xl font-medium mt-8 mb-3 text-primary-accent">
                    {parseInline(text)}
                </h3>
            );
        } else if (line.startsWith('- ')) {
            out.push(
                <li key={idx} className="ml-6 mb-2 leading-relaxed text-gray-700 list-disc">
                    {parseInline(line.substring(2))}
                </li>
            );
        } else if (line.startsWith('**') && line.endsWith('**')) {
            out.push(
                <p key={idx} className="font-semibold text-primary-accent mt-6 mb-3">
                    {parseInline(line)}
                </p>
            );
        } else if (line.includes('---')) {
            out.push(
                <hr key={idx} className="my-16 border-gray-200" />
            );
        } else if (line) {
            out.push(
                <p key={idx} className="leading-relaxed mb-4 text-gray-700">
                    {parseInline(line)}
                </p>
            );
        }
    });

    return { jsx: out, toc };
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
    title,
    subtitle,
    icon,
    content,
    translationKey
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { jsx, toc } = useMemo(() => parseContent(content), [content]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-background">
            {/* Navigation Header */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logo.svg" alt="Remisio logo" className="h-8 w-8 transition-transform hover:scale-110" />
                            <span className="text-xl font-semibold text-primary-accent">Remisio</span>
                        </div>
                        <Button
                            onClick={() => navigate('/')}
                            className="border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white bg-transparent transition-all duration-300 hover:scale-105 px-6 py-2 rounded-full"
                        >
                            ← {t('general.back') || 'Powrót'}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="bg-gradient-to-r from-primary via-primary-accent to-primary text-white py-16 lg:py-24 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    <div className="relative max-w-6xl mx-auto px-6">
                        <div className="max-w-3xl animate-fadeIn">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-6xl lg:text-7xl">{icon}</div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight animate-slideInFromLeft">
                                        {title}
                                    </h1>
                                    <p className="text-xl text-white/90 mt-3 leading-relaxed animate-slideInFromLeft delay-200">
                                        {subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slideInFromBottom">
                                <p className="text-white/90 leading-relaxed">
                                    <span className="font-semibold">Remisio</span> - cyfrowa platforma zdrowotna wspierająca pacjentów z chorobami IBD.
                                    Ten dokument określa zasady prawne korzystania z naszej aplikacji.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Table of Contents */}
                    <aside className="lg:w-80 order-last lg:order-first">
                        <div className="lg:sticky lg:top-32">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="bg-gradient-to-r from-primary-accent to-primary text-white p-4 sm:p-6">
                                    <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                                        📋 {t(`${translationKey}.tableOfContents`, 'Spis treści')}
                                    </h2>
                                </div>
                                <nav className="p-4 sm:p-6 max-h-[50vh] lg:max-h-[calc(100vh-250px)] overflow-y-auto">
                                    <ul className="space-y-1">
                                        {toc.map(({ id, text, level }) => (
                                            <li key={id}>
                                                <a
                                                    href={`#${id}`}
                                                    className={`
                                                        block py-2 px-3 rounded-lg text-sm transition-all duration-200
                                                        hover:bg-primary-accent/10 hover:text-primary-accent hover:scale-105
                                                        ${level === 1 ? 'font-semibold text-primary-accent border-l-2 border-primary-accent pl-4' :
                                                            level === 2 ? 'ml-2 sm:ml-3 text-gray-700 hover:pl-5' : 'ml-4 sm:ml-6 text-gray-600 hover:pl-7'}
                                                    `}
                                                >
                                                    {text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="flex-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-6 sm:p-8 lg:p-12">
                                <div className="prose prose-sm sm:prose-lg max-w-none">
                                    {jsx}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 bg-gradient-to-r from-primary-accent/10 via-primary/10 to-primary-accent/10 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                <div className="text-4xl mb-4 animate-bounce">📞</div>
                                <h3 className="text-xl font-bold text-primary-accent mb-2">Masz pytania?</h3>
                                <p className="text-gray-700 mb-6">
                                    Skontaktuj się z nami w sprawie tego dokumentu lub aplikacji Remisio.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Button
                                        onClick={() => window.location.href = 'mailto:kontakt@remisio.pl'}
                                        className="bg-primary-accent hover:bg-primary-accent/90 text-white transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full"
                                    >
                                        📧 kontakt@remisio.pl
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/')}
                                        className="border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white bg-transparent transition-all duration-300 hover:scale-105 px-6 py-3 rounded-full"
                                    >
                                        🏠 Strona główna
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
};
