import { Query } from 'react-apollo';

import { MeOutput } from '@store/type/Me';
const GQL_ME = require('@store/graphql/Me.gql');

export { GQL_ME, MeOutput };
export class MeQuery extends Query<MeOutput> {}
