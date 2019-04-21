import { Mutation } from 'react-apollo';

const GQL_CREATE_USER_PART = require('@store/graphql/CreateUserPart.gql');
import { UserPart } from '@store/type/UserPart';

export interface CreateUserPartOutput {
  createUserPart: UserPart;
}

export { GQL_CREATE_USER_PART };
export class CreateUserPartMutation extends Mutation<CreateUserPartOutput> {}
