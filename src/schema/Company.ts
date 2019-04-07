import { getRepository } from 'typeorm';
import { Company } from '../entity/Company';
import { IdArgs } from './args';

export const typeDef = `
extend type Query {
  company(id: ID!): Company
}

type Company {
  id: ID!
  name: String!
  country: String
  website: String
}
`;

export const resolver = {
  Query: {
    company: (_: any, args: IdArgs) =>
      getRepository(Company).findOne(args.id),
  },
};
