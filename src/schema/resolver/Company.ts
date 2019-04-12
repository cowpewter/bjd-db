import { Company } from '@entity/Company';
import { SocialMediaLink } from '@entity/SocialMediaLink';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  Company: {
    socialLinks: (parent: Company) =>
      getRepository(SocialMediaLink)
        .find({ where: { company: parent } }),
  },

  Query: {
    company: (_: any, args: IdArgs) =>
      getRepository(Company).findOne(args.id),
  },
};

export default resolver;
