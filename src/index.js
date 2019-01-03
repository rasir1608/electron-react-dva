import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import { Router, Route } from 'dva/router';
import './index.less';
import { UserPageComponent } from './common/routers';

// 1. Initialize
const app = dva({
  history: createHistory(),
});
// 2. Plugins
app.use(createLoading());

// 4. Router
// app.router(require('./router').default);
app.router(({ history, app }) => (
  <Router history={history}>
    <Route path="/" component={UserPageComponent} />
  </Router>
));

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
