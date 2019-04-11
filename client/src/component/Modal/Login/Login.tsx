import React, { SFC } from 'react';
import LoginView from './LoginView';

import { GQL_LOGIN, LoginMutation } from '@store/query/Login';
import { CloseLoginModalMutation, GQL_CLOSE_LOGIN_MODAL } from '@store/query/ModalState';

const Login: SFC = () => (
  <CloseLoginModalMutation mutation={GQL_CLOSE_LOGIN_MODAL}>
    {closeLoginModal => (
      <LoginMutation mutation={GQL_LOGIN} refetchQueries={['me']}>
        {login => (
          <LoginView closeLoginModal={closeLoginModal} login={login} />
        )}
      </LoginMutation>
    )}
  </CloseLoginModalMutation>
);

export default Login;
