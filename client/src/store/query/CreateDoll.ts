import { Mutation } from 'react-apollo';

const GQL_CREATE_DOLL = require('@store/graphql/CreateDoll.gql');
import { Doll } from '@store/type/Doll';

export interface CreateDollResponse {
  createDoll: Doll;
}

export { GQL_CREATE_DOLL };
export class CreateDollMutation extends Mutation<CreateDollResponse> {}
