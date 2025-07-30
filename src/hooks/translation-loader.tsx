import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { loadTranslationsForRoute } from '@/lib/i18n';

export default function TranslationLoader() {
  const location = useLocation();

  useEffect(() => {
    loadTranslationsForRoute(location.pathname);
  }, [location.pathname]);

  return <Outlet />;
}
