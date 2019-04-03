const parseDbConnectString = (dbString) => {
  dbString = dbString.replace('mysql://', '');

  const endOfUsername = dbString.indexOf(':');
  const endOfPw = dbString.indexOf('@');
  const endOfHost = dbString.lastIndexOf(':');
  const endOfPort = dbString.indexOf('/');
  
  const username = dbString.substring(0, endOfUsername);
  const password = dbString.substring(endOfUsername + 1, endOfPw);
  const host = dbString.substring(endOfPw + 1, endOfHost);
  const port = dbString.substring(endOfHost + 1, endOfPort);
  const database = dbString.substring(endOfPort + 1);

  return {
    username,
    password,
    host,
    port,
    database,
  };
};

module.exports = parseDbConnectString;
