import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { getManager, getRepository } from 'typeorm';
import { Album } from '../entity/Album';
import { Doll } from '../entity/Doll';
import { DollWishlist } from '../entity/DollWishlist';
import { EmailAddress } from '../entity/EmailAddress';
import { baseUserImageUrl, Image } from '../entity/Image';
import { Jwt } from '../entity/Jwt';
import { User } from '../entity/User';
import cleanJwts from '../util/cleanJwts';
import { IdArgs } from './args';
import { AuthError, LoginError, PasswordError, SignupError, UserNotFoundError } from './errors';
import { GQLContext } from './index';

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

interface StringToBoolean {
  [key: string]: boolean;
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

const signToken = (user: User, expiresIn: string) => {
  return jsonwebtoken.sign(
    {
      user: {
        id: user.id,
      },
    },
    process.env.JWT_SECRET!,
    { expiresIn },
  );
};

const setJwtCookie = (ctx: GQLContext, token: string) => {
  ctx.koaCtx.cookies.set(
    'jwt',
    token,
    { httpOnly: false, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
  );
};

const clearJwtCookie = (ctx: GQLContext) => {
  ctx.koaCtx.cookies.set(
    'jwt',
    '',
    { httpOnly: false },
  );
};

const saveToken = (token: string, user: User) => {
  const jwt = new Jwt();
  jwt.token = token;
  jwt.user = user;
  getRepository(Jwt).save(jwt);
};

const revokeToken = async (token: string) => {
  const jwt = await getRepository(Jwt)
    .findOne({ token });
  if (jwt) {
    jwt.revoked = true;
    getRepository(Jwt).save(jwt);
  }
};

const revokeAllTokens = async (user: User, exclude: StringToBoolean) => {
  const jwts = await getRepository(Jwt)
    .find({ user });
  jwts.forEach((jwt) => {
    if (!exclude[jwt.token]) {
      jwt.revoked = true;
    }
  });
  getRepository(Jwt).save(jwts);
};

export const typeDef = `
extend type Query {
  User: User
  me: User
  user(id: ID!): User
}

extend type Mutation {
  login(username: String!, password: String!): User
  logout: SuccessOutput
  signup(username: String!, password: String!, emailAddress: String!): User
  changePassword(existingPassword: String!, newPassword: String!): SuccessOutput
  initiatePasswordReset(username: String!): SuccessOutput
  resetPassword(token: String!, newPassword: String!): SuccessOutput
}

type User {
  id: ID!
  username: String!
  emailAddress: String!
  profileImage: String
  dolls: [Doll!]
  dollWishlists: [DollWishlist!]
  albums: [Album!]
  isAdmin: Boolean
  isMod: Boolean
  subscriptions: Subscriptions
}
`;

export const resolver = {
  User: {
    async emailAddress(user: User) {
      const email = await getRepository(EmailAddress)
        .findOne(user.emailAddress);
      return email ? email.emailAddress : null;
    },
    async profileImage(user: User) {
      const image = await getRepository(Image)
        .findOne(user.profileImage);
      if (!image) {
        return null;
      }
      return `${baseUserImageUrl}/${user.id}/${image.filename}`;
    },
    dolls(user: User, _: any, ctx: GQLContext) {
      const where = ctx.koaCtx.user.id === user.id ?
        { user } :
        { user, isPrivate: false };
      return getRepository(Doll)
          .find(where);
    },
    dollWishlists(user: User, _: any, ctx: GQLContext) {
      const where = ctx.koaCtx.user.id === user.id ?
        { user } :
        { user, isPrivate: false };
      return getRepository(DollWishlist)
          .find(where);
    },
    albums(user: User, _: any, ctx: GQLContext) {
      const where = ctx.koaCtx.user.id === user.id ?
        { user } :
        { user, isPrivate: false };
      return getRepository(Album)
          .find(where);
    },
    isAdmin(user: User, _: any, ctx: GQLContext) {
      return ctx.koaCtx.user.id === user.id ?
        user.isAdmin :
        null;
    },
    isMod(user: User, _: any, ctx: GQLContext) {
      console.log(ctx.koaCtx.user.user);
      return ctx.koaCtx.user.id === user.id ?
        user.isMod :
        null;
    },
    async subscriptions(user: User, _: any, ctx: GQLContext) {
      if (ctx.koaCtx.user.id !== user.id) {
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
          [user.id],
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
      if (ctx.user && ctx.user.id) {
        return getRepository(User)
          .findOne({ id: ctx.user.id });
      }
      return null;
    },

    user: async (_: any, args: IdArgs) => {
      return await getRepository(User).findOne(args.id);
    },
  },

  Mutation: {
    login: async (_:any, args: LoginArgs, ctx: GQLContext) => {
      const user = await findUserByEmailOrUsername(args.username);
      const authError = new LoginError({
        data: {
          fields: {
            username: { valid: false, message: '' },
            password: { valid: false, message: '' },
          },
        },
      });

      if (!user) {
        throw authError;
      }
      const valid = await validatePassword(user, args.password);
      if (!valid) {
        throw authError;
      }

      // Generate token and save to cookies
      const token = signToken(user, '30d');
      saveToken(token, user);
      setJwtCookie(ctx, token);

      // 10% chance on any login to clear old Jwts out of MySql
      // @todo Temporary until we can afford Redis
      if (Math.random() < .1) {
        cleanJwts();
      }

      return user;
    },

    logout: (_:any, __:any, ctx: GQLContext) => {
      clearJwtCookie(ctx);
      revokeToken(ctx.jwt);
      return { success: true };
    },

    signup: async (_: any, args: SignupArgs, ctx: GQLContext) => {
      const user = await getRepository(User)
        .findOne({ username: args.username });
      const email = await getRepository(EmailAddress)
        .findOne({ emailAddress: args.emailAddress });

      if (user || email) {
        throw new SignupError({
          data: {
            fields: {
              username: {
                valid: !user,
                message: user ? 'This username is already in use' : '',
              },
              emailAddress: {
                valid: !email,
                message: email ? 'This email address is already in use' : '',
              },
            },
          },
        });
      }
      const newAddress = new EmailAddress();
      newAddress.emailAddress = args.emailAddress;
      const newUser = new User();
      newUser.username = args.username;
      newUser.password = args.password;
      newUser.emailAddress = newAddress;
      await getRepository(EmailAddress).save(newAddress);
      await getRepository(User).save(newUser);

      // Generate token and save to cookies
      const token = signToken(newUser, '30d');
      saveToken(token, newUser);
      setJwtCookie(ctx, token);

      return newUser;
    },

    changePassword: async (_: any, args: ChangePasswordArgs, ctx: GQLContext) => {
      const user = await getRepository(User)
        .findOne(ctx.koaCtx.user.id);
      if (!user) {
        throw new AuthError();
      }

      const validPW = await validatePassword(user, args.existingPassword);
      if (!validPW) {
        throw new PasswordError({
          data: {
            fields: {
              existingPassword: { valid: false, message: '' },
              newPassword: { valid: true, message: '' },
            },
          },
        });
      }

      user.password = args.newPassword;
      await getRepository(User).save(user);
      const exclude: StringToBoolean = {};
      exclude[ctx.jwt] = true;
      revokeAllTokens(user, exclude);

      return { success: true };
    },

    initiatePasswordReset: async (_: any, args: InitPwResetArgs) => {
      const user = await findUserByEmailOrUsername(args.username);
      if (!user) {
        throw new UserNotFoundError({
          data: {
            fields: {
              username: { valid: false, message: '' },
            },
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
        throw new UserNotFoundError();
      }

      const user = await getRepository(User)
        .findOne(tokenData.user.id);
      if (!user) {
        throw new UserNotFoundError();
      }

      user.password = args.newPassword;
      await getRepository(User).save(user);

      return { success: true };
    },
  },
};
