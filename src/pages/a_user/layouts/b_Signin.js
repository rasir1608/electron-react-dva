import React from 'react';
import { connect } from 'dva';

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class Signin extends React.PureComponent {
  render() {
    return <div>用户Signin页面</div>;
  }
}

export default Signin;
