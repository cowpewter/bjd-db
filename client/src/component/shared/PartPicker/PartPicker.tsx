import Errors from '@component/shared/Errors';
import ArtistSection from '@component/shared/PartPicker/ArtistSection';
import CompanySection from '@component/shared/PartPicker/CompanySection';
import PartSection from '@component/shared/PartPicker/PartSection';
import ResinSection from '@component/shared/PartPicker/ResinSection';
import { MinimalCompany } from '@store/type/Company';
import { MinimalDollPart } from '@store/type/DollPart';
import { MinimalFaceupArtist } from '@store/type/FaceupArtist';
import { MinimalResinColor } from '@store/type/ResinColor';
import { Button } from 'antd';
import { GraphQLError } from 'graphql';
import React, { Component, Fragment, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { GQL_GET_COMPANIES } from '@store/query/GetCompanies';
import { GQL_GET_COMPANY_PARTS } from '@store/query/GetCompanyParts';
import { GQL_GET_COMPANY_RESIN } from '@store/query/GetCompanyResin';
import { GQL_GET_FACEUP_ARTISTS } from '@store/query/GetFaceupArtists';

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
  CreateFaceupArtistMutation,
  CreateFaceupArtistOutput,
  GQL_CREATE_FACEUP_ARTIST,
} from '@store/query/CreateFaceupArtist';
import {
  CreateResinColorMutation,
  CreateResinColorOutput,
  GQL_CREATE_RESIN_COLOR,
} from '@store/query/CreateResinColor';

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
  extraParts?: PartData;
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
  artist?: FaceupArtistData;

  errorMsgs?: string[];
  fieldErrors?: { [key: string]: string };
}

const filterOption =
  (inputValue: string, option: ReactElement) => {
    const input = inputValue.toLowerCase();
    const opt = option.props.children.toLowerCase();
    return option.props.value === 'new' ||
      option.props.value === 'none' ||
      opt.indexOf(input) !== -1;
  };

