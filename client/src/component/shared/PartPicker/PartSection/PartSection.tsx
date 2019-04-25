import { CompanyData, PartData } from '@component/shared/PartPicker';
import { MinimalDollPart } from '@store/type/DollPart';
import { AutoComplete, Button, Form, Input, Popover } from 'antd';
import React, { ChangeEvent, Component, Fragment, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { CreateDollPartOutput } from '@store/query/CreateDollPart';
import { GetCompanyPartsQuery, GQL_GET_COMPANY_PARTS } from '@store/query/GetCompanyParts';

const sharedStyle = require('@component/shared/PartPicker/PartPicker.m.less');

interface Props {
  scale: string;
  company: CompanyData;
  partType: Parts;
  part?: PartData;
  fieldErrors?: { [key: string]: string };
  createDollPart: MutationFn<CreateDollPartOutput>;
  getPopoverParent: (triggerNode: HTMLElement | undefined) => HTMLElement;
  filterOption: (inputValue: string, option: ReactElement) => boolean;
  onNameChange: (newValue: string) => void;
  onPartChange: (newValue: string, allParts: MinimalDollPart[]) => void;
  onSavePart: (createDollPart: MutationFn<CreateDollPartOutput>) => void;
}

class PartSection extends Component<Props> {
  private handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { onNameChange } = this.props;
    onNameChange(ev.target.value);
  }

  private handlePartChange = (newValue: string, allParts: MinimalDollPart[]) => {
    const { onPartChange } = this.props;
    onPartChange(newValue, allParts);
  }

  private handlePartSave = () => {
    const { createDollPart, onSavePart } = this.props;
    onSavePart(createDollPart);
  }

  render() {
    const {
      children,
      company,
      fieldErrors,
      filterOption,
      getPopoverParent,
      partType,
      part,
      scale,
     } = this.props;

    return (
      <GetCompanyPartsQuery
        query={GQL_GET_COMPANY_PARTS}
        variables={{
          scale,
          companyId: company.id,
          type: partType === 'body' ? 'upperBody' : partType,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading Parts...</p>;
          }
          if (error || !data) {
            return <p>An unexpected error has occurred.</p>;
          }
          const { getCompanyParts: parts } = data;
          const partsDataSource = parts.map(part => (
            <AutoComplete.Option key={part.id} value={part.id}>
              {part.name}
            </AutoComplete.Option>
          ));
          partsDataSource.push(
            <AutoComplete.Option key="new" value="new">
              Create New...
            </AutoComplete.Option>,
          );

          return (
            <Fragment>
              <Popover
                visible={part && part.id === 'new'}
                getPopupContainer={getPopoverParent}
                placement="right"
                title="Create New Part"
                content={(
                  <div className={sharedStyle.newItemForm}>
                  <Form.Item
                    label="Name"
                    validateStatus={
                      fieldErrors && fieldErrors['newPart-name'] ? 'error' : ''
                    }
                    help={!!fieldErrors && fieldErrors['newPart-name']}
                  >
                    <Input
                      value={part ? part.name : undefined}
                      onChange={this.handleNameChange}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={this.handlePartSave}>
                    Save Part
                  </Button>
                </div>
                )}
              >
                <Form.Item label="Part" className={sharedStyle.mainFormItem}>
                  <AutoComplete
                    placeholder="Part Name"
                    dataSource={partsDataSource}
                    onChange={
                      value => this.handlePartChange(value as string, parts)
                    }
                    value={part ? part.id : undefined}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </Popover>
              {children}
            </Fragment>
          );
        }}
      </GetCompanyPartsQuery>
    );
  }
}

export default PartSection;
