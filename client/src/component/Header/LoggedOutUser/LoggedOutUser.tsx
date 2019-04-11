import React, { SFC } from 'react';
import LoggedOutUserView from './LoggedOutUserView';

import {
  GQL_OPEN_LOGIN_MODAL,
  GQL_OPEN_SIGNUP_MODAL,
  OpenLoginModalMutation,
  OpenSignupModalMutation,
} from '@store/query/ModalState';

interface LoggedOutUserProps {
  className?: string;
}

const Login: SFC<LoggedOutUserProps> = ({ className }) => (
  <OpenLoginModalMutation mutation={GQL_OPEN_LOGIN_MODAL}>
    {openLoginModal => (
      <OpenSignupModalMutation mutation={GQL_OPEN_SIGNUP_MODAL}>
        {openSignupModal => (
          <LoggedOutUserView
            className={className}
            openLoginModal={openLoginModal}
            openSignupModal={openSignupModal}
          />
        )}
      </OpenSignupModalMutation>
    )}
  </OpenLoginModalMutation>
);

export default Login;
