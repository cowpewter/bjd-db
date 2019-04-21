import { Mutation } from 'react-apollo';

const GQL_CREATE_RESIN_COLOR = require('@store/graphql/CreateResinColor.gql');
import { MinimalResinColor } from '@store/type/ResinColor';

export interface CreateResinColorOutput {
  createResinColor: MinimalResinColor;
}

export { GQL_CREATE_RESIN_COLOR };
export class CreateResinColorMutation extends Mutation<CreateResinColorOutput> {}
