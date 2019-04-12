import { AuthenticationError, UserInputError } from 'apollo-server';

import { Album } from '@entity/Album';
import { Doll } from '@entity/Doll';
import { DollWishlist } from '@entity/DollWishlist';
import { EmailAddress } from '@entity/EmailAddress';
import { Image } from '@entity/Image';
import { SocialMediaLink } from '@entity/SocialMediaLink';
import { User } from '@entity/User';
import { UserDescription } from '@entity/UserDescription';
import {
  cleanJwts,
  clearJwtCookie,
  revokeAllTokens,
  revokeToken,
  signAndSaveSession,
} from '@library/jwt';
import { StringToBoolean } from '@library/types';
import { IdArgs } from '@schema/args';
import { GQLContext } from '@schema/index';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { getManager, getRepository } from 'typeorm';

interface LoginArgs {
  username: string;
  password: string;
}

interface SignupArgs {
  username: string;
  password: string;
  emailAddress: string;
}

interface ChangePasswordArgs {
  existingPassword: string;
  newPassword: string;
}

interface ChangePasswordArgs {
  existingPassword: string;
  newPassword: string;
}

interface InitPwResetArgs {
  username: string;
}

interface ResetPasswordArgs {
  token: string;
  newPassword: string;
}

interface UsernameArgs {
  username: string;
}

interface DescriptionArgs {
  id: string;
  description: string;
}

const findUserByEmailOrUsername = (username: string): Promise<User | undefined> =>
  getRepository(User)
    .createQueryBuilder('user')
    .innerJoin('user.emailAddress', 'emailAddress')
    .where('user.username = :username OR emailAddress.emailAddress = :username', { username })
    .getOne();

const validatePassword = async (user: User, password: string): Promise<boolean> => {
  const { password: hashedPw } = await getRepository(User)
    .createQueryBuilder('user')
    .select('password')
    .where('user.id = :id', { id: user.id })
    .getRawOne();
  return bcrypt.compare(password, hashedPw);
};

