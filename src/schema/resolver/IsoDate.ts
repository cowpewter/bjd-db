import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const serialize = (value: any) =>
  value instanceof Date ? value.toISOString() : null;

function parseValue(value: any) {
  try {
    const result = new Date(value);
    return result;
  } catch (e) {
    return null;
  }
}

const parseLiteral = (ast: any) =>
  ast.kind === Kind.STRING ? parseValue(ast.value) : null;

const IsoDate = new GraphQLScalarType({
  parseLiteral,
  parseValue,
  serialize,
  name: 'ISODate',
  description: 'JavaScript Date object as an ISO timestamp',
});

const resolver = {
  IsoDate,
};

export default resolver;
