import { Company } from '@entity/Company';
import { ResinColor } from '@entity/ResinColor';
import { User } from '@entity/User';
import { GQLContext } from '@schema/index';
import { getRepository } from 'typeorm';

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
};

export default resolver;
