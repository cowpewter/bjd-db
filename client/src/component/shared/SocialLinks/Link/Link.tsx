import FaIcon from '@component/shared/FaIcon';
import EditLink from '@component/shared/SocialLinks/Link/EditLink';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { SocialLink } from '@store/type/SocialLink';
import { Button } from 'antd';
import { GraphQLError } from 'graphql';
import React, { Component } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

interface LinkProps {
  link: SocialLink;
  isEditable?: boolean;
  editLink: MutationFn<any, OperationVariables>;
  deleteLink: MutationFn<any, OperationVariables>;
}

interface LinkState {
  isHovering: boolean;
  isEditing: boolean;
  isSaving: boolean;
  deleteErrors: Error[];
}

const serviceLookup = SocialLinkHelpers.serviceLookup;

class Link extends Component<LinkProps, LinkState> {
  state: LinkState = {
    isHovering: false,
    isEditing: false,
    isSaving: false,
    deleteErrors: [],
  };

  private handleDelete = () => {
    const { link } = this.props;
    this.setState({ deleteErrors: [], isSaving: true });
    this.props.deleteLink({ variables:  { id: link.id } })
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
          this.setState({ deleteErrors: errorMsgs, isSaving: false });
        }
      });
  }

  private handleMouseIn = () => {
    this.setState({ isHovering: true });
  }

  private handleMouseOut = () => {
    this.setState({ isHovering: false });
  }

  private handleEdit = () => {
    this.setState({ isEditing: true });
  }

  private handleCancelEdit = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { link, editLink, isEditable } = this.props;
    const { isHovering, isEditing, isSaving, deleteErrors } = this.state;
    const details = serviceLookup[link.service];
    if (!details) {
      return null;
    }
    const icon = React.createElement(details.iconComponent, details.iconData);

    if (isEditing) {
      return (
        <EditLink
          link={link}
          editLink={editLink}
          cancelEdit={() => { this.setState({ isEditing: false }); }}
        />
      );
    }

    const label = details.useUrlForLabel ? link.url.replace(/^http(s?):\/\//, '') : details.label;
    return (
      <div onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>
        <span>
          {icon} <a href={link.url} target="_blank">{label}</a>
          {!!deleteErrors.length && (
            <span className="error">{deleteErrors.map(e => e.message).join(', ')}</span>
          )}
        </span>
        {isEditable && isHovering && (
          <div>
            <Button onClick={this.handleEdit} type="primary" disabled={isSaving}>
              <FaIcon icon="edit" type="light" />
            </Button>
            <Button onClick={this.handleDelete} disabled={isSaving}>
              <FaIcon icon="trash-alt" type="light" />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Link;
