import { Query } from 'react-apollo';

import { MinimalResinColor } from '@store/type/ResinColor';
const GQL_GET_COMPANY_RESIN = require('@store/graphql/GetCompanyResin.gql');

export interface GetCompanyResinOutput {
  getCompanyResin: MinimalResinColor[];
}

export { GQL_GET_COMPANY_RESIN };
export class GetCompanyResinQuery extends Query<GetCompanyResinOutput> {}
