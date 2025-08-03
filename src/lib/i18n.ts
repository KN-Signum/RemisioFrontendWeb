import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from '@/locales/en/index.ts';
import translationPl from '@/locales/pl/index.ts';

// Track loaded features to avoid duplicate loading
const loadedFeatures = new Set<string>();

// Function to load feature translations dynamically
export const loadFeatureTranslations = async (featureName: string) => {
  if (loadedFeatures.has(featureName)) {
    return; // Already loaded
  }

  try {
    const [enModule, plModule] = await Promise.all([
      import(`@/features/${featureName}/i18n/en.ts`).catch(() => null),
      import(`@/features/${featureName}/i18n/pl.ts`).catch(() => null),
    ]);

    if (enModule?.default) {
      i18n.addResourceBundle('en', featureName, enModule.default, true, true);
    }

    if (plModule?.default) {
      i18n.addResourceBundle('pl', featureName, plModule.default, true, true);
    }

    loadedFeatures.add(featureName);
    console.log(`Loaded translations for feature: ${featureName}`);
  } catch (error) {
    console.warn(
      `Failed to load translations for feature: ${featureName}`,
      error,
    );
  }
};

// Map routes to features for auto-loading
const ROUTE_FEATURE_MAP: Record<string, string[]> = {
  '/patients/:id': [
    'patients',
    'surveys',
    'symptoms',
    'diagnostic_tests',
    'drugs',
  ],
  '/patients': ['patients'],
  '/dashboard': ['patients'],
  '/calendar': ['visits'],
};

export const loadTranslationsForRoute = (pathname: string) => {
  // Check for more specific routes first (order matters)
  const sortedRoutes = Object.entries(ROUTE_FEATURE_MAP).sort(([a], [b]) => {
    // Sort by specificity (more specific routes first)
    return b.split('/').length - a.split('/').length;
  });

  const matchedFeatures = sortedRoutes.find(([route]) => {
    // Handle dynamic routes with :id
    const routePattern = route.replace(/:id/g, '[^/]+');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(pathname);
  })?.[1];

  if (matchedFeatures) {
    matchedFeatures.forEach((feature) => {
      loadFeatureTranslations(feature);
    });
  }
};

const resources = {
  en: {
    translation: translationEn,
  },
  pl: {
    translation: translationPl,
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
