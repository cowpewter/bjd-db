import { Company } from '@entity/Company';
import { DollPart } from '@entity/DollPart';
import { getRepository } from 'typeorm';

// default resolvers are sufficient
const resolver = {
  DollPart: {
    company: (parent: DollPart) =>
      getRepository(Company)
        .findOne({ where: { dollPart: parent } }),
  },
};

export default resolver;
