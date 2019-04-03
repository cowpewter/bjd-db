const parseDbConnectString = (dbString) => {
  const endOfUsername = dbString.indexOf(':');
  const endOfPw = dbString.indexOf('@');
  const endOfHost = dbString.indexOf('/');

  const username = dbString.substring(0, endOfUsername);
  const password = dbString.substring(endOfUsername + 1, endOfPw);
  const host = dbString.substring(endOfPw + 1, endOfHost);
  const database = dbString.substring(endOfHost + 1);

  return {
    username,
    password,
    host,
    database,
  };
}

module.exports = parseDbConnectString;
