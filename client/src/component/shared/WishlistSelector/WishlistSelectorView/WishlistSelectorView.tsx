import { MinimalDollWishlist } from '@store/type/DollWishlist';
import { Checkbox, Form, Input, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { ChangeEvent, Component, Fragment } from 'react';
import { WishlistSelectorValue } from '../';

const style = require('./WishlistSelectorView.m.less');
const sharedStyle = require('@component/Modal/SharedStyles.m.less');

interface WishlistSelectorViewProps {
  value?: WishlistSelectorValue;
  wishlists: MinimalDollWishlist[];
  onChange: (value?: WishlistSelectorValue) => void;
}

class WishlistSelectorView extends Component<WishlistSelectorViewProps> {
  handleSelectChange = (newValue?: string) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        id: newValue,
        name: value ? value.name : undefined,
        isPrivate: value ? value.isPrivate : undefined,
      });
    }
  }

  handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        id: value ? value.id : undefined,
        name: newValue,
        isPrivate: value ? value.isPrivate : undefined,
      });
    }
  }

  handlePrivateChange = (ev: CheckboxChangeEvent) => {
    const newValue = ev.target.checked;
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        id: value ? value.id : undefined,
        name: value ? value.name : undefined,
        isPrivate: newValue,
      });
    }
  }

  render() {
    const { wishlists, value } = this.props;
    const options = wishlists.map(list => (
      <Select.Option value={list.id} key={list.id}>{list.name}</Select.Option>
    ));
    return (
      <Fragment>
        <Select
          placeholder="Choose a wishlist"
          onChange={this.handleSelectChange}
          value={value && value.id}
          className={value && value.id === 'new' ? style.selectNew : undefined}
        >
          {options}
          <Select.Option value="new" key="new">Create new...</Select.Option>
        </Select>
        {value && value.id === 'new' && (
          <Fragment>
            <Form.Item>
              <label>Name</label>
              <Input
                placeholder="Name your wishlist"
                onChange={this.handleNameChange}
                value={value && value.name}
              />
            </Form.Item>
            <Form.Item className={style.lastFormItem}>
              <Checkbox
                checked={value && value.isPrivate}
                onChange={this.handlePrivateChange}
              >
                Make this wishlist private?
                <span className={sharedStyle.subtitle}>
                  (others will not see it on your profile)
                </span>
              </Checkbox>
            </Form.Item>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default WishlistSelectorView;
