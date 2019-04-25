import { Company } from '@entity/Company';
import { DollScaleType } from '@entity/DollConfiguration';
import { DollPart, DollPartType } from '@entity/DollPart';
import { User } from '@entity/User';
import { GQLContext } from '@schema/index';
import { AuthenticationError } from 'apollo-server';
import { getRepository } from 'typeorm';

interface GetCompanyPartsArgs {
  companyId: string;
  type: DollPartType;
  scale: DollScaleType;
}

interface CreateDollPartArgs {
  name: string;
  companyId: string;
  type: DollPartType;
  scale: DollScaleType;
}

const resolver = {
  DollPart: {
    company: (parent: DollPart) =>
      getRepository(Company)
        .findOne({ where: { dollPart: parent } }),

    addedBy: async (parent: DollPart, _: any, ctx: GQLContext) => {
      const { id: userId } = ctx.koaCtx.user;
      const user = await getRepository(User)
        .findOne(userId);
      if (!user || !user.isMod || !user.isAdmin) {
        return null;
      }
      return getRepository(User)
        .findOne({ where: { addedDollParts: parent } });
    },
  },

  Query: {
    getCompanyParts: (_: any, args: GetCompanyPartsArgs) =>
      getRepository(DollPart)
        .find({
          where: { company: { id: args.companyId }, type: args.type, scale: args.scale },
          order: { name: 'ASC' },
        }),
  },

  Mutation: {
    createDollPart: async (_: any, args: CreateDollPartArgs, ctx: GQLContext) => {
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

      const existing = await getRepository(DollPart)
        .findOne({ where: { company, name: args.name, type: args.type, scale: args.scale } });

      console.log('EXISTING', existing);

      if (existing) {
        console.log(existing);
        return existing;
      }

      const part = new DollPart();
      part.name = args.name;
      part.type = args.type;
      part.scale = args.scale;
      part.company = company;
      part.addedBy = addedBy;
      part.vetted = addedBy.isMod || addedBy.isAdmin;

      await getRepository(DollPart).save(part);
      console.log(part);
      return part;
    },
  },
};

export default resolver;
