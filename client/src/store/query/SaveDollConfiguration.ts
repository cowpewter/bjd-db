import { Mutation } from 'react-apollo';

const GQL_SAVE_DOLL_CONFIG = require('@store/graphql/SaveDollConfiguration.gql');
import { DollConfiguration } from '@store/type/DollConfiguration';

export { GQL_SAVE_DOLL_CONFIG };
export class SaveDollConfigurationMutation extends Mutation<DollConfiguration> {}
