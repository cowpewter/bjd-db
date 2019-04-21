import { Mutation } from 'react-apollo';

const GQL_CREATE_DOLL_PART = require('@store/graphql/CreateDollPart.gql');
import { MinimalDollPart } from '@store/type/DollPart';

export interface CreateDollPartOutput {
  createDollPart: MinimalDollPart;
}

export { GQL_CREATE_DOLL_PART };
export class CreateDollPartMutation extends Mutation<CreateDollPartOutput> {}
