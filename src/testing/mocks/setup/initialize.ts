import { API_MOCKING } from '@/config/constants';
import { seedDb } from './seed-db';

const initializeMocks = async () => {
  if (API_MOCKING) {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          // This ensures the service worker is properly registered
          scope: '/',
        },
      },
    });
  }
  seedDb();
};

export default initializeMocks;
