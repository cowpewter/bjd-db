import { Menu } from 'antd';
import React, { SFC } from 'react';

import LoggedInUser from './LoggedInUser';
import LoggedOutUser from './LoggedOutUser';

import MeQuery, { GQL_ME } from '../../store/queries/Me';

import style from './Header.m.less';

const { Item: MenuItem } = Menu;

const Header: SFC = () => {
  return (
    <header className={style.header}>
      <h1>BJD-db</h1>
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

            if (me) {
              return (
                <LoggedInUser user={me} className={style.userOptions} />
              );
            }
            return (
              <LoggedOutUser className={style.userOptions} />
            );
          }}
          </MeQuery>
        <Menu mode="horizontal">
          <MenuItem key="home">Home</MenuItem>
          <MenuItem key="search">Search</MenuItem>
          <MenuItem key="mydolls">My Dolls</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
