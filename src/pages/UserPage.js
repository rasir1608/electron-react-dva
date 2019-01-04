import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';

@connect(() => ({}))
class UserLayout extends React.PureComponent {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <DocumentTitle title="用户信息">
        <div>用户信息页面{id}</div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