const resolver = {
  User: {
    emailAddress: async (parent: User) => {
      const email = await getRepository(EmailAddress)
        .findOne(parent.emailAddress);
      return email ? email.emailAddress : null;
    },

    profileImage: (parent: User) =>
      getRepository(Image)
        .findOne({ where: { id: parent.profileImage } }),

    description: async (parent: User) => {
      const result = await getRepository(UserDescription)
        .findOne({ where: { user: parent } });
      return (result && result.description) || null;
    },

    socialLinks: (parent: User) =>
      getRepository(SocialMediaLink)
        .find({ where: { user: parent } }),

    dolls: (parent: User, _: any, ctx: GQLContext) => {
      const where = ctx.koaCtx.user.id === parent.id ?
        { parent } :
        { parent, isPrivate: false };
      return getRepository(Doll)
          .find({ where });
    },

    dollWishlists: (parent: User, _: any, ctx: GQLContext) => {
      const where = ctx.koaCtx.user.id === parent.id ?
        { parent } :
        { parent, isPrivate: false };
      return getRepository(DollWishlist)
          .find({ where });
    },

    albums: (parent: User, _: any, ctx: GQLContext) => {
      const where = ctx.koaCtx.user.id === parent.id ?
        { parent } :
        { parent, isPrivate: false };
      return getRepository(Album)
          .find({ where });
    },

    isAdmin: (parent: User, _: any, ctx: GQLContext) =>
      ctx.koaCtx.user.id === parent.id ?
        parent.isAdmin :
        null,

    isMod: (parent: User, _: any, ctx: GQLContext) =>
      ctx.koaCtx.user.id === parent.id ?
        parent.isMod :
        null,

    subscriptions: async (parent: User, _: any, ctx: GQLContext) => {
      if (ctx.koaCtx.user.id !== parent.id) {
        return null;
      }
      // @todo how the hell do i convert this to typeorm?
      const subs = await getManager()
        .query(
          `SELECT sTag.name FROM subscription_tag sTag
          INNER JOIN email_address_categories_subscription_tag joinTag
            ON sTag.id = joinTag.subscriptionTagId
          INNER JOIN user on user.emailAddressId = joinTag.emailAddressId
          WHERE user.id = ?;`,
          [parent.id],
      );
      const subByName = subs.reduce(
        (acc: any, cur: { name: string }) => {
          acc[cur.name] = true;
        },
        {},
      );
      return {
        security: !!subByName['security'],
        newsletter: !!subByName['newsletter'],
        dollComment: !!subByName['dollComment'],
        albumComment: !!subByName['albumComment'],
      };
    },
  },

  Query: {
    me: async (_: any, __: any, ctx: GQLContext) => {
      if (ctx.koaCtx.user.id !== '0') {
        return getRepository(User)
          .findOne({ id: ctx.koaCtx.user.id });
      }
      return null;
    },

    user: (_: any, args: IdArgs) =>
      getRepository(User).findOne(args.id),

    userByName: (_: any, args: UsernameArgs) =>
      getRepository(User).findOne({ username: args.username }),
  },

  Mutation: {
    login: async (_: any, args: LoginArgs, ctx: GQLContext) => {
      const user = await findUserByEmailOrUsername(args.username);
      console.log('login', user);
      const authError = new UserInputError('Invalid username or password');

      if (!user) {
        throw authError;
      }
      const valid = await validatePassword(user, args.password);
      if (!valid) {
        throw authError;
      }

      // Generate token and save to cookies/db
      signAndSaveSession(user, ctx.koaCtx);

      // 10% chance on any login to clear old Jwts out of MySql
      // @todo Temporary until we can afford Redis
      if (Math.random() < .1) {
        cleanJwts();
      }

      return user;
    },

    logout: (_: any, __: any, ctx: GQLContext) => {
      clearJwtCookie(ctx.koaCtx);
      revokeToken(ctx.koaCtx.jwt);
      return { success: true };
    },

    signup: async (_: any, args: SignupArgs, ctx: GQLContext) => {
      const user = await getRepository(User)
        .findOne({ username: args.username });
      const email = await getRepository(EmailAddress)
        .findOne({ emailAddress: args.emailAddress });

      if (user || email) {
        const validationErrors: any = {};
        if (user) {
          validationErrors.username = 'This username is already in use';
        }
        if (email) {
          validationErrors.emailAddress = 'This email address is already in use';
        }
        throw new UserInputError('Unable to create account', { validationErrors });
      }

      const newAddress = new EmailAddress();
      newAddress.emailAddress = args.emailAddress;
      const newUser = new User();
      newUser.username = args.username;
      newUser.password = args.password;
      newUser.emailAddress = newAddress;
      await getRepository(EmailAddress).save(newAddress);
      await getRepository(User).save(newUser);

      // Generate token and save to cookies/db
      signAndSaveSession(newUser, ctx.koaCtx);

      return newUser;
    },

    changePassword: async (_: any, args: ChangePasswordArgs, ctx: GQLContext) => {
      const user = await getRepository(User)
        .findOne(ctx.koaCtx.user.id);
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const validPW = await validatePassword(user, args.existingPassword);
      if (!validPW) {
        throw new UserInputError('', {
          validationErrors: {
            existingPassword: 'Password incorrect',
          },
        });
      }

      user.password = args.newPassword;
      await getRepository(User).save(user);
      const exclude: StringToBoolean = {};
      exclude[ctx.koaCtx.jwt] = true;
      revokeAllTokens(user, exclude);

      return { success: true };
    },

    initiatePasswordReset: async (_: any, args: InitPwResetArgs) => {
      const user = await findUserByEmailOrUsername(args.username);
      if (!user) {
        throw new UserInputError('', {
          validationErrors: {
            username: `No user found for ${args.username}`,
          },
        });
      }

      // @todo trigger email to user with token link
      /*
      const token = signToken(user, '30m');
      sendEmailToUser(user, email);
      */

      return { success: true };
    },

    resetPassword: async (_: any, args: ResetPasswordArgs) => {
      const tokenData: any = jsonwebtoken.verify(
        args.token,
        process.env.JWT_SECRET!,
      );
      if (!tokenData.user || !tokenData.user.id) {
        throw new AuthenticationError('You must be logged in');
      }

      const user = await getRepository(User)
        .findOne(tokenData.user.id);
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      user.password = args.newPassword;
      await getRepository(User).save(user);

      return { success: true };
    },

    saveUserDescription: async (_: any, args: DescriptionArgs, ctx: GQLContext) => {
      if (!ctx.koaCtx.user.id) {
        throw new AuthenticationError('You must be logged in');
      }
      if (args.id !== ctx.koaCtx.user.id) {
        throw new UserInputError('You can only edit your own profile');
      }
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.description', 'description')
        .where('user.id =:id', { id: args.id })
        .getOne();

      if (!user) {
        throw new Error('An unexpected error occured. Your changes were not saved.');
      }

      if (!user.description) {
        user.description = new UserDescription();
      }
      user.description.description = args.description;
      await getRepository(UserDescription).save(user.description);
      await getRepository(User).save(user);

      return user;
    },
  },
};

export default resolver;
