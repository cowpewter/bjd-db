// import { graphqlKoa } from 'apollo-server-koa';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as KoaJwt from 'koa-jwt';
import * as KoaRouter from 'koa-router';
import * as serve from 'koa-static';

import { getRepository } from 'typeorm';
import { User } from './entity/User';

interface ServerConfig {
  jwtSecret: string;
  port: number;
}

class Server {
  port: number;
  app: Koa;

  constructor(config: ServerConfig) {
    this.port = config.port;
    this.app = new Koa();

    // Serve up static files from client dir
    const clientBuildDir =
      process.env.ENVIRONMENT === 'prod' ? '/app/client/build' : 'client/build';
    this.app.use(serve(clientBuildDir));

    // set up jwt for remaining paths
    // passthrough true ensures you can still access paths w/o auth
    // each path will check authorization individually
    this.app.use(KoaJwt({ secret: config.jwtSecret, passthrough: true }));

    // Create routes
    const router = new KoaRouter();

    // Serve up LetsEncrypt Acme Challenge
    router.get('/.well-known/acme-challenge/ebbKdpC4RIT8GtWTYsJEjMAfaCP3_sUyNboOk5dE8Bc', (ctx) => {
      ctx.body =
        'ebbKdpC4RIT8GtWTYsJEjMAfaCP3_sUyNboOk5dE8Bc.9Jod_2D9joc-SdG9DYSwY0Tf8Dp13YDu57kJS_emxSs';
      return ctx;
    });

    // Hello World!
    router.get('/hello', async (ctx) => {
      const count = await getRepository(User).count();
      ctx.body = `Hello World!! There are ${count} users.`;
      return ctx;
    });

    // @todo api endpoints
    /*
    router.get('/graphql', ctx => {

    });
    */

    // Serve up the app for any non-matched urls
    // frontend router will take over from there
    router.all('*', (ctx) => {
      console.log('catchall');
      ctx.body = fs
        .readFileSync(`${clientBuildDir}/index.html`)
        .toString();
      return ctx;
    });

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());

  }

  start() {
    console.log('server starting...');
    return this.app.listen(this.port);
  }
}

export default Server;
