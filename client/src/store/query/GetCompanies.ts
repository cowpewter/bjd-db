import { Query } from 'react-apollo';

import { MinimalCompany } from '@store/type/Company';
const GQL_GET_COMPANIES = require('@store/graphql/GetCompanies.gql');

export interface GetCompaniesOutput {
  getCompanies: MinimalCompany[];
}

export { GQL_GET_COMPANIES };
export class GetCompaniesQuery extends Query<GetCompaniesOutput> {}
