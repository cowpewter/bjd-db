const mysql = require('mysql');
const migration = require('mysql-migrations');
const validateEnvironment = require('./utils/validateEnvironment.js');

const runMigrations = () => {
  validateEnvironment();

  console.log('start migrations');
  try {
    const connectStr = process.env.JAWSDB_MARIA_URL;
    const connection = mysql.createPool(connectStr);
    migration.init(connection, __dirname + '/migrations', () => {
      try {
        connection.end();
      } catch (e) {
        console.log(e);
      }
      console.log('migrations complete');
    });
  } catch (e) {
    console.error(e);
  }
};

runMigrations();
return true;
