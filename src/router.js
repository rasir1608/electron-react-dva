import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { UserPageComponent } from './common/routers';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
dynamic.setDefaultLoadingComponent(() => <Spin size="large" className={styles.globalSpin} />);

function RouterConfig({ history, app }) {
  console.log(app, UserPageComponent);
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            key="/"
            path="/"
            component={UserPageComponent.component}
            exact={UserPageComponent.exact}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
