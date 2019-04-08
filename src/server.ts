import { ApolloServer } from 'apollo-server-koa';
import * as fs from 'fs';
import * as jsonwebtoken from 'jsonwebtoken';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as serve from 'koa-static';
import * as moment from 'moment-timezone';
import schema from './schema';
import { signAndSaveSession } from './util/jwt';

import { getRepository } from 'typeorm';
import { Jwt } from './entity/Jwt';
import { User } from './entity/User';

interface ServerConfig {
  jwtSecret: string;
  port: number;
}

const jwtDecodeToken = async (ctx: Koa.Context, next: any) => {
  const jwtCookie = ctx.cookies.get('jwt');
  let user: { id: string } = { id: '0' };
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

class Server {
  port: number;
  app: Koa;

  constructor(config: ServerConfig) {
    const app = new Koa();

    // Serve up static files from client dir
    const clientBuildDir =
      process.env.ENVIRONMENT === 'prod' ? '/app/client/build' : 'client/build';
    app.use(serve(clientBuildDir));

    // set up jwt for remaining paths
    // passthrough true ensures you can still access paths w/o auth
    // each path will check authorization individually
    app.use(jwtDecodeToken);

    // Create Graphql server and apply it
    const apollo = new ApolloServer({
      schema,
      playground: process.env.ENVIRONMENT !== 'prod',
      context: ({ ctx }) => ({ koaCtx: ctx }),
    });
    apollo.applyMiddleware({ app });

    // Create routes
    const router = new KoaRouter();

    // Hello World!
    router.get('/hello', async (ctx) => {
      const count = await getRepository(User).count();
      ctx.body = `Hello World!! There are ${count} users.`;
      return ctx;
    });

    // Serve up the app for any non-matched urls
    // frontend router will take over from there
    router.all('*', (ctx) => {
      console.log('catchall');
      ctx.body = fs
        .readFileSync(`${clientBuildDir}/index.html`)
        .toString();
      return ctx;
    });

    // Apply the router
    app.use(router.routes());
    app.use(router.allowedMethods());

    // Set our props
    this.port = config.port;
    this.app = app;
  }

  start() {
    console.log('server starting...');
    return this.app.listen(this.port);
  }
}

export default Server;
