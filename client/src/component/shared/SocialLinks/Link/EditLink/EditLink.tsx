import FaIcon from '@component/shared/FaIcon';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { SocialLink } from '@store/type/SocialLink';
import { Button, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

const style = require('./EditLink.m.less');

interface EditLinkProps {
  link: SocialLink;
  editLink: MutationFn<any, OperationVariables>;
  cancelEdit: () => void;
  form: WrappedFormUtils;
}

interface EditLinkState {
  isSaving: boolean;
}

const serviceLookup = SocialLinkHelpers.serviceLookup;

class EditLink extends Component<EditLinkProps, EditLinkState> {
  state: EditLinkState = {
    isSaving: false,
  };

  private handleSubmit = (ev?: SyntheticEvent) => {
    if (ev) {
      ev.preventDefault();
    }
    if (!this.props.form) {
      return;
    }

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isSaving: true });

        const { link } = this.props;
        this.props.editLink({ variables:  { id: link.id, url: values.url } })
          .then(() => {
            this.setState({ isSaving: false });
            this.props.cancelEdit();
          })
          .catch((errors) => {
            console.warn(errors);
            const errorMsgs: Error[] = [];
            if (errors.graphQLErrors) {
              errors.graphQLErrors.forEach((error: GraphQLError) => {
                if (error.message) {
                  errorMsgs.push(new Error(error.message));
                }
              });
              if (!this.props.form) {
                return;
              }
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { link, cancelEdit } = this.props;
    const { isSaving } = this.state;
    const details = serviceLookup[link.service];
    if (!details) {
      return null;
    }
    const icon = React.createElement(details.iconComponent, details.iconData);

    return (
      <div className={style.root}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('url', {
              rules: [{ validator: SocialLinkHelpers.validateUrl(true) }],
              initialValue: link.url,
            })(
              <Input name="url" prefix={icon} disabled={isSaving} />,
            )}
          </Form.Item>
          <Form.Item>
            <a className={style.options} onClick={cancelEdit}>
              <FaIcon icon="ban" type="light" /> cancel
            </a>
            <a className={style.options} onClick={this.handleSubmit}>
              <FaIcon icon="save" type="light" /> save
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'editLink' })(EditLink);
