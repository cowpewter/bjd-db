import React, { SFC } from 'react';
import SignupView from './SignupView';

import {
  CloseSignupModalMutation,
  GQL_CLOSE_SIGNUP_MODAL,
  GQL_OPEN_LOGIN_MODAL,
  OpenLoginModalMutation,
} from '@store/query/ModalState';
import { GQL_SIGNUP, SignupMutation } from '@store/query/Signup';

const Signup: SFC = () => (
  <CloseSignupModalMutation mutation={GQL_CLOSE_SIGNUP_MODAL}>
    {closeSignupModal => (
      <OpenLoginModalMutation mutation={GQL_OPEN_LOGIN_MODAL}>
        {openLoginModal => (
          <SignupMutation mutation={GQL_SIGNUP} refetchQueries={['me']}>
            {signup => (
              <SignupView
                closeSignupModal={closeSignupModal}
                openLoginModal={openLoginModal}
                signup={signup}
              />
            )}
          </SignupMutation>
        )}
      </OpenLoginModalMutation>
    )}
  </CloseSignupModalMutation>
);

export default Signup;
