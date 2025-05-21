import { IS_DEVELOPMENT } from '@/config/constants';
import { seedDb } from './seed-db';

const initializeMocks = async () => {
  if (IS_DEVELOPMENT) {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  seedDb();
};

initializeMocks();
