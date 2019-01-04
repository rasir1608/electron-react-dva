import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { getRoutes } from '@/utils/utils';

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class BasicLayout extends React.PureComponent {
  getRouteList = () => {
    const { routerData } = this.props;
    return getRoutes('/user', routerData);
  };

  getRedirectRouter = () => {
    const { currentUser } = this.props;
    if (currentUser && currentUser.name) return '/user/mine';
    return '/user/signin';
  };

  render() {
    const routeList = this.getRouteList();
    const redirectRouter = this.getRedirectRouter();
    return (
      <div>
        用户页面1
        <Switch>
          {routeList.map(item => (
            <Route key={item.path} path={item.path} component={item.component} exact />
          ))}
          <Redirect key="/user" exact from="/user" to={redirectRouter} />
        </Switch>
      </div>
    );
  }
}

export default BasicLayout;
