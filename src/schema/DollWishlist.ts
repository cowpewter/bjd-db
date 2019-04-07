export const typeDef = `
type DollWishlist {
  id: ID!
  name: String!
  user: User!
  dolls: [Doll!]
}
`;
