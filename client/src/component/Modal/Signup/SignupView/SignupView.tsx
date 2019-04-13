import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import { Button, Form, Input, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

import { Me } from '@store/type/Me';
import { GraphQLError } from 'graphql';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface SignupViewProps {
  closeSignupModal: MutationFn<null>;
  openLoginModal: MutationFn<null>;
  signup: MutationFn<Me, OperationVariables>;
  form: WrappedFormUtils;
}

interface SignupViewState {
  loading: boolean;
  success: boolean;
  errorMsgs: string[];
}

class SignupView extends Component<SignupViewProps, SignupViewState> {
  state: SignupViewState = {
    loading: false,
    success: false,
    errorMsgs: [],
  };

  private handleCancel = () => {
    const { closeSignupModal } = this.props;
    closeSignupModal();
  }

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.signup({ variables:  values })
          .then(() => {
            this.setState({ success: true });
          })
          .catch((error) => {
            const errorMsgs: string[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
                if (error.extensions) {
                  const { validationErrors } = error.extensions.exception;
                  const fieldData: any = {};
                  Object.keys(validationErrors).forEach((fieldName) => {
                    fieldData[fieldName] = {
                      errors: [new Error(validationErrors[fieldName])],
                      value: values[fieldName],
                    };
                  });
                  this.props.form.setFields(fieldData);
                }
              });
            }
            this.setState({ errorMsgs });
          });
      }
    });
  }

  private validateEmail = (_: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('Please enter your email address'));
    }
    const validEmail = /^.+@.+\..+$/;
    if (validEmail.test(value)) {
      callback();
    } else {
      callback(new Error('Please enter a valid email address'));
    }
  }

  private validateConfirmPw = (_: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('Please confirm your password'));
    }
    const { getFieldValue } = this.props.form;
    if (value !== getFieldValue('password')) {
      callback(new Error("Passwords don't match!"));
    } else {
      callback();
    }
  }

  private handleLogin = () => {
    this.handleCancel();
    this.props.openLoginModal();
  }

  private handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  public render() {
    const { loading, success, errorMsgs } = this.state;
    const { getFieldDecorator } = this.props.form;

    const footer = success
    ? [
      <Button key="okay" type="primary" onClick={this.handleCancel}>
          OK
      </Button>,
    ]
    : [
      <Button key="cancel" onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button key="signup" type="primary" loading={loading} onClick={this.handleSubmit}>
        Signup
      </Button>,
    ];

    return (
      <Modal
        title="Create Account"
        visible={true}
        width={success ? 500 : 300}
        onCancel={this.handleCancel}
        footer={footer}
      >
        <Errors errors={errorMsgs} />

        {success && (
          <div>
            <h2>Welcome to BJD-db.com!</h2>
            <p>
              You should be receiving a confirmation email shortly.
              Please click on the link within the email to complete signup.
            </p>
          </div>
        )}

        {!success && (
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please enter your username' }],
              })(
                <Input
                  name="username"
                  placeholder="Username"
                  prefix={<FaIcon className={sharedStyle.icon} type="light" icon="user" />}
                  onKeyDown={this.handleKeyDown}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('emailAddress', {
                rules: [{ validator: this.validateEmail }],
              })(
                <Input
                  placeholder="Email Address"
                  prefix={<FaIcon className={sharedStyle.icon} type="light" icon="at" />}
                  onKeyDown={this.handleKeyDown}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please choose a password' }],
              })(
                <Input
                  placeholder="Password"
                  prefix={<FaIcon className={sharedStyle.icon} type="light" icon="key" />}
                  type="password"
                  onKeyDown={this.handleKeyDown}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirmPassword', {
                rules: [{ validator: this.validateConfirmPw }],
              })(
                <Input
                  placeholder="Confirm Password"
                  prefix={<FaIcon className={sharedStyle.icon} type="light" icon="check" />}
                  type="password"
                  onKeyDown={this.handleKeyDown}
                />,
              )}
            </Form.Item>
            <p>Already have an account?<br /><a onClick={this.handleLogin}>Login now!</a></p>
          </Form>
        )}
      </Modal>
    );
  }
}

export default Form.create({ name: 'signup' })(SignupView);
