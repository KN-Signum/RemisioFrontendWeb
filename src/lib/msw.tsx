import { ReactNode, lazy, Suspense } from 'react';
import { ENABLE_MSW_DEVTOOLS } from '@/config/constants';
import { db, handlers } from '@/testing/mocks';

// Lazy load MSWDevTools only when needed
const MSWDevTools = ENABLE_MSW_DEVTOOLS
  ? lazy(() =>
      import('msw-devtools').then((module) => ({
        default: module.MSWDevTools,
      })),
    )
  : null;

export type MSWWrapperProps = {
  children: ReactNode;
};

await import('@/testing/mocks/setup/initialize');

export const MSWWrapper = ({ children }: MSWWrapperProps) => {
  return (
    <>
      {ENABLE_MSW_DEVTOOLS && MSWDevTools && (
        <Suspense fallback={null}>
          <MSWDevTools db={db} handlers={handlers} />
        </Suspense>
      )}
      {children}
    </>
  );
};
