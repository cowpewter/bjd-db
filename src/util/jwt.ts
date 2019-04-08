import * as jsonwebtoken from 'jsonwebtoken';
import * as Koa from 'koa';
import * as moment from 'moment';
import { getManager, getRepository } from 'typeorm';
import { Jwt } from '../entity/Jwt';
import { User } from '../entity/User';
import { StringToBoolean } from './types';

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
      },
    },
    process.env.JWT_SECRET!,
    { expiresIn },
  );
};

export const setJwtCookie = (koaCtx: Koa.Context, token: string) => {
  koaCtx.cookies.set(
    'jwt',
    token,
    { httpOnly: true, expires: moment().add('30d').toDate() },
  );
};

export const clearJwtCookie = (koaCtx: Koa.Context) => {
  koaCtx.cookies.set(
    'jwt',
    '',
    { httpOnly: true },
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
