import dynamic from 'dva/dynamic';
import dva from 'dva';

const UserPageComponent = dynamic({
  app: dva({}),
  models: () => [import('../models/users')],
  component: () => import('../pages/UserPage'),
});

export { UserPageComponent };
