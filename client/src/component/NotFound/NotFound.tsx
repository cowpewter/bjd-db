import React, { SFC } from 'react';

import Page from '@component/Page';

interface NotFoundProps {
  type?: String;
}
const NotFound: SFC<NotFoundProps> = ({ type }) => (
  <Page>
    {type && (
      <div>
        <h1>{type} Not Found</h1>
      </div>
    )}
    {!type && (
      <div>
        <h1>Page Not Found</h1>
      </div>
    )}
  </Page>
);

export default NotFound;
