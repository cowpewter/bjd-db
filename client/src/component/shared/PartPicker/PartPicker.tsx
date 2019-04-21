import CompanySection from '@component/shared/PartPicker/CompanySection';
import PartSection from '@component/shared/PartPicker/PartSection';
import ResinSection from '@component/shared/PartPicker/ResinSection';
import { MinimalCompany } from '@store/type/Company';
import { MinimalDollPart } from '@store/type/DollPart';
import { MinimalResinColor } from '@store/type/ResinColor';
import { GraphQLError } from 'graphql';
import React, { Component, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { GQL_GET_COMPANIES } from '@store/query/GetCompanies';
import { GQL_GET_COMPANY_PARTS } from '@store/query/GetCompanyParts';
import { GQL_GET_COMPANY_RESIN } from '@store/query/GetCompanyResin';

import {
  CreateCompanyMutation,
  CreateCompanyOutput,
  GQL_CREATE_COMPANY,
} from '@store/query/CreateCompany';
import {
  CreateDollPartMutation,
  CreateDollPartOutput,
  GQL_CREATE_DOLL_PART,
} from '@store/query/CreateDollPart';
import {
  CreateResinColorMutation,
  CreateResinColorOutput,
  GQL_CREATE_RESIN_COLOR,
} from '@store/query/CreateResinColor';
import {
  CreateUserPartMutation,
  CreateUserPartOutput,
  GQL_CREATE_USER_PART,
} from '@store/query/CreateUserPart';

export interface BodyParts {
  [key: string]: PartData | undefined;
  head?: PartData;
  body?: PartData;
  upperBody?: PartData;
  lowerBody?: PartData;
  rightUpperArm?: PartData;
  rightLowerArm?: PartData;
  rightHand?: PartData;
  leftUpperArm?: PartData;
  leftLowerArm?: PartData;
  leftHand?: PartData;
  rightUpperLeg?: PartData;
  rightLowerLeg?: PartData;
  rightFoot?: PartData;
  leftUpperLeg?: PartData;
  leftLowerLeg?: PartData;
  leftFoot?: PartData;
  accessory?: PartData;
}

export const bodyParts = [
  'upperBody',
  'lowerBody',
  'rightUpperArm',
  'rightLowerArm',
  'rightHand',
  'leftUpperArm',
  'leftLowerArm',
  'leftHand',
  'rightUpperLeg',
  'rightLowerLeg',
  'rightFoot',
  'leftUpperLeg',
  'leftLowerLeg',
  'leftFoot',
];

export interface UserPartData {
  id: string;
  part: PartData;
  company: CompanyData;
  resinColor: ResinColorData;
  isWishlist?: boolean;
  artist?: FaceupArtistData;
}

export interface CompanyData {
  id?: string;
  name?: string;
  country?: string;
  website?: string;
}

export interface PartData {
  id?: string;
  name?: string;
  type?: Parts;
  scale?: DollScaleType;
}

export interface ResinColorData {
  id?: string;
  name?: string;
  colorFamily?: string;
  type?: string;
}

export interface FaceupArtistData {
  id?: string;
  name?: string;
  country?: string;
  website?: string;
}

interface Props {
  className?: string;
  partType: Parts;
  scale: string;
  company?: CompanyData;
  onSavePart: Function;
}

export interface State {
  parts: BodyParts;
  company?: CompanyData;
  resinColor?: ResinColorData;

  errorMsgs?: string[];
  fieldErrors?: { [key: string]: string };
}

const filterOption =
  (inputValue: string, option: ReactElement) => {
    console.warn(inputValue);
    const input = inputValue.toLowerCase();
    const opt = option.props.children.toLowerCase();
    return option.props.value === 'new' || opt.indexOf(input) !== -1;
  };

const getPopoverParent = (triggerNode: HTMLElement | undefined): HTMLElement => {
  if (!triggerNode) {
    return document.body;
  }
  let node: HTMLElement = triggerNode;
  do {
    if (node.parentElement) {
      node = node.parentElement;
      console.warn(node.classList);
      if (node.classList.contains('ant-modal-wrap')) {
        return node;
      }
    }

  } while (node !== document.body);

  return document.body;
};

/* tslint:disable:max-line-length */
/* Yeah this file sucks, I'm not sure how to break it up yet */

class PartPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      company: props.company ? props.company : undefined,
      parts: {
        head: undefined,
        body: undefined,
        upperBody: undefined,
        lowerBody: undefined,
        rightUpperArm: undefined,
        rightLowerArm: undefined,
        rightHand: undefined,
        leftUpperArm: undefined,
        leftLowerArm: undefined,
        leftHand: undefined,
        rightUpperLeg: undefined,
        rightLowerLeg: undefined,
        rightFoot: undefined,
        leftUpperLeg: undefined,
        leftLowerLeg: undefined,
        leftFoot: undefined,
        accessory: undefined,
      },
      resinColor: undefined,
      errorMsgs: [],
      fieldErrors: {},
    };
  }

  private handleCompanyChange = (newValue: string, allCompanies: MinimalCompany[]) => {
    if (newValue === 'new') {
      this.setState({ company: { id: 'new' } });
      return;
    }
    const company = allCompanies.find(company => company.id === newValue);
    this.setState({ company });
  }

  private handleNewCompanyNameChange = (newValue: string) => {
    const { company } = this.state;
    if (company && company.id === 'new') {
      company.name = newValue;
      this.setState({ company });
    }
  }

  private handleNewCompanyCountryChange = (newValue: string) => {
    const { company } = this.state;
    if (company && company.id === 'new') {
      company.country = newValue;
      this.setState({ company });
    }
  }

  private handleNewCompanyWebsiteChange = (newValue: string) => {
    const { company } = this.state;
    let { fieldErrors } = this.state;
    fieldErrors = fieldErrors || {};

    if (company && company.id === 'new') {
      company.website = newValue;
      if (!newValue.match(/^http(s?):\/\//)) {
        fieldErrors['newCompany-website'] = 'URL must start with http:// or https://';
      } else if (newValue.indexOf('.') === -1) {
        fieldErrors['newCompany-website'] = 'Please enter a valid URL';
      } else {
        delete fieldErrors['newCompany-website'];
      }

      this.setState({ company, fieldErrors });
    }
  }

  private handleCreateCompany = (createCompany: MutationFn<CreateCompanyOutput>) => {
    const { company, fieldErrors } = this.state;
    if (!company || company.id !== 'new') {
      return;
    }
    if (fieldErrors && fieldErrors['newCompany-website']) {
      return;
    }
    createCompany({ variables: { ...company } })
      .then((resp) => {
        console.warn(resp);
        if (!resp || !resp.data) {
          const errors = ['An unexpected error has occured.'];
          this.setState({ errorMsgs: errors });
          return;
        }
        this.setState({ company: resp.data.createCompany });
      })
      .catch((errors) => {
        const errorMsgs: string[] = [];
        if (errors.graphQLErrors) {
          errors.graphQLErrors.forEach((error: GraphQLError) => {
            if (error.message) {
              errorMsgs.push(error.message);
            }
            if (error.extensions) {
              const { validationErrors } = error.extensions.exception;
              const fieldErrors: any = {};
              if (validationErrors) {
                Object.keys(validationErrors).forEach((fieldName) => {
                  fieldErrors[`newCompany-${fieldName}`] = validationErrors[fieldName];
                });
              }
              this.setState({ fieldErrors });
              console.warn(fieldErrors);
            }
          });
        }
        this.setState({ errorMsgs });
      });
  }

  private handlePartChange = (newValue: string, allParts: MinimalDollPart[]) => {
    const { parts } = this.state;
    const { partType } = this.props;

    let part;
    if (newValue === 'new') {
      part = { id: 'new' };
    } else {
      part = allParts.find(part => part.id === newValue);
    }
    parts[partType] = part;
    this.setState({ parts });
  }

  private handleNewPartNameChange = (newValue: string) => {
    const { parts } = this.state;
    const { partType } = this.props;

    let part = parts[partType];
    if (!part) {
      part = { id: 'new', name: newValue };
    } else {
      part.name = newValue;
    }
    parts[partType] = part;

    this.setState({ parts });
  }

  private handleCreateDollPart = (createDollPart: MutationFn<CreateDollPartOutput>) => {
    const { parts, company } = this.state;
    const { partType, scale } = this.props;
    const part = parts[partType];
    console.warn({
      scale,
      name: part && part.name,
      type: partType === 'body' ? 'upperBody' : partType,
      companyId: company && company.id,
    });
    createDollPart({ variables: {
      scale,
      name: part && part.name,
      type: partType === 'body' ? 'upperBody' : partType,
      companyId: company && company.id,
    } })
      .then((resp) => {
        console.warn(resp);
        if (!resp || !resp.data) {
          const errors = ['An unexpected error has occured.'];
          this.setState({ errorMsgs: errors });
          return;
        }
        parts[partType] = resp.data.createDollPart;
        this.setState({ parts });
      })
      .catch((errors) => {
        const errorMsgs: string[] = [];
        if (errors.graphQLErrors) {
          errors.graphQLErrors.forEach((error: GraphQLError) => {
            if (error.message) {
              errorMsgs.push(error.message);
            }
            if (error.extensions) {
              const { validationErrors } = error.extensions.exception;
              const fieldErrors: any = {};
              if (validationErrors) {
                Object.keys(validationErrors).forEach((fieldName) => {
                  fieldErrors[`newPart-${fieldName}`] = validationErrors[fieldName];
                });
              }
              this.setState({ fieldErrors });
              console.warn(fieldErrors);
            }
          });
        }
        this.setState({ errorMsgs });
      });
  }

  private handleResinChange = (newValue: string, resinColors: MinimalResinColor[]) => {
    if (newValue === 'new') {
      this.setState({ resinColor: { id: 'new' } });
      return;
    }
    const resinColor = resinColors.find(resin => resin.id === newValue);
    this.setState({ resinColor });
  }

  private handleNewResinColorNameChange = (newValue: string) => {
    const { resinColor } = this.state;

    if (resinColor && resinColor.id === 'new') {
      resinColor.name = newValue;
      this.setState({ resinColor });
    }
  }

  private handleNewResinColorTypeChange = (newValue: string) => {
    const { resinColor } = this.state;

    if (resinColor && resinColor.id === 'new') {
      resinColor.type = newValue;
      this.setState({ resinColor });
    }
  }

  private handleNewResinColorFamilyChange = (newValue: string) => {
    const { resinColor } = this.state;

    if (resinColor && resinColor.id === 'new') {
      resinColor.colorFamily = newValue;
      this.setState({ resinColor });
    }
  }

  private handleCreateResinColor = (createResinColor: MutationFn<CreateResinColorOutput>) => {
    const { resinColor, company } = this.state;

    createResinColor({ variables: {
      name: resinColor && resinColor.name,
      type: resinColor && resinColor.type,
      colorFamily: resinColor && resinColor.colorFamily,
      companyId: company && company.id,
    } })
      .then((resp) => {
        console.warn(resp);
        if (!resp || !resp.data) {
          const errors = ['An unexpected error has occured.'];
          this.setState({ errorMsgs: errors });
          return;
        }
        const resinColor = resp.data.createResinColor;
        this.setState({ resinColor });
      })
      .catch((errors) => {
        const errorMsgs: string[] = [];
        if (errors.graphQLErrors) {
          errors.graphQLErrors.forEach((error: GraphQLError) => {
            if (error.message) {
              errorMsgs.push(error.message);
            }
            if (error.extensions) {
              const { validationErrors } = error.extensions.exception;
              const fieldErrors: any = {};
              if (validationErrors) {
                Object.keys(validationErrors).forEach((fieldName) => {
                  fieldErrors[`newResinColor-${fieldName}`] = validationErrors[fieldName];
                });
              }
              this.setState({ fieldErrors });
              console.warn(fieldErrors);
            }
          });
        }
        this.setState({ errorMsgs });
      });
  }

  render () {
    const { company, parts, resinColor, errorMsgs, fieldErrors } = this.state;
    const { className, company: fixedCompany, partType, scale } = this.props;
    const part = parts[partType];

    const refetchCompanies = [{
      query: GQL_GET_COMPANIES,
    }];

    const refetchParts = [{
      query: GQL_GET_COMPANY_PARTS,
      variables: {
        scale,
        companyId: company ? company.id : undefined,
        type: partType,
      },
    }];

    const refetchResinColors = [{
      query: GQL_GET_COMPANY_RESIN,
      variables: { companyId: company ? company.id : undefined },
    }];

    /*
    const refetchUserParts = [{
      query:
    }]
    */

    return (
      <div className={className}>
        <CreateCompanyMutation
          mutation={GQL_CREATE_COMPANY}
          refetchQueries={refetchCompanies}
        >
          {createCompany => (
            <CreateDollPartMutation
              mutation={GQL_CREATE_DOLL_PART}
              refetchQueries={refetchParts}
            >
              {createDollPart => (
                <CreateResinColorMutation
                  mutation={GQL_CREATE_RESIN_COLOR}
                  refetchQueries={refetchResinColors}
                >
                  {createResinColor => (
                    <CreateUserPartMutation
                      mutation={GQL_CREATE_USER_PART}
                      refetchQueries={['getUserParts']}
                    >
                      {(createUserPart) => {
                        const companySectionProps = {
                          company,
                          errorMsgs,
                          fieldErrors,
                          createCompany,
                          getPopoverParent,
                          filterOption,
                          canChangeCompany: !!fixedCompany,
                          onNameChange: this.handleNewCompanyNameChange,
                          onCountryChange: this.handleNewCompanyCountryChange,
                          onWebsiteChange: this.handleNewCompanyWebsiteChange,
                          onCompanyChange: this.handleCompanyChange,
                          onSaveCompany: this.handleCreateCompany,
                        };

                        return (
                          <CompanySection {...companySectionProps}>
                          {!!company && company.id !== 'new' && (
                            <PartSection
                              scale={scale}
                              company={company}
                              partType={partType}
                              part={part}
                              fieldErrors={fieldErrors}
                              createDollPart={createDollPart}
                              getPopoverParent={getPopoverParent}
                              filterOption={filterOption}
                              onNameChange={this.handleNewPartNameChange}
                              onPartChange={this.handlePartChange}
                              onSavePart={this.handleCreateDollPart}
                            >
                            {!!part && part.id !== 'new' && (
                              <ResinSection
                                company={company}
                                resinColor={resinColor}
                                fieldErrors={fieldErrors}
                                createResinColor={createResinColor}
                                getPopoverParent={getPopoverParent}
                                filterOption={filterOption}
                                onNameChange={this.handleNewResinColorNameChange}
                                onTypeChange={this.handleNewResinColorTypeChange}
                                onColorFamilyChange={this.handleNewResinColorFamilyChange}
                                onResinColorChange={this.handleResinChange}
                                onSaveResinColor={this.handleCreateResinColor}
                              >
                                Test
                              </ResinSection>
                            )}
                            </PartSection>
                          )}
                          </CompanySection>
                        );
                      }}
                      </CreateUserPartMutation>
                    )}
                </CreateResinColorMutation>
                )}
              </CreateDollPartMutation>
            )}
          </CreateCompanyMutation>
      </div>
    );
  }
}

export default PartPicker;
