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

export default [
  base,
  loginModal,
];
