import * as jsonwebtoken from 'jsonwebtoken';
import * as Koa from 'koa';
import * as moment from 'moment';
import { getManager, getRepository } from 'typeorm';
import { Jwt } from '../../entity/Jwt';
import { User } from '../../entity/User';
import { StringToBoolean } from '../../library/types';

export const cookieMiddleware = async (ctx: Koa.Context, next: any) => {
  ctx.cookie = {};
  const cookieHeader = ctx.headers.cookie;
  console.log('raw cookies', cookieHeader, ctx.cookies.get('jwt'));
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    cookies.forEach((item: string) => {
      const crumbs = item.split('=');
      if (crumbs.length > 1) {
        ctx.cookie[crumbs[0].trim()] = crumbs[1].trim();
      }
    });
  }
  return await next();
};

export const jwtSessionMiddleware = async (ctx: Koa.Context, next: any) => {
  const jwtCookie = ctx.cookies.get('jwt');
  console.log('cookie', jwtCookie);
  let user: { id: string, username: string } = { id: '0', username: '' };
  if (jwtCookie) {
    try {
      const tokenData: any = jsonwebtoken.verify(
        jwtCookie,
        process.env.JWT_SECRET!,
      );
      // Check the expire time and issue a new jwt if we're expiring in 1 day
      console.log('tokendata', tokenData);

      const jwtRow = await getRepository(Jwt).findOne({ token: jwtCookie });
      if (tokenData.user && jwtRow && !jwtRow.revoked) {
        user = tokenData.user;

        // If token expires in a day, set a new one
        if (tokenData.exp < moment().subtract('1d').unix()) {
          const tokenUser = new User();
          tokenUser.id = user.id;
          signAndSaveSession(tokenUser, ctx);
        }
      }
    } catch (e) {
      if (ctx.originalUrl === '/graphql') {
        ctx.body = {
          errors: [{
            message: 'You have been signed out. Please sign in again.',
            data: {
              type: 'SignedOutError',
            },
          }],
        };
        return;
      }
    }
  }
  console.log('current user', user);
  ctx.user = user;
  ctx.jwt = jwtCookie || '';
  await next();
};

export const cleanJwts = async () => {
  await getManager().query(`
    DELETE FROM jwt
    WHERE createTimestamp <= NOW() - INTERVAL 31 DAY
  `);
};

export const signAndSaveSession = (user: User, koaCtx: Koa.Context) => {
  const token = signToken(user, '30d');
  saveToken(token, user);
  setJwtCookie(koaCtx, token);
};

export const signToken = (user: User, expiresIn: string) => {
  return jsonwebtoken.sign(
    {
      user: {
        id: user.id,
        username: user.username,
        timestamp: new Date().valueOf(),
      },
    },
    process.env.JWT_SECRET!,
    { expiresIn },
  );
};

export const setJwtCookie = (koaCtx: Koa.Context, token: string) => {
  console.log('setting cookie to', token);
  console.log('expires', moment().add(30, 'days').toDate());
  koaCtx.cookies.set(
    'jwt',
    token,
    { httpOnly: false, expires: moment().add(30, 'days').toDate() },
  );
};

export const clearJwtCookie = (koaCtx: Koa.Context) => {
  koaCtx.cookies.set(
    'jwt',
    '',
    { httpOnly: false },
  );
};

export const saveToken = (token: string, user: User) => {
  const jwt = new Jwt();
  jwt.token = token;
  jwt.user = user;
  getRepository(Jwt).save(jwt);
};

export const revokeToken = async (token: string) => {
  const jwt = await getRepository(Jwt)
    .findOne({ token });
  if (jwt) {
    jwt.revoked = true;
    getRepository(Jwt).save(jwt);
  }
};

export const revokeAllTokens = async (user: User, exclude: StringToBoolean) => {
  const jwts = await getRepository(Jwt)
    .find({ user });
  jwts.forEach((jwt) => {
    if (!exclude[jwt.token]) {
      jwt.revoked = true;
    }
  });
  getRepository(Jwt).save(jwts);
};
