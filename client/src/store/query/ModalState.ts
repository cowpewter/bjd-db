import { Mutation, Query } from 'react-apollo';

import { ModalState } from '@store/type/ModalState';
const GQL_OPEN_LOGIN_MODAL = require('@store/graphql/LoginModalOpen.gql');
const GQL_CLOSE_LOGIN_MODAL = require('@store/graphql/LoginModalClose.gql');

export { GQL_OPEN_LOGIN_MODAL, GQL_CLOSE_LOGIN_MODAL, ModalState };

export class ModalStateQuery extends Query<ModalState> {}

export class OpenLoginModalMutation extends Mutation<null> {}
export class CloseLoginModalMutation extends Mutation<null> {}
