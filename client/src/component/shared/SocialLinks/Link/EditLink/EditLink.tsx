import FaIcon from '@component/shared/FaIcon';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { SocialLink } from '@store/type/SocialLink';
import { Button, Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { GraphQLError } from 'graphql';
import React, { Component, SyntheticEvent } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

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
          })
          .catch((error) => {
            const errorMsgs: Error[] = [];
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach((error: GraphQLError) => {
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
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('url', {
            rules: [{ validator: SocialLinkHelpers.validateUrl }],
            initialValue: link.url,
          })(
            <Input name="url" prefix={icon} disabled={isSaving} />,
          )}
        </Form.Item>
        <Form.Item>
          <Button onClick={cancelEdit} disabled={isSaving}>
            <FaIcon icon="times" type="light" />
          </Button>
          <Button onClick={this.handleSubmit} disabled={isSaving} type="primary">
            <FaIcon icon="save" type="light" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'editLink' })(EditLink);
