import { Button, Form, Icon, Input, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

import { Me } from '@store/type/Me';
import { GraphQLError } from 'graphql';

const style = require('./LoginView.m.less');

interface LoginViewProps {
  closeLoginModal: MutationFn<null>;
  login: MutationFn<Me, OperationVariables>;
  form: WrappedFormUtils;
}

interface LoginViewState {
  loading: boolean;
  errorMsgs: string[];
}

class LoginView extends React.Component<LoginViewProps, LoginViewState> {
  state: LoginViewState = {
    loading: false,
    errorMsgs: [],
  };

  private handleCancel = () => {
    const { closeLoginModal } = this.props;
    closeLoginModal();
  }

  private handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.login({ variables:  values })
          .then(() => {
            this.handleCancel();
          })
          .catch((error) => {
            const errorMsgs: string[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
              });
            }
            this.setState({ errorMsgs });
            this.props.form.setFields({
              username: {
                value: values.username,
                errors: [new Error('')],
              },
              password: {
                value: values.password,
                errors: [new Error('')],
              },
            });
          });
      }
    });
  }

  private handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  private handleForgot = () => {

  }

  private handleSignup = () => {

  }

  public render() {
    const { loading, errorMsgs } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        className={style.root}
        title="Login"
        visible={true}
        width={300}
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="login" type="primary" loading={loading} onClick={this.handleSubmit}>
            Login
          </Button>,
        ]}
      >
        {!!errorMsgs.length && (
          <div>
            {errorMsgs.map((message, i) => {
              return <p key={i}>{message}</p>;
            })}
          </div>
        )}
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please enter your username' }],
            })(
              <Input
                placeholder="Username or Email Address"
                prefix={<Icon type="user" />}
                onKeyDown={this.handleKeyDown}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter your password' }],
            })(
              <Input
                placeholder="Password"
                prefix={<Icon type="lock" />}
                type="password"
                onKeyDown={this.handleKeyDown}
              />,
            )}
          </Form.Item>
          <p><a onClick={this.handleForgot}>Forgot your password?</a></p>
          <p>Don't have an account?<br /><a onClick={this.handleSignup}>Signup now!</a></p>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'login' })(LoginView);
