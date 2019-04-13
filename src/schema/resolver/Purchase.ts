import { Purchase } from '@entity/Purchase';
import { User } from '@entity/User';
import { UserPart } from '@entity/UserPart';
import { getRepository } from 'typeorm';

const resolver = {
  Purchase: {
    user: (parent: Purchase) =>
      getRepository(User)
      .findOne({ where: { purchase: parent } }),

    parts: (parent: Purchase) =>
      getRepository(UserPart)
        .find({ where: { purchase: parent } }),
  },
};

export default resolver;
