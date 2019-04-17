import Errors from '@component/shared/Errors';
import FaIcon from '@component/shared/FaIcon';
import { Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';
import React, { Component } from 'react';

interface ProfileImageUploaderProps {
  onChange?: (ev: any) => void;
  value?: string;
  className?: string;
  label?: string;
}

interface ProfileImageUploaderState {
  loading: boolean;
  imgUrl?: string;
  errorMsgs: string[];
}

class ProfileImageUploader extends Component<ProfileImageUploaderProps, ProfileImageUploaderState> {
  state: ProfileImageUploaderState = {
    loading: false,
    imgUrl: undefined,
    errorMsgs: [],
  };

  private beforeUpload = (file: RcFile) => {
    if (!file.type.match(/^image/)) {
      this.setState({ errorMsgs: ['File must be an image'] });
      return false;
    }
    console.log(file.size, file.size / 1024 / 1024);
    if (file.size / 1024 / 1024 > 10) {
      this.setState({ errorMsgs: ['File must be under 10mb'] });
      return false;
    }
    this.setState({ loading: true });
    return true;
  }

  handleChange = ({ file }: UploadChangeParam) => {
    if (!file.response) {
      return;
    }
    const { images } = file.response;
    if (images.length) {
      this.setState({ imgUrl: images[0].filename, loading: false });
      const { onChange } = this.props;
      if (onChange) {
        onChange(images[0].id);
      }
    }
  }

  render() {
    const { errorMsgs, imgUrl } = this.state;
    const { className, label } = this.props;
    const uploadButton = (
      <div>
        <FaIcon
          className={this.state.loading ? 'fa-spin' : ''}
          icon={this.state.loading ? 'spinner-third' : 'plus'}
          type="light"
        />
        <div>{this.state.loading ? 'Uploading...' : label ? label : 'Upload'}</div>
      </div>
    );
    return (
      <div className={className}>
        <Errors errors={errorMsgs} />
        <Upload
          name="profileImage"
          listType="picture-card"
          accept=".png,.jpg,.jpeg,.gif,.svg"
          showUploadList={false}
          action="/uploadImage"
          multiple={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imgUrl ?
            <img src={imgUrl} width="100" height="100" alt="Uploaded Image" /> :
            uploadButton
          }
        </Upload>
      </div>
    );
  }
}

export default ProfileImageUploader;
