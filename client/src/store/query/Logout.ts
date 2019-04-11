import { Mutation } from 'react-apollo';

const GQL_LOGOUT = require('@store/graphql/Logout.gql');
import { Success } from '@store/type/Success';

export { GQL_LOGOUT, Success };
export class LogoutMutation extends Mutation<Success> {}
