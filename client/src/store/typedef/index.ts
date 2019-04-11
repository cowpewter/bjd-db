import gql from 'graphql-tag';

const base = gql`
type Query {
  _empty: boolean
}
type Mutation {
  _empty: boolean
}
`;

const loginModal = require('@store/typedef/LoginModal.gql');
const signupModal = require('@store/typedef/SignupModal.gql');
const forgotPwModal = require('@store/typedef/ForgotPw.gql');

export default [
  base,
  loginModal,
  signupModal,
  forgotPwModal,
];
