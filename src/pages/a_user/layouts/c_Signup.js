import React from 'react';
import { connect } from 'dva';

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class Signup extends React.PureComponent {
  render() {
    return <div>用户Signup页面</div>;
  }
}

export default Signup;
