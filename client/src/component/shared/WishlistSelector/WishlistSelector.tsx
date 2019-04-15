import React, { Component } from 'react';
import WishlistSelectorView from './WishlistSelectorView';

import {
  GetWishlistsQuery,
  GQL_GET_MY_WISHLISTS,
} from '@store/query/GetMyWishlists';
import {
  GQL_OPEN_CREATE_DOLL_WISHLIST_MODAL,
  OpenCreateDollWishlistModalMutation,
} from '@store/query/ModalState';

interface WishlistSelectorProps {
  onChange?: (ev: any) => void;
  value?: string;
}

class WishlistSelector extends Component<WishlistSelectorProps> {
  handleChange = (newValue?: string) => {
    const wishlistId = newValue === 'new' ? undefined : newValue;
    const { onChange } = this.props;
    if (onChange) {
      onChange(wishlistId);
    }
  }

  render() {
    return (
      <GetWishlistsQuery query={GQL_GET_MY_WISHLISTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }
          if (error || !data || !data.me) {
            return 'There was a error fetching your wishlists';
          }
          const { dollWishlists } = data.me;
          const { value } = this.props;
          console.warn(value);
          return (
            <OpenCreateDollWishlistModalMutation mutation={GQL_OPEN_CREATE_DOLL_WISHLIST_MODAL}>
              {openCreateWishlistModal => (
                <WishlistSelectorView
                  wishlists={dollWishlists}
                  openCreateWishlistModal={openCreateWishlistModal}
                  onChange={this.handleChange}
                  value={value}
                />
              )}
            </OpenCreateDollWishlistModalMutation>
          );
        }}
      </GetWishlistsQuery>
    );
  }
}

export default WishlistSelector;
