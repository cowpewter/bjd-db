import { Mutation, Query } from 'react-apollo';
import { getGQL } from './';

import { ModalState } from '@store/types/ModalState';
const GQL_TOGGLE_LOGIN_MODAL = require('@store/graphql/ToggleLoginModal.gql');
const GQL_TOGGLE_SIGNUP_MODAL = require('@store/graphql/ToggleSignupModal.gql');

export { GQL_TOGGLE_LOGIN_MODAL, GQL_TOGGLE_SIGNUP_MODAL, ModalState };
export class ModalStateQuery extends Query<ModalState> {}
export class ToggleLoginModalMutation extends Mutation<ModalState> {}
export class ToggleSignupModalMutation extends Mutation<ModalState> {}
