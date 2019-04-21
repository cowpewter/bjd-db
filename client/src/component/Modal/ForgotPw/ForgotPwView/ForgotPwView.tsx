import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import { Button, Form, Input, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { Component, Fragment, SyntheticEvent } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

import { GraphQLError } from 'graphql';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface ForgotPwViewProps {
  closeForgotPwModal: MutationFn<null>;
  initiatePwReset: MutationFn<any, OperationVariables>;
  form: WrappedFormUtils;
}

interface ForgotPwViewState {
  loading: boolean;
  success: boolean;
  errorMsgs: string[];
}

class ForgotPwView extends Component<ForgotPwViewProps, ForgotPwViewState> {
  state: ForgotPwViewState = {
    loading: false,
    success: false,
    errorMsgs: [],
  };

  private handleCancel = () => {
    const { closeForgotPwModal } = this.props;
    closeForgotPwModal();
  }

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.initiatePwReset({ variables:  values })
          .then(() => {
            this.setState({ success: true });
          })
          .catch((errors) => {
            const errorMsgs: string[] = [];
            if (errors.graphQLErrors) {
              errors.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
                if (error.extensions) {
                  const { validationErrors } = error.extensions.exception;
                  const fieldData: any = {};
                  if (validationErrors) {
                    Object.keys(validationErrors).forEach((fieldName) => {
                      fieldData[fieldName] = {
                        errors: [new Error(validationErrors[fieldName])],
                        value: values[fieldName],
                      };
                    });
                  }
                  this.props.form.setFields(fieldData);
                }
              });
            }
            this.setState({ errorMsgs });
          });
      }
    });
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
      <Button key="okay" type="primary" loading={loading} onClick={this.handleCancel}>
        OK
      </Button>,
    ]
    : [
      <Button key="cancel" onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
        Submit
      </Button>,
    ];

    return (
      <Modal
        title="Reset Password"
        visible={true}
        width={300}
        onCancel={this.handleCancel}
        footer={footer}
        destroyOnClose={true}
      >
        {success && (
          <p>An email has been sent to the email address on file.</p>
        )}
        {!success && (
          <Fragment>
            <p>
              Enter your username or email address,
              and we'll send you an email with a link to
              reset your password.
            </p>

            <Errors errors={errorMsgs} />

            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: 'Please enter your username or email address',
                  }],
                })(
                  <Input
                    placeholder="Username or Email Address"
                    prefix={<FaIcon className={sharedStyle.icon} type="light" icon="user" />}
                    onKeyDown={this.handleKeyDown}
                  />,
                )}
              </Form.Item>
            </Form>
          </Fragment>
        )}
      </Modal>
    );
  }
}

export default Form.create({ name: 'forgotPw' })(ForgotPwView);
