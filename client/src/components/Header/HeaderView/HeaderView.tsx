import { Menu } from 'antd';
import React, { Fragment, SFC } from 'react';
import { Link } from 'react-router-dom';

import LoggedInUser from '../LoggedInUser';
import LoggedOutUser from '../LoggedOutUser';

import { Me } from '../../../store/types/Me';

import style from './HeaderView.m.less';

const { Item: MenuItem } = Menu;

interface HeaderProps {
  user: Me | null;
}

const HeaderView: SFC<HeaderProps> = ({ user }) => {
  return (
    <header className={style.header}>
      <h1>BJD-db</h1>
      {user && <LoggedInUser user={user} className={style.userOptions} />}
      {!user && <LoggedOutUser className={style.userOptions} />}
      <Menu mode="horizontal">
        <MenuItem key="home">
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem key="search">
          <Link to="/search">Search</Link>
        </MenuItem>
        {user && (
          <MenuItem key="mydolls">
            <Link to={`/dolls/${user.id}`}>My Dolls</Link>
          </MenuItem>
        )}
      </Menu>
    </header>
  );
};

export default HeaderView;
