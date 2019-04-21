import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { Component } from 'react';

const scales = ['1/1', '1/2', '1/3', '1/4', '1/7',  '1/8', '1/12', 'Micro'];
const options = scales.map((scale: string) => (
  <Select.Option value={scale} key={scale}>{scale}</Select.Option>
));

class ScaleSelector extends Component<SelectProps<string>> {
  render() {
    return (
      <Select {...this.props}>
        {options}
      </Select>
    );
  }
}

export default ScaleSelector;
