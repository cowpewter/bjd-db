export const typeDef = `
extend type Query {
  comment(id: ID!): Comment
}

type Comment {
  id: ID!
  content: String!
  user: User
  replies: [Comment!]
  source: CommentSource
}
`;
