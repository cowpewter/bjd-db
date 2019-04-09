require('reflect-metadata'); // required for typeorm
import { getConnections } from './connection';
import validateEnvironment from './util/validateEnvironment.js';

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
