import gql from 'graphql-tag';

const base = gql`
type Query {
  _empty: boolean
}
type Mutation {
  _empty: boolean
}
`;

const createCompanyModal = require('@store/typedef/CreateCompanyModal.gql');
const createDollWishlistModal = require('@store/typedef/CreateDollWishlistModal.gql');
const loginModal = require('@store/typedef/LoginModal.gql');
const signupModal = require('@store/typedef/SignupModal.gql');
const forgotPwModal = require('@store/typedef/ForgotPw.gql');

export default [
  base,
  createCompanyModal,
  createDollWishlistModal,
  loginModal,
  signupModal,
  forgotPwModal,
];
