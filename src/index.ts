import Server from './server';

const validateEnvironment = require('./utils/validateEnvironment.js');

const main = () => {
  validateEnvironment();
  try {
    const server = new Server({
      port: Number(process.env.PORT),
      dbUrl: process.env.JAWSDB_MARIA_URL,
    });
    server.start();
    console.log('Server listing on port ' + process.env.PORT);
  } catch (e) {
    console.error(e);
  }
  
}

main();
