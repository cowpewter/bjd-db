import { Mutation } from 'react-apollo';

import GQL_LOGOUT from '../graphql/Logout';
import { LogoutData } from '../types/Logout';

export { GQL_LOGOUT, LogoutData };

export default class LogoutMutation extends Mutation<LogoutData> {}
