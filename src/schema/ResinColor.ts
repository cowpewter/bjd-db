import { getRepository } from 'typeorm';
import { Company } from '../entity/Company';
import { ResinColor } from '../entity/ResinColor';

export const typeDef = `
type ResinColor {
  id: ID!
  name: String!
  colorType: String!
  type: String!
  company: Company!
}
`;

// default resolvers are sufficient
export const resolver = {
  ResinColor: {
    company: (parent: ResinColor) =>
      getRepository(Company)
        .findOne({ where: { resinColor: parent } }),
  },
};
