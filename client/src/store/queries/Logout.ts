import { Mutation } from 'react-apollo';

const GQL_LOGOUT = require('@store/graphql/Logout.gql');
import { LogoutOutput } from '@store/types/Logout';

export { GQL_LOGOUT, LogoutOutput };
export class LogoutMutation extends Mutation<LogoutOutput> {}
