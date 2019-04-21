import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { Component } from 'react';

const types = ['opaque', 'semi-translucent', 'translucent'];
const labels = [
  'Opaque (Polyurethane)',
  'Semi-Translucent (French or Environmental)',
  'Translucent (Clear parts)'];
const options = types.map((type: string, index: number) => (
  <Select.Option value={type} key={type}>{labels[index]}</Select.Option>
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
