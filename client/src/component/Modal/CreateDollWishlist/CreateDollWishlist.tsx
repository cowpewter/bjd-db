import React, { SFC } from 'react';
import CreateDollWishlistView from './CreateDollWishlistView';

import {
  CreateDollWishlistMutation,
  GQL_CREATE_DOLL_WISHLIST,
} from '@store/query/CreateDollWishlist';
import {
  CloseCreateDollWishlistModalMutation,
  GQL_CLOSE_CREATE_DOLL_WISHLIST_MODAL,
} from '@store/query/ModalState';

const CreateDollWishlist: SFC = () => (
  <CloseCreateDollWishlistModalMutation mutation={GQL_CLOSE_CREATE_DOLL_WISHLIST_MODAL}>
    {closeCreateDollWishlistModal => (
      <CreateDollWishlistMutation
        mutation={GQL_CREATE_DOLL_WISHLIST}
        refetchQueries={['getMyWishlists']}
      >
        {createDollWishlist => (
          <CreateDollWishlistView
            closeModal={closeCreateDollWishlistModal}
            createWishlist={createDollWishlist}
          />
        )}
      </CreateDollWishlistMutation>
    )}
  </CloseCreateDollWishlistModalMutation>
);

export default CreateDollWishlist;
