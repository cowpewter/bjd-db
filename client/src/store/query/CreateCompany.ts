import { Mutation } from 'react-apollo';

const GQL_CREATE_COMPANY = require('@store/graphql/CreateCompany.gql');
import { Company } from '@store/type/Company';

export interface CreateCompanyOutput {
  createCompany: Company;
}

export { GQL_CREATE_COMPANY };
export class CreateCompanyMutation extends Mutation<CreateCompanyOutput> {}
