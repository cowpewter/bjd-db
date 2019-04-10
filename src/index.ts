import 'module-alias/register'; // config aliases
import 'reflect-metadata'; // required for typeorm
import { getConnections } from './connection';
import validateEnvironment from './util/validateEnvironment.js';

console.warn(__dirname);
/*
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@connection/*': 'build/connection/*',
  '@entity/*': 'build/entity/*',
  '@library/*': 'build/library/*',
  '@schema/*': 'build/schema/*',
  '@util/*': 'build/util/*',
});
*/
import Server from './server';

const main = async () => {
  validateEnvironment();

  const server = new Server({
    jwtSecret: process.env.JWT_SECRET!,
    port: Number(process.env.PORT),
    connections: await getConnections(),
  });

  server.start();
  console.log(`Server listing on port ${process.env.PORT}`);
};

main();
