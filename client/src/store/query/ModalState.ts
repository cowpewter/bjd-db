import { Mutation, Query } from 'react-apollo';

import { ModalState } from '@store/type/ModalState';

const GQL_OPEN_LOGIN_MODAL = require('@store/graphql/LoginModalOpen.gql');
const GQL_CLOSE_LOGIN_MODAL = require('@store/graphql/LoginModalClose.gql');
const GQL_OPEN_SIGNUP_MODAL = require('@store/graphql/SignupModalOpen.gql');
const GQL_CLOSE_SIGNUP_MODAL = require('@store/graphql/SignupModalClose.gql');
const GQL_OPEN_FORGOT_PW_MODAL = require('@store/graphql/ForgotPwModalOpen.gql');
const GQL_CLOSE_FORGOT_PW_MODAL = require('@store/graphql/ForgotPwModalClose.gql');
const GQL_OPEN_CREATE_DOLL_WISHLIST_MODAL =
  require('@store/graphql/CreateDollWishlistModalOpen.gql');
const GQL_CLOSE_CREATE_DOLL_WISHLIST_MODAL =
  require('@store/graphql/CreateDollWishlistModalClose.gql');
const GQL_OPEN_CREATE_COMPANY_MODAL = require('@store/graphql/CreateCompanyModalClose.gql');
const GQL_CLOSE_CREATE_COMPANY_MODAL = require('@store/graphql/CreateCompanyModalOpen.gql');
const GQL_OPEN_CREATE_DOLL_MODAL = require('@store/graphql/CreateDollModalOpen.gql');
const GQL_CLOSE_CREATE_DOLL_MODAL = require('@store/graphql/CreateDollModalClose.gql');

export {
  GQL_OPEN_LOGIN_MODAL,
  GQL_CLOSE_LOGIN_MODAL,
  GQL_OPEN_SIGNUP_MODAL,
  GQL_CLOSE_SIGNUP_MODAL,
  GQL_OPEN_FORGOT_PW_MODAL,
  GQL_CLOSE_FORGOT_PW_MODAL,
  GQL_OPEN_CREATE_DOLL_WISHLIST_MODAL,
  GQL_CLOSE_CREATE_DOLL_WISHLIST_MODAL,
  GQL_OPEN_CREATE_COMPANY_MODAL,
  GQL_CLOSE_CREATE_COMPANY_MODAL,
  GQL_OPEN_CREATE_DOLL_MODAL,
  GQL_CLOSE_CREATE_DOLL_MODAL,
  ModalState,
};

export class ModalStateQuery extends Query<ModalState> {}

export class OpenLoginModalMutation extends Mutation<null> {}
export class CloseLoginModalMutation extends Mutation<null> {}

export class OpenSignupModalMutation extends Mutation<null> {}
export class CloseSignupModalMutation extends Mutation<null> {}

export class OpenForgotPwModalMutation extends Mutation<null> {}
export class CloseForgotPwModalMutation extends Mutation<null> {}

export class OpenCreateDollWishlistModalMutation extends Mutation<null> {}
export class CloseCreateDollWishlistModalMutation extends Mutation<null> {}

export class OpenCreateCompanyModalMutation extends Mutation<null> {}
export class CloseCreateCompanyModalMutation extends Mutation<null> {}

export class OpenCreateDollModalMutation extends Mutation<null> {}
export class CloseCreateDollModalMutation extends Mutation<null> {}
