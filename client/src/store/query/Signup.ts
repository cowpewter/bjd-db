import { Mutation } from 'react-apollo';

const GQL_SIGNUP = require('@store/graphql/Signup.gql');
import { Me } from '@store/type/Me';

export { GQL_SIGNUP };
export class SignupMutation extends Mutation<Me> {}
