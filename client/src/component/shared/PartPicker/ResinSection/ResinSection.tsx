import { CompanyData, ResinColorData } from '@component/shared/PartPicker';
import ResinColorFamilySelector from '@component/shared/ResinColorFamilySelector';
import ResinTypeSelector from '@component/shared/ResinTypeSelector';
import { MinimalResinColor } from '@store/type/ResinColor';
import { AutoComplete, Button, Form, Input, Popover } from 'antd';
import React, { ChangeEvent, Component, Fragment, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { CreateResinColorOutput } from '@store/query/CreateResinColor';
import { GetCompanyResinQuery, GQL_GET_COMPANY_RESIN } from '@store/query/GetCompanyResin';

const sharedStyle = require('@component/shared/PartPicker/PartPicker.m.less');

interface Props {
  company: CompanyData;
  resinColor?: ResinColorData;
  fieldErrors?: { [key: string]: string };
  createResinColor: MutationFn<CreateResinColorOutput>;
  getPopoverParent: (triggerNode: HTMLElement | undefined) => HTMLElement;
  filterOption: (inputValue: string, option: ReactElement) => boolean;
  onNameChange: (newValue: string) => void;
  onTypeChange: (newValue: string) => void;
  onColorFamilyChange: (newValue: string) => void;
  onResinColorChange: (newValue: string, allColors: MinimalResinColor[]) => void;
  onSaveResinColor: (createResinColor: MutationFn<CreateResinColorOutput>) => void;
}

class ResinSection extends Component<Props> {
  private handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { onNameChange } = this.props;
    onNameChange(ev.target.value);
  }

  private handleResinTypeChange = (newValue: string) => {
    const { onTypeChange } = this.props;
    onTypeChange(newValue);
  }

  private handleResinFamilyChange = (newValue: string) => {
    const { onColorFamilyChange } = this.props;
    onColorFamilyChange(newValue);
  }

  private handleResinColorChange = (newValue: string, allColors: MinimalResinColor[]) => {
    const { onResinColorChange } = this.props;
    onResinColorChange(newValue, allColors);
  }

  private handleResinColorSave = () => {
    const { createResinColor, onSaveResinColor } = this.props;
    onSaveResinColor(createResinColor);
  }

  render() {
    const {
      children,
      company,
      resinColor,
      fieldErrors,
      getPopoverParent,
      filterOption,
    } = this.props;

    return (
      <GetCompanyResinQuery
        query={GQL_GET_COMPANY_RESIN}
        variables={{ companyId: company.id }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading Resin Colors...</p>;
          }
          if (error || !data) {
            return <p>An unexpected error has occurred.</p>;
          }
          const { getCompanyResin: resinColors } = data;
          const colorDataSource = resinColors.map(color => (
            <AutoComplete.Option key={color.id} value={color.id}>
              {`${color.name} - ${color.type}`}
            </AutoComplete.Option>
          ));
          colorDataSource.push(
            <AutoComplete.Option key="new" value="new">
              Create New...
            </AutoComplete.Option>,
          );

          return (
            <Fragment>
              <Popover
                visible={resinColor && resinColor.id === 'new'}
                getPopupContainer={getPopoverParent}
                placement="right"
                title="Create New Resin Color"
                content={(
                  <div className={sharedStyle.newItemForm}>
                  <Form.Item
                    label="Name"
                    validateStatus={
                      fieldErrors && fieldErrors['newResinColor-name'] ? 'error' : ''
                    }
                    help={!!fieldErrors && fieldErrors['newResinColor-name']}
                  >
                    <Input
                      placeholder="Name of Resin Color"
                      value={resinColor ? resinColor.name : undefined}
                      onChange={this.handleNameChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    validateStatus={
                      fieldErrors && fieldErrors['newResinColor-type'] ? 'error' : ''
                    }
                    help={!!fieldErrors && fieldErrors['newResinColor-type']}
                  >
                    <ResinTypeSelector
                      style={{ width: '100%' }}
                      value={resinColor ? resinColor.type : undefined}
                      onChange={this.handleResinTypeChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Color Family"
                    validateStatus={
                      fieldErrors && fieldErrors['newResinColor-colorFamily'] ? 'error' : ''
                    }
                    help={!!fieldErrors && fieldErrors['newResinColor-colorFamily']}
                  >
                    <ResinColorFamilySelector
                      style={{ width: '100%' }}
                      value={resinColor ? resinColor.colorFamily : undefined}
                      onChange={this.handleResinFamilyChange}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={this.handleResinColorSave}>
                    Save Resin Color
                  </Button>
                </div>
                )}
              >
                <Form.Item label="Part" className={sharedStyle.mainFormItem}>
                  <AutoComplete
                    placeholder="Resin Color"
                    dataSource={colorDataSource}
                    onChange={
                      value => this.handleResinColorChange(value as string, resinColors)
                    }
                    value={resinColor ? resinColor.id : undefined}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </Popover>
              {children}
            </Fragment>
          );
        }}
      </GetCompanyResinQuery>
    );
  }
}

export default ResinSection;
