import React, { SFC } from 'react';
import LoginView from './LoginView';

import { GQL_LOGIN, LoginMutation } from '@store/query/Login';
import {
  CloseLoginModalMutation,
  GQL_CLOSE_LOGIN_MODAL,
  GQL_OPEN_FORGOT_PW_MODAL,
  GQL_OPEN_SIGNUP_MODAL,
  OpenForgotPwModalMutation,
  OpenSignupModalMutation,
} from '@store/query/ModalState';

const Login: SFC = () => (
  <CloseLoginModalMutation mutation={GQL_CLOSE_LOGIN_MODAL}>
    {closeLoginModal => (
      <OpenSignupModalMutation mutation={GQL_OPEN_SIGNUP_MODAL}>
        {openSignupModal => (
          <OpenForgotPwModalMutation mutation={GQL_OPEN_FORGOT_PW_MODAL}>
            {openForgotPwModal => (
              <LoginMutation mutation={GQL_LOGIN} refetchQueries={['me']}>
                {login => (
                  <LoginView
                    closeLoginModal={closeLoginModal}
                    openSignupModal={openSignupModal}
                    openForgotPwModal={openForgotPwModal}
                    login={login}
                  />
                )}
              </LoginMutation>
            )}
          </OpenForgotPwModalMutation>
        )}
      </OpenSignupModalMutation>
    )}
  </CloseLoginModalMutation>
);

export default Login;
