import { Me } from '@store/type/Me';
import { PureQueryOptions } from 'apollo-boost';
import React, { SFC } from 'react';
import CreateDollView from './CreateDollView';

import {
  CreateDollMutation,
  GQL_CREATE_DOLL,
} from '@store/query/CreateDoll';
import {
  CreateDollConfigurationMutation,
  GQL_CREATE_DOLL_CONFIG,
} from '@store/query/CreateDollConfiguration';
import { GQL_GET_MY_WISHLISTS } from '@store/query/GetMyWishlists';
import { GQL_ME } from '@store/query/Me';
import {
  CloseCreateDollModalMutation,
  GQL_CLOSE_CREATE_DOLL_MODAL,
} from '@store/query/ModalState';
import { GQL_USER_PROFILE } from '@store/query/UserProfile';

interface CreateDollProps {
  user: Me;
}

const CreateDoll: SFC<CreateDollProps> = ({ user }) => {
  const createRefetchProps: PureQueryOptions[] = [
    {
      query: GQL_ME,
    },
    {
      query: GQL_GET_MY_WISHLISTS,
    },
  ];
  if (user) {
    createRefetchProps.push({
      query: GQL_USER_PROFILE,
      variables: { username: user.username },
    });
  }

  return (
    <CloseCreateDollModalMutation mutation={GQL_CLOSE_CREATE_DOLL_MODAL}>
      {closeModal => (
        <CreateDollMutation
          mutation={GQL_CREATE_DOLL}
          refetchQueries={createRefetchProps}
        >
          {createDoll => (
            <CreateDollConfigurationMutation mutation={GQL_CREATE_DOLL_CONFIG}>
              {createDollConfig => (
                <CreateDollView
                  user={user}
                  closeModal={closeModal}
                  createDoll={createDoll}
                  saveDollConfig={createDollConfig}
                />
              )}
            </CreateDollConfigurationMutation>
          )}
        </CreateDollMutation>
      )}
    </CloseCreateDollModalMutation>
  );
};
export default CreateDoll;
