import AddLink from '@component/shared/SocialLinks/AddLink';
import Link from '@component/shared/SocialLinks/Link';
import {
  AddSocialMediaLinkMutation,
  GQL_ADD_SOCIAL_MEDIA_LINK,
} from '@store/query/AddSocialMediaLink';
import {
  DeleteSocialMediaLinkMutation,
  GQL_DELETE_SOCIAL_MEDIA_LINK,
} from '@store/query/DeleteSocialMediaLink';
import {
  EditSocialMediaLinkMutation,
  GQL_EDIT_SOCIAL_MEDIA_LINK,
} from '@store/query/EditSocialMediaLink';
import { SocialLink } from '@store/type/SocialLink';
import { PureQueryOptions } from 'apollo-boost';
import React, { Component, Fragment } from 'react';
import FaIcon from '../FaIcon';

interface SocialLinksProps {
  id: string;
  type: 'user' | 'faceupArtist' | 'company';
  links: SocialLink[];
  isEditable: boolean;
  refetch: PureQueryOptions[];
}

interface SocialLinksState {
  isAdding: boolean;
}

class SocialLinks extends Component<SocialLinksProps, SocialLinksState> {
  state: SocialLinksState = {
    isAdding: false,
  };

  private handleAdd = () => {
    this.setState({ isAdding: true });
  }

  private handleCancelAdd = () => {
    this.setState({ isAdding: false });
  }

  render() {
    const { id, type, links, isEditable, refetch } = this.props;
    const { isAdding } = this.state;
    return (
      <AddSocialMediaLinkMutation
        mutation={GQL_ADD_SOCIAL_MEDIA_LINK}
        refetchQueries={refetch}
      >
        {addLink => (
          <EditSocialMediaLinkMutation
            mutation={GQL_EDIT_SOCIAL_MEDIA_LINK}
            refetchQueries={refetch}
          >
            {editLink => (
              <DeleteSocialMediaLinkMutation
                mutation={GQL_DELETE_SOCIAL_MEDIA_LINK}
                refetchQueries={refetch}
              >
                {deleteLink => (
                  <div>
                    {(isEditable || !!links.length) && (
                      <h3>You can find me at:</h3>
                    )}
                    {links.map((link, index) =>
                      <Link
                        link={link}
                        isEditable={isEditable}
                        editLink={editLink}
                        deleteLink={deleteLink}
                        key={index}
                      />)}
                    {isAdding && (
                      <Fragment>
                        <AddLink id={id} type={type} addLink={addLink} />
                        <a onClick={this.handleCancelAdd}>I'm done adding links</a>
                      </Fragment>
                    )}
                    {!isAdding && isEditable && (
                      <a onClick={this.handleAdd}>
                        <FaIcon type="light" icon="plus" />
                        &nbsp;Add a new link
                      </a>
                    )}
                  </div>
                )}
              </DeleteSocialMediaLinkMutation>
          )}
          </EditSocialMediaLinkMutation>
        )}
      </AddSocialMediaLinkMutation>
    );
  }
}

export default SocialLinks;
