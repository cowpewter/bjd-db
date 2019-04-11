import { Mutation } from 'react-apollo';

const GQL_INITIATE_PW_RESET = require('@store/graphql/InitiatePwReset.gql');
import { Success } from '@store/type/Success';

export { GQL_INITIATE_PW_RESET, Success };
export class InitiatePwResetMutation extends Mutation<Success> {}
