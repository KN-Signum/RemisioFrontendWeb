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
}

function parseContent(raw: string): {
  jsx: React.ReactElement[];
  toc: TocItem[];
} {
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
        const prevTag =
          idx > 0 ? text.split(/<(\/?(?:strong|em))>/)[idx - 1] : null;
        if (prevTag === 'strong')
          return (
            <strong key={idx} className="text-primary-accent font-semibold">
              {part}
            </strong>
          );
        if (prevTag === 'em')
          return (
            <em key={idx} className="italic">
              {part}
            </em>
          );
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
        <h1
          id={id}
          key={idx}
          className="text-primary-accent border-primary-accent/20 mt-12 mb-6 border-b pb-3 text-3xl font-bold first:mt-0"
        >
          {parseInline(text)}
        </h1>,
      );
    } else if (line.startsWith('## ')) {
      const text = line.substring(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc.push({ id, text, level: 2 });
      out.push(
        <h2
          id={id}
          key={idx}
          className="text-primary-accent mt-10 mb-4 text-2xl font-semibold"
        >
          {parseInline(text)}
        </h2>,
      );
    } else if (line.startsWith('### ')) {
      const text = line.substring(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      toc.push({ id, text, level: 3 });
      out.push(
        <h3
          id={id}
          key={idx}
          className="text-primary-accent mt-8 mb-3 text-xl font-medium"
        >
          {parseInline(text)}
        </h3>,
      );
    } else if (line.startsWith('- ')) {
      out.push(
        <li
          key={idx}
          className="mb-2 ml-6 list-disc leading-relaxed text-gray-700"
        >
          {parseInline(line.substring(2))}
        </li>,
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      out.push(
        <p key={idx} className="text-primary-accent mt-6 mb-3 font-semibold">
          {parseInline(line)}
        </p>,
      );
    } else if (line.includes('---')) {
      out.push(<hr key={idx} className="my-16 border-gray-200" />);
    } else if (line) {
      out.push(
        <p key={idx} className="mb-4 leading-relaxed text-gray-700">
          {parseInline(line)}
        </p>,
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
}) => {
  const { t } = useTranslation('', { keyPrefix: 'layout.legal' });
  const navigate = useNavigate();
  const { jsx, toc } = useMemo(() => parseContent(content), [content]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="from-background to-background min-h-screen bg-gradient-to-br via-gray-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Remisio logo"
                className="h-8 w-8 transition-transform hover:scale-110"
              />
              <span className="text-primary-accent text-xl font-semibold">
                Remisio
              </span>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="border-primary-accent text-primary-accent hover:bg-primary-accent rounded-full border bg-transparent px-6 py-2 transition-all duration-300 hover:scale-105 hover:text-white"
            >
              ← {t('back') || 'Back'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="from-primary via-primary-accent to-primary relative bg-gradient-to-r py-16 text-white lg:py-24">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-white blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-24 w-24 animate-pulse rounded-full bg-white blur-3xl delay-1000"></div>
          </div>
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="animate-fadeIn max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="text-6xl lg:text-7xl">{icon}</div>
                <div>
                  <h1 className="animate-slideInFromLeft text-4xl leading-tight font-extrabold lg:text-5xl">
                    {title}
                  </h1>
                  <p className="animate-slideInFromLeft mt-3 text-xl leading-relaxed text-white/90 delay-200">
                    {subtitle}
                  </p>
                </div>
              </div>
              <div className="animate-slideInFromBottom rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <p className="leading-relaxed text-white/90">
                  <span className="font-semibold">Remisio</span> {t('main')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Table of Contents */}
          <aside className="order-last lg:order-first lg:w-80">
            <div className="lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="from-primary-accent to-primary bg-gradient-to-r p-4 text-white sm:p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold sm:text-lg">
                    📋 {t(`tableOfContents`, 'Table of Contents')}
                  </h2>
                </div>
                <nav className="max-h-[50vh] overflow-y-auto p-4 sm:p-6 lg:max-h-[calc(100vh-250px)]">
                  <ul className="space-y-1">
                    {toc.map(({ id, text, level }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={`hover:bg-primary-accent/10 hover:text-primary-accent block rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:scale-105 ${
                            level === 1
                              ? 'text-primary-accent border-primary-accent border-l-2 pl-4 font-semibold'
                              : level === 2
                                ? 'ml-2 text-gray-700 hover:pl-5 sm:ml-3'
                                : 'ml-4 text-gray-600 hover:pl-7 sm:ml-6'
                          } `}
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
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="prose prose-sm sm:prose-lg max-w-none">
                  {jsx}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="from-primary-accent/10 via-primary/10 to-primary-accent/10 mt-12 rounded-2xl bg-gradient-to-r p-8 transition-shadow duration-300 hover:shadow-lg">
              <div className="text-center">
                <div className="mb-4 animate-bounce text-4xl">📞</div>
                <h3 className="text-primary-accent mb-2 text-xl font-bold">
                  {t('questions', 'Any questions?')}
                </h3>
                <p className="mb-6 text-gray-700">
                  {t(
                    'contactUs',
                    'Contact us regarding this document or the Remisio application.',
                  )}
                </p>
                <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                  <Button
                    onClick={() =>
                      (window.location.href = 'mailto:kontakt@remisio.pl')
                    }
                    className="bg-primary-accent hover:bg-primary-accent/90 rounded-full px-6 py-3 text-white transition-all duration-300 hover:scale-105"
                  >
                    📧 kontakt@remisio.pl
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    className="border-primary-accent text-primary-accent hover:bg-primary-accent rounded-full border bg-transparent px-6 py-3 transition-all duration-300 hover:scale-105 hover:text-white"
                  >
                    🏠 {t('mainPage', 'Main Page')}
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
