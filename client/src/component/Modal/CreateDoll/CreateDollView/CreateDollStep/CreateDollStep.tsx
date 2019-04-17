import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import ProfileImageUploader from '@component/shared/ProfileImageUploader';
import WishlistSelector from '@component/shared/WishlistSelector';
import { CreateDollResponse } from '@store/query/CreateDoll';
import { Button, Checkbox, Input, Modal, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');
const style = require('./CreateDollStep.m.less');

interface CreateDollStepProps {
  nextStep: (dollId: string) => void;
  closeModal: MutationFn<null>;
  createDoll: MutationFn<CreateDollResponse>;
  form: WrappedFormUtils;
}

interface CreateDollStepState {
  isWishlist: boolean;
  isPrivate: boolean;
  errorMsgs: string[];
  loading: boolean;
}

const handleFieldsChange = ({ form }: any, changedValue: any) => {
  if (changedValue.isPrivate && changedValue.isPrivate.value) {
    form.setFieldsValue({ allowComments: false });
  }
};

class CreateDollStep extends Component<CreateDollStepProps, CreateDollStepState> {
  state: CreateDollStepState = {
    isWishlist: false,
    isPrivate: false,
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
          wishlistId: values.wishlist ? values.wishlist.id : undefined,
          wishlistName: values.wishlist ? values.wishlist.name : undefined,
          wishlistIsPrivate: values.wishlist ? values.wishlist.isPrivate : undefined,
        };
        this.props.createDoll({ variables: { data } })
          .then((resp) => {
            console.warn(resp);
            if (!resp || !resp.data) {
              const errors = ['An unexpected error has occured.'];
              this.setState({ errorMsgs: errors });
              return;
            }
            const dollId = resp.data.createDoll.id;
            this.props.nextStep(dollId);
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

  private handlePrivacyChange = (ev: CheckboxChangeEvent) => {
    this.setState({ isPrivate: ev.target && ev.target.checked });
  }

  private handleWishlistChange = (ev: CheckboxChangeEvent) => {
    this.setState({ isWishlist: ev.target && ev.target.checked });
  }

  public render() {
    const { loading, errorMsgs, isWishlist, isPrivate } = this.state;
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
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: "Please enter your doll's name" }],
            })(
              <Input
                placeholder="Enter your doll's name"
                prefix={<FaIcon className={sharedStyle.icon} type="light" icon="user" />}
              />,
            )}
          </Form.Item>
          <div className={style.imageAndGenderWrapper}>
            <Form.Item className={style.imageWrapper}>
              {getFieldDecorator('profileImageId')(
                <ProfileImageUploader
                  className={style.imageUploader}
                  label="Upload Profile Image"
                />,
              )}
            </Form.Item>
            <div className={style.genderWrapper}>
              <Form.Item label="Sex">
                {getFieldDecorator('sex')(
                  <Select placeholder="Select a sex">
                    <Select.Option value="none" key="none">I'd rather not say</Select.Option>
                    <Select.Option value="Male" key="Male">Male</Select.Option>
                    <Select.Option value="Female" key="Female">Female</Select.Option>
                    <Select.Option value="Intersex" key="Intersex">Intersex</Select.Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Gender">
                {getFieldDecorator('gender')(
                  <Select placeholder="Select a gender">
                    <Select.Option value="none" key="none">I'd rather not say</Select.Option>
                    <Select.Option value="Masculine" key="Masculine">Masculine</Select.Option>
                    <Select.Option value="Feminine" key="Feminine">Feminine</Select.Option>
                    <Select.Option value="Nonbinary" key="Nonbinary">Nonbinary</Select.Option>
                    <Select.Option value="Agender" key="Agender">Agender</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            {getFieldDecorator('allowComments', { valuePropName: 'checked', initialValue: true })(
              <Checkbox disabled={isPrivate}>
                Allow others to leave comments on your doll?
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isPrivate', { valuePropName: 'checked' })(
              <Checkbox onChange={this.handlePrivacyChange}>
                Make this doll private?
                <span className={sharedStyle.subtitle}>
                  (others will not see it on your profile)
                </span>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isWishlist', { valuePropName: 'checked' })(
              <Checkbox onChange={this.handleWishlistChange}>
                Add this doll to a wishlist?
                <span className={sharedStyle.subtitle}>
                  (Choose this if you do not own the doll yet)
                </span>
              </Checkbox>,
            )}
          </Form.Item>
          {isWishlist && (
            <Form.Item>
              {getFieldDecorator('wishlist')(
                <WishlistSelector />,
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({
  name: 'createDollStep',
  onFieldsChange: handleFieldsChange,
})(CreateDollStep);
