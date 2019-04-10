import { Query } from 'react-apollo';
import { getGQL } from './';

import { MeOutput } from '@store/types/Me';
const GQL_ME = require('@store/graphql/Me.gql');

export { GQL_ME, MeOutput };
export class MeQuery extends Query<MeOutput> {}
