import { Company } from '@entity/Company';
import { ResinColor, ResinColorFamilyType, ResinType } from '@entity/ResinColor';
import { User } from '@entity/User';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface GetCompanyResinArgs {
  companyId: string;
}

interface CreateResinColorArgs {
  name: string;
  type: ResinType;
  colorFamily: ResinColorFamilyType;
  companyId: string;
}

const resolver = {
  ResinColor: {
    company: (parent: ResinColor) =>
      getRepository(Company)
        .findOne({ where: { resinColor: parent } }),

    addedBy: async (parent: ResinColor, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user || !user.isMod || !user.isAdmin) {
        return null;
      }
      return getRepository(User)
        .findOne({ where: { addedResinColors: parent } });
    },
  },

  Query: {
    getCompanyResin: (_: any, args: GetCompanyResinArgs) =>
      getRepository(ResinColor)
        .find({
          where: { company: { id: args.companyId } },
          order: { colorFamily: 'ASC' },
        }),
  },

  Mutation: {
    createResinColor: async (_: any, args: CreateResinColorArgs, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const addedBy = await getRepository(User)
        .findOne(userId, { relations: ['createBan'] });
      if (!addedBy) {
        throw new AuthenticationError('You must be logged in');
      }
      if (addedBy.createBan) {
        throw new AuthenticationError(`You cannot create parts: ${addedBy.createBan.reason}`);
      }

      const company = new Company();
      company.id = args.companyId;

      const existing = await getRepository(ResinColor)
        .findOne({ where: {
          company, name: args.name, type: args.type, colorFamily: args.colorFamily,
        } });

      if (existing) {
        return existing;
      }

      const resinColor = new ResinColor();
      resinColor.company = company;
      resinColor.name = args.name;
      resinColor.type = args.type;
      resinColor.colorFamily = args.colorFamily;
      resinColor.addedBy = addedBy;
      resinColor.vetted = addedBy.isMod || addedBy.isAdmin;

      await getRepository(ResinColor).save(resinColor);
      return resinColor;
    },
  },
};

export default resolver;
