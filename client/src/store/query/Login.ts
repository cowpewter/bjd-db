import { Mutation } from 'react-apollo';

const GQL_LOGIN = require('@store/graphql/Login.gql');
import { Me } from '@store/type/Me';

export { GQL_LOGIN };
export class LoginMutation extends Mutation<Me> {}
