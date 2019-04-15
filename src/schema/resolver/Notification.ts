import { Notification } from '@entity/Notification';
import { User } from '@entity/User';
import { IdsArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import { UserInputError } from 'apollo-server';
import { getRepository, In } from 'typeorm';

const resolver = {
  Notification: {
    user: (parent: Notification) =>
      getRepository(User)
        .findOne({ where: { notification: parent } }),
  },

  Mutation: {
    markNotificationsRead: async (_: any, args: IdsArgs, ctx: GQLContext) => {
      if (args.ids.length === 0) {
        throw new UserInputError('You must provide notification ids');
      }
      const { id: userId } = ctx.koaCtx.user;
      let notifs = await getRepository(Notification)
        .find({ where: { id: In(args.ids) }, relations: ['user'] });

      notifs = notifs.filter(notif => notif.user.id === userId);
      if (notifs.length === 0) {
        throw new UserInputError('You can only mark your own notifications as read');
      }

      notifs.forEach((notif) => {
        notif.read = true;
      });
      await getRepository(Notification).save(notifs);
      return notifs;
    },
  },
};

export default resolver;
