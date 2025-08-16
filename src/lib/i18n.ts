import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from '@/locales/en/index.ts';
import translationPl from '@/locales/pl/index.ts';

type TranslationModule = {
  default: Record<string, unknown>;
};

type FeatureFiles = Record<string, TranslationModule>;

// Load all feature translations eagerly
const enFeatureFiles = import.meta.glob('@/features/*/i18n/en.ts', {
  eager: true,
}) as FeatureFiles;

const plFeatureFiles = import.meta.glob('@/features/*/i18n/pl.ts', {
  eager: true,
}) as FeatureFiles;

// Extract feature translations
const extractFeatureTranslations = (
  files: FeatureFiles,
  lang: string,
): Record<string, Record<string, unknown>> => {
  const translations: Record<string, Record<string, unknown>> = {};

  Object.entries(files).forEach(([path, module]) => {
    const match = path.match(/\/features\/([^/]+)\/i18n\/[^/]+\.ts$/);
    if (match && module.default) {
      const featureName = match[1];
      translations[featureName] = module.default;
      console.log(`Loaded ${lang} translations for feature: ${featureName}`);
    }
  });

  return translations;
};

const featureTranslationsEn = extractFeatureTranslations(enFeatureFiles, 'en');
const featureTranslationsPl = extractFeatureTranslations(plFeatureFiles, 'pl');

const resources = {
  en: {
    translation: translationEn,
    ...featureTranslationsEn,
  },
  pl: {
    translation: translationPl,
    ...featureTranslationsPl,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
