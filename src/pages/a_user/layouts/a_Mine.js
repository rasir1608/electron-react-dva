import React from 'react';
import { connect } from 'dva';

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class Mine extends React.PureComponent {
  render() {
    return <div>用户Mine页面</div>;
  }
}

export default Mine;
