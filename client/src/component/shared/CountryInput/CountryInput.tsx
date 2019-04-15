import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { getCodeList } from 'country-list';
import React, { SFC } from 'react';

const codeList = getCodeList();
const options = Object.keys(codeList).map((code: string) => (
  <Select.Option value={code} key={code}>{codeList[code]}</Select.Option>
));

const CountryInput: SFC<SelectProps<string>> = props => (
  <Select {...props}>
    <Select.Option value="none" key="none">I don't know</Select.Option>
    {options}
  </Select>
);

export default CountryInput;
