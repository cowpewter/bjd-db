import React, { SFC } from 'react';
import HeaderView from './HeaderView/HeaderView';

import MeQuery, { GQL_ME } from '../../store/queries/Me';

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
