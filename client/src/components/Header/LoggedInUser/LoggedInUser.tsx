import { Dropdown, Menu } from 'antd';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import LogoutMutation, { GQL_LOGOUT } from '../../../store/queries/Logout';
import { Me } from '../../../store/types/Me';

const { Item: MenuItem, Divider } = Menu;

interface LoggedInUserProps {
  user: Me;
  className?: string;
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
              <Link to={`/user/${user.id}`}>My Profile</Link>
            </MenuItem>
            <MenuItem key="notifications">
              <Link to={'/notifications'}>Notifications</Link>
            </MenuItem>
            <MenuItem key="settings">
              <Link to={'/settings'}>Account Settings</Link>
            </MenuItem>
            <MenuItem key="parts">
              <Link to={'/parts'}>My Parts Library</Link>
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
      Logged in as:
      <Dropdown overlay={menu}>
        <a>{user.username}</a>
      </Dropdown>
    </div>
  );
};

export default LoggedInUser;
