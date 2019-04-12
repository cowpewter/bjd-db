import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import MarkdownEditor from '@component/shared/MarkdownEditor';
import MarkdownRender from '@component/shared/MarkdownRender';
import ThumbnailImg from '@component/shared/ThumbnailImg';
import { SaveUserDescriptionOutput } from '@store/query/SaveUserDescription';
import { UserProfile } from '@store/type/UserProfile';
import { OperationVariables } from 'apollo-boost';
import { GraphQLError } from 'graphql';
import React, { Fragment } from 'react';
import { MutationFn } from 'react-apollo';

const style = require('./UserProfileView.m.less');

interface UserProfileViewProps {
  user: UserProfile;
  isCurrentUser: boolean;
  saveUserDescription: MutationFn<SaveUserDescriptionOutput, OperationVariables>;
}

interface UserProfileViewState {
  descriptionEditMode: boolean;
  savingDescription: boolean;
  descriptionErrors: string[];
}

class UserProfileView extends React.Component<UserProfileViewProps, UserProfileViewState> {
  state: UserProfileViewState = {
    descriptionEditMode: false,
    savingDescription: false,
    descriptionErrors: [],
  };

  private handleEdit = () => {
    this.setState({ descriptionEditMode: true });
  }

  private saveDescription = (newValue: string) => {
    const { user, saveUserDescription } = this.props;
    this.setState({ savingDescription: true });
    saveUserDescription({ variables: { id: user.id, description: newValue } })
      .then(() => {
        this.setState({
          descriptionEditMode: false,
          savingDescription: false,
        });
      })
      .catch((error) => {
        const errorMsgs: string[] = [];
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach((error: GraphQLError) => {
            if (error.message) {
              errorMsgs.push(error.message);
            }
          });

          this.setState({
            savingDescription: false,
            descriptionErrors: errorMsgs,
          });
        }
      });
  }

  public render() {
    const { user, isCurrentUser } = this.props;
    const { descriptionEditMode, savingDescription, descriptionErrors } = this.state;
    const avatar = (user.profileImage && user.profileImage.thumbnail) ||
      '/siteImages/default-avatar-REPLACE_ME.png';
    return (
      <Fragment>
        <section className={style.profile}>
          <ThumbnailImg src={avatar} alt={`Profile Image for ${user.username}`} />
          <div className={style.info}>
            <h1>{user.username}</h1>
          </div>
        </section>
        <section>
          <h2>
            About
            {isCurrentUser && (
              <a className="subtitle" onClick={this.handleEdit}>
                <FaIcon type="light" icon="edit" />
                edit
              </a>
            )}
          </h2>

          <Errors errors={descriptionErrors} />

          {descriptionEditMode && (
            <MarkdownEditor
              initialValue={user.description}
              save={this.saveDescription}
              saving={savingDescription}
            />
          )}
          {!descriptionEditMode && (
            <MarkdownRender
              maxHeight={500}
              className="description"
              markdown={user.description}
            />
          )}
        </section>

        <section className="split">
          <div>
            <h2>Dolls</h2>
            <div className="subsection">content</div>
          </div>
          <div>
            <h2>Albums</h2>
            <div className="subsection">content</div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default UserProfileView;
