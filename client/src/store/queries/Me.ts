import { Query } from 'react-apollo';

import GQL_ME from '../graphql/Me';
import { MeData } from '../types/Me';

export { GQL_ME, MeData };

export default class MeQuery extends Query<MeData> {}
