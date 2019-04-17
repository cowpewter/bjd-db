import React, { Component } from 'react';
import { WishlistSelectorValue } from './';
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
  value?: WishlistSelectorValue;
}

class WishlistSelector extends Component<WishlistSelectorProps> {
  handleSelectChange = (newValue?: WishlistSelectorValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(newValue);
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

          return (
            <WishlistSelectorView
              wishlists={dollWishlists}
              onChange={this.handleSelectChange}
              value={value}
            />
          );
        }}
      </GetWishlistsQuery>
    );
  }
}

export default WishlistSelector;
