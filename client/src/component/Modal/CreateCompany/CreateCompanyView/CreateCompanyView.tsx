import CountryInput from '@component/shared/CountryInput';
import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { CreateCompanyOutput } from '@store/query/CreateCompany';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, Fragment, SyntheticEvent } from 'react';
import { MutationFn } from 'react-apollo';

const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface CreateCompanyViewProps {
  closeModal: MutationFn<null>;
  createCompany: MutationFn<CreateCompanyOutput>;
  form: WrappedFormUtils;
}

interface CreateCompanyViewState {
  loading: boolean;
  errorMsgs: string[];
}

class CreateCompanyView extends Component<CreateCompanyViewProps, CreateCompanyViewState> {
  state: CreateCompanyViewState = {
    loading: false,
    errorMsgs: [],
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const variables = {
          name: values.name,
          country: values.country === 'none' ? null : values.country,
          website: !values.website ? null : values.website,
        };
        this.props.createCompany({ variables })
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
        title="Create New Company"
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
            {getFieldDecorator('name', {
              rules: [{ required: true, message: "Please enter the company's name" }],
            })(
              <Input
                placeholder="Company Name"
                prefix={<FaIcon className={sharedStyle.icon} type="light" icon="building" />}
                onKeyDown={this.handleKeyDown}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('country', {
            })(
              <Fragment>
                <label>Country</label>
                <CountryInput />
              </Fragment>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('website', {
              rules: [{ validator: SocialLinkHelpers.validateUrl(false) }],
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder="Website URL"
                prefix={<FaIcon className={sharedStyle.icon} type="light" icon="browser" />}
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

export default Form.create({ name: 'createCompany' })(CreateCompanyView);
