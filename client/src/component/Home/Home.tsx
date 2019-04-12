import FaIcon from '@component/shared/FaIcon';
import { Button, Upload } from 'antd';
import React, { SFC } from 'react';

import Page from '@component/Page';

const onChange = (info: any) => {
  console.log('fileupload', info);
};

const Home: SFC = () => {
  return (
    <Page>
      <Upload action="/uploadImage" onChange={onChange}>
        <Button>
          <FaIcon type="light" icon="upload"/> Click to Upload
        </Button>
      </Upload>
    </Page>
  );
};

export default Home;
