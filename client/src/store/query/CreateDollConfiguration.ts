import { Mutation } from 'react-apollo';

const GQL_CREATE_DOLL_CONFIG = require('@store/graphql/CreateDollConfiguration.gql');
import { DollConfiguration } from '@store/type/DollConfiguration';

export interface CreateDollConfigOutput {
  createDollConfiguration: DollConfiguration;
}

export { GQL_CREATE_DOLL_CONFIG };
export class CreateDollConfigurationMutation extends Mutation<CreateDollConfigOutput> {}
