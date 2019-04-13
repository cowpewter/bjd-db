import { Company } from '@entity/Company';
import { SocialMediaLink, sortLinks } from '@entity/SocialMediaLink';
import { IdArgs } from '@schema/args';
import { getRepository } from 'typeorm';

const resolver = {
  Company: {
    socialLinks: async (parent: Company) => {
      const links = await getRepository(SocialMediaLink)
        .find({ where: { company: parent } });
      return links.sort(sortLinks);
    },
  },

  Query: {
    company: (_: any, args: IdArgs) =>
      getRepository(Company).findOne(args.id),
  },
};

export default resolver;
