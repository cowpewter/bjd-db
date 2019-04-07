export const typeDef = `
type Mutation {
  _empty: Boolean!
}
`;

export const resolver = {
  Mutation: {
    _empty: () => false,
  },
};
