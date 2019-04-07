export const typeDef = `
extend type Query {
  faceupArtist(id: ID!): FaceupArtist
}

type FaceupArtist {
  id: ID!
  name: String!
  country: String
  website: String
}
`;
