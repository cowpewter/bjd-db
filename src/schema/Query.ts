export const typeDef = `
type Query {
  _empty: Boolean!
}
`;

export const resolver = {
  Query: {
    _empty: () => false,
  },
};
