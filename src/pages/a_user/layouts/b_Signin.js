import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Modal } from 'antd';
import { Link, routerRedux } from 'dva/router';
import './b_signin.less';

const {
  electron: { ipcRenderer },
} = window;

const FormItem = Form.Item;

@Form.create()
@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class Signin extends React.PureComponent {
  submitLogin = () => {
    const {
      form: { validateFields, resetFields },
    } = this.props;
    validateFields((err, values) => {
      if (err) return;
      const ret = ipcRenderer.sendSync('signin', values);
      const { msg, ok, data } = ret;
      if (ok) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/update',
          payload: { currentUser: data },
        });
        dispatch(routerRedux.replace({ pathname: '/user/mine' }));
      } else {
        Modal.error({
          title: '',
          content: msg,
          centered: true,
          onOk: () => {
            resetFields();
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className="ra-user-sigin">
        <h3>登录</h3>
        <div>
          <Form>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入账号', whitespace: true }],
              })(<Input placeholder="账号" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码', whitespace: true }],
              })(<Input placeholder="密码" type="password" />)}
            </FormItem>
            <FormItem>
              <div className="ra-user-action">
                <Link to="/user/signup">没有账号？</Link>
                <Link to="/user/signup">忘记密码？</Link>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.submitLogin}>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signin;