const getPopoverParent = (triggerNode: HTMLElement | undefined): HTMLElement => {
  if (!triggerNode) {
    return document.body;
  }
  let node: HTMLElement = triggerNode;
  do {
    if (node.parentElement) {
      node = node.parentElement;
      if (node.classList.contains('ant-modal-wrap')) {
        return node;
      }
    }

  } while (node !== document.body);

  return document.body;
};

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
        extraParts: undefined,
      },
      resinColor: undefined,
      artist: undefined,
      errorMsgs: [],
      fieldErrors: {},
    };
  }

  private resetState = () => {
    const { company } = this.props;
    this.setState({
      company: company ? company : undefined,
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
        extraParts: undefined,
      },
      resinColor: undefined,
      artist: undefined,
      errorMsgs: [],
      fieldErrors: {},
    });
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

    createDollPart({ variables: {
      scale,
      name: part && part.name,
      type: partType === 'body' ? 'upperBody' : partType,
      companyId: company && company.id,
    } })
      .then((resp) => {
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
            }
          });
        }
        this.setState({ errorMsgs });
      });
  }

  private handleFaceupArtistChange = (newValue: string, allArtists: MinimalFaceupArtist[]) => {
    if (newValue === 'new' || newValue === 'none') {
      this.setState({ artist: { id: newValue } });
      return;
    }
    const artist = allArtists.find(artist => artist.id === newValue);
    this.setState({ artist });
  }

  private handleNewFaceupArtistNameChange = (newValue: string) => {
    const { artist } = this.state;
    if (artist && artist.id === 'new') {
      artist.name = newValue;
      this.setState({ artist });
    }
  }

  private handleNewFaceupArtistCountryChange = (newValue: string) => {
    const { artist } = this.state;
    if (artist && artist.id === 'new') {
      artist.country = newValue;
      this.setState({ artist });
    }
  }

  private handleNewFaceupArtistWebsiteChange = (newValue: string) => {
    const { artist } = this.state;
    let { fieldErrors } = this.state;
    fieldErrors = fieldErrors || {};

    if (artist && artist.id === 'new') {
      artist.website = newValue;
      if (!newValue.match(/^http(s?):\/\//)) {
        fieldErrors['newFaceupArtist-website'] = 'URL must start with http:// or https://';
      } else if (newValue.indexOf('.') === -1) {
        fieldErrors['newFaceupArtist-website'] = 'Please enter a valid URL';
      } else {
        delete fieldErrors['newFaceupArtist-website'];
      }

      this.setState({ artist, fieldErrors });
    }
  }

  private handleCreateFaceupArtist = (createFaceupArtist: MutationFn<CreateFaceupArtistOutput>) => {
    const { artist, fieldErrors } = this.state;
    if (!artist || artist.id !== 'new') {
      return;
    }
    if (fieldErrors && fieldErrors['newCompany-website']) {
      return;
    }
    createFaceupArtist({ variables: { ...artist } })
      .then((resp) => {
        if (!resp || !resp.data) {
          const errors = ['An unexpected error has occured.'];
          this.setState({ errorMsgs: errors });
          return;
        }
        this.setState({ artist: resp.data.createFaceupArtist });
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
                  fieldErrors[`newFaceupArtist-${fieldName}`] = validationErrors[fieldName];
                });
              }
              this.setState({ fieldErrors });
            }
          });
        }
        this.setState({ errorMsgs });
      });
  }

  private handleSaveUserPart = () => {
    const { onSavePart, partType } = this.props;
    const { parts, company, resinColor, artist } = this.state;
    const part = parts[partType];

    if (!company || !part || !resinColor) {
      return;
    }

    const userPart: UserPartData = {
      company,
      part,
      resinColor,
      artist,
      id: 'new',
    };

    onSavePart(userPart);
    this.resetState();
  }

  render () {
    const { company, parts, resinColor, artist, errorMsgs, fieldErrors } = this.state;
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
        type: partType === 'body' ? 'upperBody' : partType,
      },
    }];

    const refetchResinColors = [{
      query: GQL_GET_COMPANY_RESIN,
      variables: { companyId: company ? company.id : undefined },
    }];

    const refetchArtists = [{
      query: GQL_GET_FACEUP_ARTISTS,
    }];

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
                    <CreateFaceupArtistMutation
                      mutation={GQL_CREATE_FACEUP_ARTIST}
                      refetchQueries={refetchArtists}
                    >
                      {(createFaceupArtist) => {
                        const companySectionProps = {
                          company,
                          fieldErrors,
                          createCompany,
                          getPopoverParent,
                          filterOption,
                          canChangeCompany: !fixedCompany,
                          onNameChange: this.handleNewCompanyNameChange,
                          onCountryChange: this.handleNewCompanyCountryChange,
                          onWebsiteChange: this.handleNewCompanyWebsiteChange,
                          onCompanyChange: this.handleCompanyChange,
                          onSaveCompany: this.handleCreateCompany,
                        };

                        return (
                          <Fragment>
                            <Errors errors={errorMsgs || []} />
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
                                    {!!resinColor && resinColor.id !== 'new' && (
                                      <ArtistSection
                                        artist={artist}
                                        partType={partType}
                                        fieldErrors={fieldErrors}
                                        createFaceupArtist={createFaceupArtist}
                                        getPopoverParent={getPopoverParent}
                                        filterOption={filterOption}
                                        onNameChange={this.handleNewFaceupArtistNameChange}
                                        onCountryChange={this.handleNewFaceupArtistCountryChange}
                                        onWebsiteChange={this.handleNewFaceupArtistWebsiteChange}
                                        onFaceupArtistChange={this.handleFaceupArtistChange}
                                        onSaveFaceupArtist={this.handleCreateFaceupArtist}
                                      >
                                        {!!artist && artist.id !== 'new' && (
                                          <Button type="primary" onClick={this.handleSaveUserPart}>
                                            {partType === 'extraParts' ? 'Add Part' : 'Save Part'}
                                          </Button>
                                        )}
                                      </ArtistSection>
                                    )}
                                  </ResinSection>
                                )}
                                </PartSection>
                              )}
                            </CompanySection>
                          </Fragment>
                        );
                      }}
                      </CreateFaceupArtistMutation>
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
