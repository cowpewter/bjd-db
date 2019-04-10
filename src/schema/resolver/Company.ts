import { Company } from '@entity/Company';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  Query: {
    company: (_: any, args: IdArgs) =>
      getRepository(Company).findOne(args.id),
  },
};

export default resolver;
