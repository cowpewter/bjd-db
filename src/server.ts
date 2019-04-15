import { ApolloServer } from 'apollo-server-koa';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as serve from 'koa-static';
import { Connections } from './connection';
import { serveImagesMiddleware, uploadImagesMiddleware } from './library/image';
import { jwtSessionMiddleware } from './library/jwt';
import schema from './schema';
import { underConstructionMiddleware } from './util/underConstruction';

interface ServerConfig {
  jwtSecret: string;
  port: number;
  connections: Connections;
}

class Server {
  port: number;
  app: Koa;

  constructor(config: ServerConfig) {
    const app = new Koa();

    // Returns 'Under Construction' for all requests with a referer of bjd-db.com
    app.use(underConstructionMiddleware);

    // Serve up static files from client dir
    const clientBuildDir =
      process.env.ENVIRONMENT === 'prod' ? '/app/client/build' : 'client/build';
    app.use(serve(clientBuildDir));

    // Setup our image server
    // it will call next() for any path but /images
    app.use(serveImagesMiddleware);

    // set up jwt for remaining paths
    // passthrough true ensures you can still access paths w/o auth
    // each path will check authorization individually
    app.use(jwtSessionMiddleware);

    // Setup our upload image handler
    // it will call next() for any path but /uploadImage
    app.use(uploadImagesMiddleware);

    // Create Graphql server and apply it
    const apollo = new ApolloServer({
      schema,
      playground: process.env.ENVIRONMENT !== 'prod',
      context: ({ ctx }) => ({ koaCtx: ctx }),
    });
    apollo.applyMiddleware({ app });

    // Create routes
    const router = new KoaRouter();

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
    app.context.connections = config.connections;
    this.port = config.port;
    this.app = app;
  }

  start() {
    console.log('server starting...');
    return this.app.listen(this.port);
  }
}

export default Server;
