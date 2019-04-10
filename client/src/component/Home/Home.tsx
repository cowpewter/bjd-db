import Header from '@component/Header';
import { Button, Icon, Upload } from 'antd';
import React, { SFC } from 'react';

const onChange = (info: any) => {
  console.log('fileupload', info);
};

const Home: SFC = () => {
  return (
    <div>
     <Header />
      <main>
        <Upload action="/uploadImage" onChange={onChange}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
        </Upload>
      </main>
    </div>
  );
};

export default Home;
