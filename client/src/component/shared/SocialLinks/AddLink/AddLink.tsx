import FaIcon from '@component/shared/FaIcon';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { Button, Form, Input, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

const { Option } = Select;

const style = require('./AddLink.m.less');

interface AddLinkProps {
  id: string;
  type: 'user' | 'faceupArtist' | 'company';
  addLink: MutationFn<any, OperationVariables>;
  form: WrappedFormUtils;
}

interface AddLinkState {
  isSaving: boolean;
}

const serviceLookup = SocialLinkHelpers.serviceLookup;

class AddLink extends Component<AddLinkProps, AddLinkState> {
  state = {
    isSaving: false,
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isSaving: true });

        const { id, type } = this.props;
        this.props.addLink({
          variables: { ownerId: id, ownerType: type, url: values.url, service: values.service },
        })
          .then(() => {
            this.setState({ isSaving: false });
            this.props.form.setFields({
              url: {
                errors: null,
                value: '',
              },
              service: {
                errors: null,
                value: 'website',
              },
            });
          })
          .catch((error) => {
            console.warn(error);
            const errorMsgs: Error[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(new Error(error.message));
                }
              });
              this.props.form.setFields({
                url: {
                  errors: errorMsgs.length ? errorMsgs : null,
                  value: values.url,
                },
              });
            }
          });
      }
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { isSaving } = this.state;

    const serviceSelectOptions = Object.keys(serviceLookup)
      .map((service) => {
        const details = serviceLookup[service];
        const icon = React.createElement(details.iconComponent, details.iconData);
        return (
          <Option value={service} key={service}>
            {icon} {details.label}
          </Option>
        );
      });

    const serviceSelector = getFieldDecorator('service', {
      initialValue: 'website',
    })(
      <Select>
        {serviceSelectOptions}
      </Select>,
    );

    return (
      <div className={style.root}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('url', {
              rules: [{ validator: SocialLinkHelpers.validateUrl(true) }],
              validateTrigger: 'onBlur',
            })(
              <Input addonBefore={serviceSelector} name="url" disabled={isSaving} />,
            )}
          </Form.Item>
          <Form.Item>
            <a className={style.options} onClick={this.handleSubmit} type="primary">
              <FaIcon icon="save" type="light" /> save
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'addLink' })(AddLink);
