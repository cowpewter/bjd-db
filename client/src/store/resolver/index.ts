import { merge } from 'lodash';

const base = {
  Query: {
    _empty: () => false,
  },
  Mutation: {
    _empty: () => false,
  },
};

import { default as forgotPwModal } from './ForgotPwModal';
import { default as loginModal } from './LoginModal';
import { default as signupModal } from './SignupModal';

export default merge(
  base,
  forgotPwModal,
  loginModal,
  signupModal,
  forgotPwModal,
);
