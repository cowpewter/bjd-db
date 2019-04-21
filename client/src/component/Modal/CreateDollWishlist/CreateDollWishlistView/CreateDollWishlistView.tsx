import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import { DollWishlist } from '@store/type/DollWishlist';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface CreateDollWishlistViewProps {
  closeModal: MutationFn<null>;
  createWishlist: MutationFn<DollWishlist>;
  form: WrappedFormUtils;
}

interface CreateDollWishlistViewState {
  loading: boolean;
  errorMsgs: string[];
}

class CreateDollWishlistView
  extends Component<CreateDollWishlistViewProps, CreateDollWishlistViewState> {

  state: CreateDollWishlistViewState = {
    loading: false,
    errorMsgs: [],
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.createWishlist({ variables:  values })
          .then(() => {
            this.handleCancel();
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

  private handleCancel = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  public render() {
    const { loading, errorMsgs } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Create New Wishlist"
        visible={true}
        width={300}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" loading={loading} onClick={this.handleSubmit}>
            Create
          </Button>,
        ]}
      >
        <Errors errors={errorMsgs} />

        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please choose a name for your wishlist' }],
            })(
              <Input
                placeholder="My Wishlist"
                prefix={<FaIcon className={sharedStyle.icon} type="light" icon="clipboard-list" />}
                onKeyDown={this.handleKeyDown}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isPrivate')(
              <Checkbox>
                Make this wishlist private?
                <span className={sharedStyle.subtitle}>
                  (others will not see it on your profile)
                </span>
              </Checkbox>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'createDollWishlist' })(CreateDollWishlistView);
