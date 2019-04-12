import { Dropdown, Menu } from 'antd';
import React, { SFC } from 'react';
import { MutationFn } from 'react-apollo';
import { Link } from 'react-router-dom';

import { GQL_LOGOUT, LogoutMutation, Success } from '@store/query/Logout';
import { Me } from '@store/type/Me';

const { Item: MenuItem, Divider } = Menu;

interface LoggedInUserProps {
  user: Me;
  className?: string;
  logout: MutationFn<Success>;
}

const LoggedInUser: SFC<LoggedInUserProps> = ({ className, user }) => {
  const menu = (
    <LogoutMutation mutation={GQL_LOGOUT} refetchQueries={['me']}>
      {(logout) => {
        const handleMenuClick = (ev: { key: string }) => {
          if (ev.key === 'logout') {
            logout();
          }
        };
        return (
          <Menu onClick={handleMenuClick}>
            <MenuItem key="profile">
              <Link to={`/user/${user.username}`}>My Profile</Link>
            </MenuItem>
            <MenuItem key="notifications">
              <Link to={'/notifications'}>Notifications</Link>
            </MenuItem>
            <MenuItem key="settings">
              <Link to={'/settings'}>Account Settings</Link>
            </MenuItem>
            <Divider />
            <MenuItem key="help">
              <Link to={'/help'}>Help</Link>
            </MenuItem>
            <Divider />
            <MenuItem key="logout">Logout</MenuItem>
          </Menu>
        );
      }}
    </LogoutMutation>
  );

  return (
    <div className={className}>
      Logged in as:&nbsp;
      <Dropdown overlay={menu}>
        <a>{user.username}</a>
      </Dropdown>
    </div>
  );
};

export default LoggedInUser;
