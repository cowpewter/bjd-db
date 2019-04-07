export const typeDef = `
extend type Query {
  doll(id: ID!): Doll
}

type Doll {
  id: ID!
  name: String!
  profileImage: String
  sex: String
  gender: String
  isSold: Boolean!
  isWishlist: Boolean!
  allowComments: Boolean!
  user: User!
  description: String
  cofigurations: [DollConfiguration!]
}
`;
