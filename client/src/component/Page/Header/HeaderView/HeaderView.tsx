import { Menu } from 'antd';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import LoggedInUser from '@component/Page/Header/LoggedInUser';
import LoggedOutUser from '@component/Page/Header/LoggedOutUser';

import { Me } from '@store/type/Me';

const style = require('./HeaderView.m.less');

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
      <Menu mode="horizontal" className={style.menu}>
        <MenuItem key="home">
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem key="search">
          <Link to="/search">Search</Link>
        </MenuItem>
        {user && (
          <MenuItem key="me">
            <Link to={`/user/${user.username}`}>My Profile</Link>
          </MenuItem>
        )}
      </Menu>
    </header>
  );
};

export default HeaderView;
