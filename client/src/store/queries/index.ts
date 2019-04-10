const fs =  require('fs');
const gql = require('graphql-tag');
const path = require('path');

console.warn(typeof gql, typeof fs.readFileSync);

export const getGQL = (filename: String) => {
  return gql(fs.readFileSync(
    path.resolve(__dirname, filename),
  ).toString('utf-8'));
};
