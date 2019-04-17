import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import MarkdownEditor from '@component/shared/MarkdownEditor';
import MarkdownRender from '@component/shared/MarkdownRender';
import SocialLinks from '@component/shared/SocialLinks';
import ThumbnailImg from '@component/shared/ThumbnailImg';
import { SaveUserDescriptionOutput } from '@store/query/SaveUserDescription';
import { UserProfile } from '@store/type/UserProfile';
import { Menu } from 'antd';
import { OperationVariables, PureQueryOptions } from 'apollo-boost';
import { GraphQLError } from 'graphql';
import React, { Component, createRef, Fragment } from 'react';
import { MutationFn } from 'react-apollo';
import { Link } from 'react-router-dom';

const style = require('./UserProfileView.m.less');

interface UserProfileViewProps {
  user: UserProfile;
  isCurrentUser: boolean;
  saveUserDescription: MutationFn<SaveUserDescriptionOutput, OperationVariables>;
  refetch: PureQueryOptions[];
  openCreateDoll: MutationFn<null>;
}

interface UserProfileViewState {
  descriptionEditMode: boolean;
  savingDescription: boolean;
  descriptionErrors: string[];
}

class UserProfileView extends Component<UserProfileViewProps, UserProfileViewState> {
  private descriptionRef = createRef<HTMLDivElement>();

  state: UserProfileViewState = {
    descriptionEditMode: false,
    savingDescription: false,
    descriptionErrors: [],
  };

  private handleEdit = () => {
    this.setState({ descriptionEditMode: true });
    if (this.descriptionRef.current) {
      window.scrollTo(0, this.descriptionRef.current.offsetTop);
    }
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

  private handleCreateDoll = () => {
    const { openCreateDoll } = this.props;
    openCreateDoll();
  }

  public render() {
    const { user, isCurrentUser, refetch } = this.props;
    const { descriptionEditMode, savingDescription, descriptionErrors } = this.state;
    const avatar = (user.profileImage && user.profileImage.thumbnail) ||
      '/siteImages/default-avatar-REPLACE_ME.png';
    return (
      <Fragment>
        <section className="profileHead">
          <Menu mode="vertical" defaultSelectedKeys={['profile']} className="pageMenu">
            <Menu.Item key="profile">
              <Link to={`/user/${user.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="dolls">
              <Link to={`/user/${user.username}/dolls`}>Dolls</Link>
            </Menu.Item>
            <Menu.Item key="albums">
              <Link to={`/user/${user.username}/dolls`}>Albums</Link>
            </Menu.Item>
            {isCurrentUser && (
              <Menu.Item key="parts">
                <Link to={`/user/${user.username}/parts`}>Parts</Link>
              </Menu.Item>
            )}
          </Menu>
          <ThumbnailImg size="large" src={avatar} alt={`Profile Image for ${user.username}`} />
          <div className={style.info}>
            <h1>{user.username}</h1>
            <SocialLinks
              links={user.socialLinks}
              id={user.id}
              type="user"
              isEditable={isCurrentUser}
              refetch={refetch}
            />
          </div>
        </section>
        <section ref={this.descriptionRef}>
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
            <h2>
              Dolls
              {isCurrentUser && (
              <a className="subtitle" onClick={this.handleCreateDoll}>
                <FaIcon type="light" icon="plus" />
                add doll
              </a>
            )}
            </h2>
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
