import commonPL from './common';
import generalPL from './general';
import layoutPL from './layout';
import pagesPL from './pages';

const plResources = {
  common: commonPL,
  general: generalPL,
  layout: layoutPL,
  pages: pagesPL,
} as const;

export default plResources;
