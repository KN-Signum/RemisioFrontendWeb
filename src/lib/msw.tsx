import { MSWDevTools } from 'msw-devtools';
import { ReactNode } from 'react';
import { ENABLE_MSW_DEVTOOLS } from '@/config/constants';
import { db, handlers } from '@/testing/mocks';
export type MSWWrapperProps = {
  children: ReactNode;
};
await import('@/testing/mocks/setup/initialize');
export const MSWWrapper = ({ children }: MSWWrapperProps) => {
  return (
    <>
      {ENABLE_MSW_DEVTOOLS && <MSWDevTools db={db} handlers={handlers} />}
      {children}
    </>
  );
};
