import { merge } from 'lodash';

const base = {
  Query: {
    _empty: () => false,
  },
  Mutation: {
    _empty: () => false,
  },
};

import { default as createCompanyModal } from './CreateCompanyModal';
import { default as createDollModal } from './CreateDollModal';
import { default as createWishlistModal } from './CreateDollWishlistModal';
import { default as forgotPwModal } from './ForgotPwModal';
import { default as loginModal } from './LoginModal';
import { default as signupModal } from './SignupModal';

export default merge(
  base,
  createCompanyModal,
  createDollModal,
  createWishlistModal,
  forgotPwModal,
  loginModal,
  signupModal,
);
