import { MinimalDollWishlist } from '@store/type/DollWishlist';
import { Select } from 'antd';
import React, { Component } from 'react';
import { MutationFn } from 'react-apollo';

interface WishlistSelectorViewProps {
  value?: string;
  wishlists: MinimalDollWishlist[];
  openCreateWishlistModal: MutationFn<null>;
  onChange: (value?: string) => void;
}

class WishlistSelectorView extends Component<WishlistSelectorViewProps> {
  handleChange = (value?: string) => {
    const { onChange, openCreateWishlistModal } = this.props;
    if (value === 'new') {
      openCreateWishlistModal();
      return;
    }
    if (onChange) {
      onChange(value);
    }
  }
  render() {
    const { wishlists, value } = this.props;
    const options = wishlists.map(list => (
      <Select.Option value={list.id} key={list.id}>{list.name}</Select.Option>
    ));
    return (
      <Select placeholder="Choose a wishlist" onChange={this.handleChange} value={value}>
        {options}
        <Select.Option value="new" key="new">Create new...</Select.Option>
      </Select>
    );
  }
}

export default WishlistSelectorView;
