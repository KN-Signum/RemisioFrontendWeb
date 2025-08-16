import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/lib/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { API_MOCKING } from '@/config/constants';
import { Notifications } from '@/components/ui/notifications';

// Only load MSWWrapper if mocks are enabled
const MSWWrapper = API_MOCKING
  ? lazy(() =>
      import('@/lib/msw').then((module) => ({ default: module.MSWWrapper })),
    )
  : null;

// Conditionally render ReactQueryDevtools only in development
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      })),
    )
  : null;

const App = () => {
  useEffect(() => {
    // Initialize MSW
    if (API_MOCKING) {
      import('@/testing/mocks/setup/initialize').then((module) => {
        module.default();
      });
    }
  }, []);

  const pageContent = (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );

  const devtools =
    import.meta.env.DEV && ReactQueryDevtools ? (
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    ) : null;

  const content = (
    <QueryClientProvider client={queryClient}>
      {devtools}
      <Notifications />
      {pageContent}
    </QueryClientProvider>
  );

  if (API_MOCKING && MSWWrapper) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MSWWrapper>{content}</MSWWrapper>
      </Suspense>
    );
  }

  return content;
};

export default App;
