const parseDbConnectString = require('./src/util/parseDbConnectString.js');
const { username, password, host, port, database } = parseDbConnectString(process.env.JAWSDB_MARIA_URL);

module.exports = {
   username,
   password,
   host,
   port,
   database,
   type: 'mysql',
   logging: process.env.ENVIRONMENT !== 'prod',
   entities: [
       'build/entity/**/*.js',
   ],
   migrations: [
       'build/migration/**/*.js',
   ],
   cli: {
      migrationsDir: "src/migration"
  }
}
