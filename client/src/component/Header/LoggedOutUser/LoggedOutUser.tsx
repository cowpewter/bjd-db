import React, { SFC } from 'react';

import { GQL_OPEN_LOGIN_MODAL, OpenLoginModalMutation } from '@store/query/ModalState';

interface LoggedOutUserProps {
  className?: string;
}

const LoginLink: SFC = () => (
  <OpenLoginModalMutation mutation={GQL_OPEN_LOGIN_MODAL}>
    {(openLoginModal) => {
      return <a onClick={() => { openLoginModal(); }}>Login</a>;
    }}
  </OpenLoginModalMutation>
);

const LoggedOutUser:SFC<LoggedOutUserProps> = ({ className }) => (
  <div className={className}>
    <LoginLink />
    <a>Signup</a>
  </div>
);

export default LoggedOutUser;
