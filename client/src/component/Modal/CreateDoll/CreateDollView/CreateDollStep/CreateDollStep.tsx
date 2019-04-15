import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import ProfileImageUploader from '@component/shared/ProfileImageUploader';
import WishlistSelector from '@component/shared/WishlistSelector';
import { Doll } from '@store/type/Doll';
import { Button, Checkbox, Input, Modal, Select } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, Fragment, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface CreateDollStepProps {
  nextStep: () => void;
  closeModal: MutationFn<null>;
  createDoll: MutationFn<Doll>;
  form: WrappedFormUtils;
}

interface CreateDollStepState {
  isWishlist: boolean;
  errorMsgs: string[];
  loading: boolean;
}

class CreateDollStep extends Component<CreateDollStepProps, CreateDollStepState> {
  state: CreateDollStepState = {
    isWishlist: false,
    errorMsgs: [],
    loading: false,
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      console.warn(values);
      if (!err) {
        const data = {
          name: values.name,
          isPrivate: !!values.isPrivate,
          isWishlist: !!values.isWishlist,
          allowComments: !!values.allowComments,
          sex: values.sex === 'none' ? undefined : values.sex,
          gender: values.gender === 'none' ? undefined : values.gender,
          profileImageId: values.profileImageId,
          wishlistId: values.wishlistId,
        };
        this.props.createDoll({ variables: { data } })
          .then(() => {
            this.props.nextStep();
          })
          .catch((error) => {
            const errorMsgs: string[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(error.message);
                }
              });
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
            }
            this.setState({ errorMsgs });
          });
      }
    });
  }

  private handleCancel = () => {
    this.props.closeModal();
  }

  private handleWishlistChange = (ev: any) => {
    console.warn('isWishlist change', ev);
    this.setState({ isWishlist: ev.target && ev.target.checked });
  }

  public render() {
    const { loading, errorMsgs, isWishlist } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Create Doll"
        visible={true}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" loading={loading} onClick={this.handleSubmit}>
            Next
          </Button>,
        ]}
      >
        <Errors errors={errorMsgs} />

        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: "Please enter your doll's name" }],
            })(
              <Input
                placeholder="Name"
                prefix={<FaIcon className={sharedStyle.icon} type="light" icon="user" />}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('sex')(
              <Fragment>
                <label>Sex</label>
                <Select>
                  <Select.Option value="none" key="none">I'd rather not say</Select.Option>
                  <Select.Option value="Male" key="Male">Male</Select.Option>
                  <Select.Option value="Female" key="Female">Female</Select.Option>
                  <Select.Option value="Intersex" key="Intersex">Intersex</Select.Option>
                </Select>
              </Fragment>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('gender')(
              <Fragment>
                <label>Gender</label>
                <Select>
                  <Select.Option value="none" key="none">I'd rather not say</Select.Option>
                  <Select.Option value="Masculine" key="Masculine">Male</Select.Option>
                  <Select.Option value="Feminine" key="Feminine">Female</Select.Option>
                  <Select.Option value="Nonbinary" key="Nonbinary">Nonbinary</Select.Option>
                  <Select.Option value="Agender" key="Agender">Agender</Select.Option>
                </Select>
              </Fragment>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('profileImageId')(
              <Fragment>
                <label>Upload Profile Image?</label>
                <ProfileImageUploader />
              </Fragment>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isPrivate')(
              <Checkbox>
                Make this doll private? (Others will not see it on your profile)
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('allowComments')(
              <Checkbox>
                Allow others to leave comments on your doll?
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isWishlist')(
              <Checkbox onChange={this.handleWishlistChange}>
                Add this doll to a wishlist? (Choose this if you do not own the doll yet)
              </Checkbox>,
            )}
          </Form.Item>
          {isWishlist && (
            <Form.Item>
              {getFieldDecorator('wishlistId')(
                <WishlistSelector />,
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'createDollStep' })(CreateDollStep);
