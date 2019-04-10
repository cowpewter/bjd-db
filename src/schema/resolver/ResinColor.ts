import { Company } from '@entity/Company';
import { ResinColor } from '@entity/ResinColor';
import { getRepository } from 'typeorm';

const resolver = {
  ResinColor: {
    company: (parent: ResinColor) =>
      getRepository(Company)
        .findOne({ where: { resinColor: parent } }),
  },
};

export default resolver;
