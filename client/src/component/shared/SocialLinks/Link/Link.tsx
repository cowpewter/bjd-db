import FaIcon from '@component/shared/FaIcon';
import EditLink from '@component/shared/SocialLinks/Link/EditLink';
import SocialLinkHelpers from '@component/shared/SocialLinks/SocialLinkHelpers';
import { SocialLink } from '@store/type/SocialLink';
import { Button } from 'antd';
import { GraphQLError } from 'graphql';
import React, { Component } from 'react';
import { MutationFn, OperationVariables } from 'react-apollo';

const style = require('./Link.m.less');

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
      .catch((errors) => {
        console.warn(errors);
        const errorMsgs: Error[] = [];
        if (errors.graphQLErrors) {
          errors.graphQLErrors.forEach((error: GraphQLError) => {
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
      <div
        className={style.root}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={this.handleMouseOut}
      >
        <span className={style.link}>
          {icon} <a href={link.url} target="_blank">{label}</a>
          {!!deleteErrors.length && (
            <span className="error">{deleteErrors.map(e => e.message).join(', ')}</span>
          )}
        </span>
        {isEditable && isHovering && !isSaving && (
          <div>
            <a className={style.options} onClick={this.handleEdit} type="primary">
              <FaIcon icon="edit" type="light" /> edit
            </a>
            <a className={style.options} onClick={this.handleDelete}>
              <FaIcon icon="trash-alt" type="light" /> delete
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Link;
