import React, { JSX, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function parseInline(text: string): (string | JSX.Element)[] {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) =>
        idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
    );
}

type TocItem = { id: string; text: string; level: number };

const slug = (str: string) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9ąćęłńóśźż\- ]/g, '')
        .replace(/\s+/g, '-');

function parsePolicy(src: string): { jsx: JSX.Element[]; toc: TocItem[] } {
    const lines = src.split('\n');
    const out: JSX.Element[] = [];
    const toc: TocItem[] = [];
    let list: string[] = [];

    const flushList = (key: string) => {
        if (!list.length) return;
        out.push(
            <ul key={key} className="list-disc pl-6 space-y-1">
                {list.map((li, i) => (
                    <li key={i}>{parseInline(li)}</li>
                ))}
            </ul>
        );
        list = [];
    };

    lines.forEach((raw, idx) => {
        const line = raw.trim();
        if (line.startsWith('- ')) {
            list.push(line.slice(2));
            return;
        }
        flushList(`list-${idx}`);

        if (/^#{1,3}\s/.test(line)) {
            const level = line.match(/^#+/)![0].length;
            const text = line.replace(/^#{1,3}\s/, '').trim();
            const id = slug(text);
            if (level <= 2) toc.push({ id, text, level });

            const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
            const headingCls =
                level === 1
                    ? 'text-3xl font-bold mt-10 mb-5'
                    : level === 2
                        ? 'text-2xl font-semibold mt-8 mb-4'
                        : 'text-xl font-medium mt-6 mb-3';

            out.push(
                <Tag id={id} key={idx} className={headingCls}>
                    {parseInline(text)}
                </Tag>
            );
        } else if (line) {
            out.push(
                <p key={idx} className="leading-relaxed">
                    {parseInline(line)}
                </p>
            );
        }
    });

    flushList('list-final');
    return { jsx: out, toc };
}

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useTranslation();
    const raw = t('privacyPolicy.full');

    const { jsx, toc } = useMemo(() => parsePolicy(raw), [raw]);

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* HERO */}
            <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-14">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl font-extrabold flex items-center gap-3">
                        <span className="text-5xl">🛡️</span>
                        <span>{t('privacyPolicy.title', 'Polityka prywatności')}</span>
                    </h1>
                    <p className="mt-2 opacity-90 max-w-2xl">
                        {t(
                            'privacyPolicy.subtitle',
                            'Dowiedz się, jak gromadzimy i przetwarzamy Twoje dane osobowe.'
                        )}
                    </p>
                </div>
            </header>


            <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">

                <aside className="lg:w-64 order-last lg:order-first">
                    <nav className="sticky top-28 bg-white shadow-sm rounded-lg p-6 lg:max-h-[80vh] overflow-y-auto">
                        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-500">
                            {t('privacyPolicy.tableOfContents', 'Spis treści')}
                        </h2>
                        <ul className="space-y-2">
                            {toc.map(({ id, text, level }) => (
                                <li key={id} className={level === 1 ? 'pl-0' : 'pl-4'}>
                                    <a
                                        href={`#${id}`}
                                        className="text-gray-700 hover:text-indigo-600 transition-colors duration-150"
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* POLICY CARD */}
                <article className="flex-1">
                    <div className="bg-white shadow-lg rounded-xl px-8 py-10 prose prose-indigo max-w-none">
                        {jsx}
                    </div>
                </article>
            </section>
        </main>
    );
};

export default PrivacyPolicyPage;
