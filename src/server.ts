// import { graphqlKoa } from 'apollo-server-koa';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as serve from 'koa-static';
import * as fs from 'fs';

interface ServerConfig {
  port: number;
  dbUrl: string;
}

class Server {
  port: number;
  app: Koa;

  constructor(config: ServerConfig) {
    this.port = config.port;
    this.app = new Koa();

    const clientBuildDir = process.env.ENVIRONMENT === 'prod' ? '/app/client/build' : 'client/build';

    // Serve up static files from client dir
    this.app.use(serve(clientBuildDir));

    const router = new KoaRouter();

    // Hello World!
    router.get('/hello', ctx => {
      ctx.body = 'Hello World!!';
      return ctx;
    });

    // @todo api endpoints here

    // Serve up the app for any non-matched urls
    // frontend router will take over from there
    router.all('*', ctx => {
      console.log('catchall');
      ctx.body = fs
        .readFileSync(`${clientBuildDir}/index.html`)
        .toString();
      return ctx;
    });

    this.app.use(router.routes());
  }

  start() {
    console.log('server starting...');
    return this.app.listen(this.port);
  }
}

export default Server;
