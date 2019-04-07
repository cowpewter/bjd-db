export const typeDef = `
extend type Query {
  company(id: ID!): Company
}

type Company {
  id: ID!
  name: String!
  country: String
  website: String
}
`;
