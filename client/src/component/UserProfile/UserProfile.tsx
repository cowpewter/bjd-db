import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';

import Page from '@component/Page';

import { PureQueryOptions } from 'apollo-boost';

import { GQL_ME, MeQuery } from '@store/query/Me';
import { GQL_SAVE_USER_DESC, SaveUserDescription } from '@store/query/SaveUserDescription';
import { GQL_USER_PROFILE, UserProfileQuery } from '@store/query/UserProfile';

import UserProfileView from './UserProfileView';

interface MatchParams {
  username: string;
}

interface UserProfileProps extends RouteComponentProps<MatchParams> {}

const UserProfile: SFC<UserProfileProps> = ({ match }) => {
  const { username } = match.params;
  return (
    <Page>
      <UserProfileQuery query={GQL_USER_PROFILE} variables={{ username }}>
        {({ loading, error, data: userData }) => {
          if (loading) {
            return null;
          }
          if (error || !userData) {
            return 'An unexpected error occurred. Please refresh and try again.';
          }
          return (
            <MeQuery query={GQL_ME}>
              {({ loading, error, data: meData }) => {
                if (loading) {
                  return null;
                }
                if (error || !meData) {
                  return 'An unexpected error occurred. Please refresh and try again.';
                }
                const refetchProps: PureQueryOptions = {
                  query: GQL_USER_PROFILE,
                  variables: { username },
                };
                return (
                  <SaveUserDescription
                    mutation={GQL_SAVE_USER_DESC}
                    refetchQueries={[refetchProps]}
                  >
                    {saveUserDesc => (
                      <UserProfileView
                        user={userData.userByName}
                        isCurrentUser={meData.me && userData.userByName.id === meData.me.id}
                        saveUserDescription={saveUserDesc}
                        refetch={[refetchProps]}
                      />
                    )}
                  </SaveUserDescription>
                );
              }}
            </MeQuery>
          );
        }}
      </UserProfileQuery>
    </Page>
  );
};

export default UserProfile;
