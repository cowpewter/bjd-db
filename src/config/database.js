const parseDbConnectString = require('../utils/parseDbConnectString.js');

const { username, password, host, database } = parseDbConnectString(process.env.JAWSDB_MARIA_URL);

module.exports = {
  "dev": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "mysql"
  },
  "test": {
    "username": username,
    "password": password,
    "database": "dolldb_test",
    "host": host,
    "dialect": "mysql"
  },
  "prod": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "mysql"
  }
}
