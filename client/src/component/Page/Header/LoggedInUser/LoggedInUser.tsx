import React, { SFC } from 'react';
import LoggedInUserView from './LoggedInUserView';

import { GQL_LOGOUT, LogoutMutation } from '@store/query/Logout';
import { Me } from '@store/type/Me';

interface LoggedInUserProps {
  className?: string;
  user: Me;
}

const LoggedInUser: SFC<LoggedInUserProps> = ({ className, user }) => (
  <LogoutMutation mutation={GQL_LOGOUT} refetchQueries={['me']}>
    {logout => (
      <LoggedInUserView
        className={className}
        user={user}
        logout={logout}
      />
    )}
  </LogoutMutation>
);

export default LoggedInUser;
