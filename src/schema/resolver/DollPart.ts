import { Company } from '@entity/Company';
import { DollPart } from '@entity/DollPart';
import { User } from '@entity/User';
import { GQLContext } from '@schema/index';
import { getRepository } from 'typeorm';

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
};

export default resolver;
