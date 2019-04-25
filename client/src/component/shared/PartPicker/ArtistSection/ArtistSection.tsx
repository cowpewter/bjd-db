import CountryInput from '@component/shared/CountryInput';
import { FaceupArtistData } from '@component/shared/PartPicker';
import { MinimalFaceupArtist } from '@store/type/FaceupArtist';
import { AutoComplete, Button, Form, Input, Popover } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { ChangeEvent, Component, Fragment, ReactElement } from 'react';
import { MutationFn } from 'react-apollo';

import { CreateFaceupArtistOutput } from '@store/query/CreateFaceupArtist';
import { GetFaceupArtistsQuery, GQL_GET_FACEUP_ARTISTS } from '@store/query/GetFaceupArtists';

const sharedStyle = require('@component/shared/PartPicker/PartPicker.m.less');

interface Props {
  artist?: FaceupArtistData;
  partType: Parts;
  fieldErrors?: { [key: string]: string };
  createFaceupArtist: MutationFn<CreateFaceupArtistOutput>;
  getPopoverParent: (triggerNode: HTMLElement | undefined) => HTMLElement;
  filterOption: (inputValue: string, option: ReactElement) => boolean;
  onNameChange: (newValue: string) => void;
  onCountryChange: (newValue: string) => void;
  onWebsiteChange: (newValue: string) => void;
  onFaceupArtistChange: (newValue: string, allCompanies: MinimalFaceupArtist[]) => void;
  onSaveFaceupArtist: (createFaceupArtist: MutationFn<CreateFaceupArtistOutput>) => void;
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

  private handleArtistChange = (newValue: string, allArtists: MinimalFaceupArtist[]) => {
    const { onFaceupArtistChange } = this.props;
    onFaceupArtistChange(newValue, allArtists);
  }

  private handlePartSave = () => {
    const { createFaceupArtist, onSaveFaceupArtist } = this.props;
    onSaveFaceupArtist(createFaceupArtist);
  }

  render() {
    const {
      children,
      artist,
      partType,
      fieldErrors,
      getPopoverParent,
      filterOption,
    } = this.props;

    return (
      <GetFaceupArtistsQuery query={GQL_GET_FACEUP_ARTISTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading Artists...</p>;
          }
          if (error || !data) {
            return <p>An unexpected error has occurred.</p>;
          }
          const { getFaceupArtists: artists } = data;
          const artistDataSource = artists.map(artist => (
            <AutoComplete.Option key={artist.id} value={artist.id}>
              {artist.name}
            </AutoComplete.Option>
          ));
          artistDataSource.push(
            <AutoComplete.Option key="new" value="new">
              Create New...
            </AutoComplete.Option>,
          );
          artistDataSource.unshift(
            <AutoComplete.Option key="none" value="none">
              {partType === 'head' ? 'No Faceup' : 'No Blushing'}
            </AutoComplete.Option>,
          );

          return (
            <Fragment>
              <Popover
                visible={artist && artist.id === 'new'}
                getPopupContainer={getPopoverParent}
                placement="right"
                title="Create New Artist"
                content={(
                  <div className={sharedStyle.newItemForm}>
                    <Form.Item
                      label="Artist's Name"
                      validateStatus={
                        fieldErrors && fieldErrors['newFaceupArtist-name'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newFaceupArtist-name']}
                    >
                      <Input
                        value={artist ? artist.name : undefined}
                        onChange={this.handleNameChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Country of Origin"
                      validateStatus={
                        fieldErrors && fieldErrors['newFaceupArtist-country'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newFaceupArtist-country']}
                    >
                      <CountryInput
                        placeholder="Select a Country"
                        style={{ width: '100%' }}
                        value={artist ? artist.country : undefined}
                        onChange={this.handleCountryChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Artist's Website"
                      validateStatus={
                        fieldErrors && fieldErrors['newFaceupArtist-website'] ? 'error' : ''
                      }
                      help={!!fieldErrors && fieldErrors['newFaceupArtist-website']}
                    >
                      <Input
                        value={artist ? artist.website : undefined}
                        onChange={this.handleWebsiteChange}
                      />
                    </Form.Item>
                    <Button type="primary" onClick={this.handlePartSave}>
                      Save Artist
                    </Button>
                  </div>
                )}
              >
                <Form.Item
                  label={partType === 'head' ? 'Faceup Artist' : 'Blushing Artist'}
                  className={sharedStyle.mainFormItem}
                >
                  <AutoComplete
                    placeholder="Artist's Name"
                    dataSource={artistDataSource}
                    onChange={
                      value => this.handleArtistChange(value as string, artists)
                    }
                    value={artist ? artist.id : undefined}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </Popover>
              {children}
            </Fragment>
          );
        }}
      </GetFaceupArtistsQuery>
    );
  }
}

export default CompanySection;
