import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { startCase } from 'lodash';
import React, { Component } from 'react';

const colors = [
  'white', 'light', 'tan', 'dark', 'black',
  'grey', 'red', 'pink', 'orange', 'yellow',
  'green', 'blue', 'purple',
];
const options = colors.map((color: string) => (
  <Select.Option value={color} key={color}>{startCase(color)}</Select.Option>
));

class ResinTypeSelector extends Component<SelectProps<string>> {
  render() {
    return (
      <Select {...this.props}>
        {options}
      </Select>
    );
  }
}

export default ResinTypeSelector;
