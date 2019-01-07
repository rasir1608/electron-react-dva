import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { getRoutes } from '@/utils/utils';

const { electron } = window;

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class BasicLayout extends React.PureComponent {
  state = {
    cpuList: [],
  };

  getRouteList = () => {
    const { routerData } = this.props;
    return getRoutes('/user', routerData);
  };

  getRedirectRouter = () => {
    const { currentUser } = this.props;
    if (currentUser && currentUser.name) return '/user/mine';
    return '/user/signin';
  };

  clickBtn = () => {
    const { ipcRenderer } = electron;
    ipcRenderer.once('born', (event, cpuList = []) => {
      console.log(cpuList, 'born'); // 输出 "harttle born"
      this.setState({ cpuList });
    });
    ipcRenderer.send('create', 'snowtest');
    console.log('snow', '112111');
  };

  render() {
    const routeList = this.getRouteList();
    const redirectRouter = this.getRedirectRouter();
    const { cpuList } = this.state;
    return (
      <div>
        用户页面1
        <button type="button" onClick={this.clickBtn}>
          点击
        </button>
        <ul>
          {cpuList.map((cpu, ci) => (
            <li key={`${ci + 1}`}>
              {Object.keys(cpu).map((key, ki) => (
                <p key={`${ci + 1}_${ki + 1}`}>
                  {key}:{cpu[key].toString()}
                </p>
              ))}
            </li>
          ))}
        </ul>
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
