import { Query } from 'react-apollo';

import { UserProfileByNameOutput } from '@store/type/UserProfile';
const GQL_USER_PROFILE = require('@store/graphql/UserProfile.gql');

export { GQL_USER_PROFILE, UserProfileByNameOutput };
export class UserProfileQuery extends Query<UserProfileByNameOutput> {}
