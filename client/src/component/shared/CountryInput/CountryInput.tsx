import { AutoComplete } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import { getCodeList, overwrite } from 'country-list';
import React, { Component, ReactElement } from 'react';

overwrite([
  {
    code: 'KR',
    name: 'South Korea',
  },
  {
    code: 'KP',
    name: 'North Korea',
  },
  {
    code: 'TW',
    name: 'Taiwan',
  },
]);

const filterOption =
  (inputValue: string, option: ReactElement) => {
    const input = inputValue.toLowerCase();
    const opt = option.props.children.toLowerCase();
    return option.props.value === 'none' || opt.indexOf(input) !== -1;
  };

const codeList = getCodeList();
const options = Object.keys(codeList).map((code: string) => (
  <AutoComplete.Option value={code} key={code}>{codeList[code]}</AutoComplete.Option>
));
options.unshift(<AutoComplete.Option value="none" key="none">I don't know</AutoComplete.Option>);

class CountryInput extends Component<AutoCompleteProps> {
  render() {
    return (
      <AutoComplete {...this.props} filterOption={filterOption}>
        {options}
      </AutoComplete>
    );
  }
}

export default CountryInput;
