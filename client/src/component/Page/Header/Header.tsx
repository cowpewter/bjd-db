import React, { SFC } from 'react';

import HeaderView from '@component/Page/Header/HeaderView';

import { GQL_ME, MeQuery } from '@store/query/Me';

const Header: SFC = () => {
  return (
    <MeQuery query={GQL_ME}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        }
        if (error || !data) {
          console.error(error);
          return null;
        }
        const { me } = data;
        return <HeaderView user={me} />;
      }}
    </MeQuery>
  );
};

export default Header;
