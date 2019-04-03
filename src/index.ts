require('reflect-metadata'); // important for typeorm
import { createConnection } from 'typeorm';
import validateEnvironment from './util/validateEnvironment.js';

import Server from './server';

const main = async () => {
  validateEnvironment();

  await createConnection();

  const server = new Server({
    jwtSecret: process.env.JWT_SECRET!,
    port: Number(process.env.PORT),
  });
  server.start();
  console.log(`Server listing on port ${process.env.PORT}`);
};

main();
