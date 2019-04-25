import { Company } from '@entity/Company';
import { Like } from '@entity/Like';
import { SocialMediaLink, sortLinks } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface CreateCompanyArgs {
  name: string;
  country?: string;
  website?: string;
}

const resolver = {
  Company: {
    socialLinks: async (parent: Company) => {
      const links = await getRepository(SocialMediaLink)
        .find({ where: { company: parent } });
      return links.sort(sortLinks);
    },

    addedBy: async (parent: Company, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user || !user.isMod || !user.isAdmin) {
        return null;
      }
      return getRepository(User)
        .findOne({ where: { addedCompanies: parent } });
    },

    likes: (parent: Company) =>
      getRepository(Like)
        .find({ where: { company: parent } }),
  },

  Query: {
    company: (_: any, args: IdArgs) =>
      getRepository(Company).findOne(args.id),

    getCompanies: () =>
      getRepository(Company).find({
        order: {
          name: 'ASC',
        },
      }),
  },

  Mutation: {
    createCompany: async (_: any, args: CreateCompanyArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const addedBy = await getRepository(User)
        .findOne(userId, { relations: ['createBan'] });
      if (!addedBy) {
        throw new AuthenticationError('You must be logged in');
      }
      if (addedBy.createBan) {
        throw new AuthenticationError(`You cannot create companies: ${addedBy.createBan.reason}`);
      }

      const existing = await getRepository(Company)
        .findOne({ where: { name: args.name } });
      if (existing) {
        return existing;
      }

      const company = new Company();
      company.name = args.name;
      company.addedBy = addedBy;
      company.vetted = addedBy.isMod || addedBy.isAdmin;
      if (args.country) {
        company.country = args.country;
      }

      await getRepository(Company).save(company);

      if (args.website) {
        const websiteLink = new SocialMediaLink();
        websiteLink.company = company;
        websiteLink.addedBy = addedBy;
        websiteLink.service = 'website';
        websiteLink.url = args.website;

        await getRepository(SocialMediaLink).save(websiteLink);
      }

      return company;
    },
  },
};

export default resolver;
