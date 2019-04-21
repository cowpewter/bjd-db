import { Query } from 'react-apollo';

import { MinimalDollPart } from '@store/type/DollPart';
const GQL_GET_COMPANY_PARTS = require('@store/graphql/GetCompanyParts.gql');

export interface GetCompanyPartsOutput {
  getCompanyParts: MinimalDollPart[];
}

export { GQL_GET_COMPANY_PARTS };
export class GetCompanyPartsQuery extends Query<GetCompanyPartsOutput> {}
