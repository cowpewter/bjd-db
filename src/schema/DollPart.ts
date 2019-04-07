import { getRepository } from 'typeorm';
import { Company } from '../entity/Company';
import { DollPart } from '../entity/DollPart';

export const typeDef = `
type DollPart {
  id: ID!
  type: String!
  name: String!
  company: Company
}
`;

// default resolvers are sufficient
export const resolver = {
  DollPart: {
    company: (parent: DollPart) =>
      getRepository(Company)
        .findOne({ where: { dollPart: parent } }),
  },
};
