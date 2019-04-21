import CountryInput from '@component/shared/CountryInput';
import Errors from '@component/shared/Errors';
import { CompanyData } from '@component/shared/PartPicker';
import { MinimalCompany } from '@store/type/Company';
import { AutoComplete, Button, Form, Input, Popover } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { ChangeEvent, Component, Fragment, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { CreateCompanyOutput } from '@store/query/CreateCompany';
import { GetCompaniesQuery, GQL_GET_COMPANIES } from '@store/query/GetCompanies';

const sharedStyle = require('@component/shared/PartPicker/PartPicker.m.less');

interface Props {
  canChangeCompany: boolean;
  company?: CompanyData;
  errorMsgs?: string[];
  fieldErrors?: { [key: string]: string };
  createCompany: MutationFn<CreateCompanyOutput>;
  getPopoverParent: (triggerNode: HTMLElement | undefined) => HTMLElement;
  filterOption: (inputValue: string, option: ReactElement) => boolean;
  onNameChange: (newValue: string) => void;
  onCountryChange: (newValue: string) => void;
  onWebsiteChange: (newValue: string) => void;
  onCompanyChange: (newValue: string, allCompanies: MinimalCompany[]) => void;
  onSaveCompany: (createCompany: MutationFn<CreateCompanyOutput>) => void;
}

class CompanySection extends Component<Props> {
  private handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { onNameChange } = this.props;
    onNameChange(ev.target.value);
  }

  private handleCountryChange = (value: SelectValue) => {
    const { onCountryChange } = this.props;
    onCountryChange(value as string);
  }

  private handleWebsiteChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { onWebsiteChange } = this.props;
    onWebsiteChange(ev.target.value);
  }

  private handleCompanyChange = (newValue: string, allCompanies: MinimalCompany[]) => {
    const { onCompanyChange } = this.props;
    onCompanyChange(newValue, allCompanies);
  }

  private handlePartSave = () => {
    const { createCompany, onSaveCompany } = this.props;
    onSaveCompany(createCompany);
  }

  render() {
    const {
      children,
      canChangeCompany,
      company,
      errorMsgs,
      fieldErrors,
      getPopoverParent,
      filterOption,
    } = this.props;

    return (
      <GetCompaniesQuery query={GQL_GET_COMPANIES}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading Companies...</p>;
          }
          if (error || !data) {
            return <p>An unexpected error has occurred.</p>;
          }
          const { getCompanies: companies } = data;
          const companyDataSource = companies.map(company => (
            <AutoComplete.Option key={company.id} value={company.id}>
              {company.name}
            </AutoComplete.Option>
          ));
          companyDataSource.push(
            <AutoComplete.Option key="new" value="new">
              Create New...
            </AutoComplete.Option>,
          );

          return (
            <Fragment>
              <Errors errors={errorMsgs || []} />
              <Popover
                visible={company && company.id === 'new'}
                getPopupContainer={getPopoverParent}
                placement="right"
                title="Create New Company"
                content={(
                  <div className={sharedStyle.newItemForm}>
                    <Form.Item
                      label="Company Name"
                      validateStatus={
                        fieldErrors && fieldErrors['newCompany-name'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newCompany-name']}
                    >
                      <Input
                        value={company ? company.name : undefined}
                        onChange={this.handleNameChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Country of Origin"
                      validateStatus={
                        fieldErrors && fieldErrors['newCompany-country'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newCompany-country']}
                    >
                      <CountryInput
                        placeholder="Select a Country"
                        style={{ width: '100%' }}
                        value={company ? company.country : undefined}
                        onChange={this.handleCountryChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Company Website"
                      validateStatus={
                        fieldErrors && fieldErrors['newCompany-website'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newCompany-website']}
                    >
                      <Input
                        value={company ? company.website : undefined}
                        onChange={this.handleWebsiteChange}
                      />
                    </Form.Item>
                    <Button type="primary" onClick={this.handlePartSave}>
                      Save Company
                    </Button>
                  </div>
                )}
              >
                <Form.Item label="Company" className={sharedStyle.mainFormItem}>
                  <AutoComplete
                    placeholder="Company Name"
                    disabled={canChangeCompany}
                    dataSource={companyDataSource}
                    onChange={
                      value => this.handleCompanyChange(value as string, companies)
                    }
                    value={company ? company.id : undefined}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </Popover>
              {children}
            </Fragment>
          );
        }}
      </GetCompaniesQuery>
    );
  }
}

export default CompanySection;
