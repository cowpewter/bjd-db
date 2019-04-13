import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { isNumber, isString } from 'lodash';

const serialize = (value: any) => {
  if (isNumber(value)) {
    return `${Math.floor(value / 100)}.${value % 100}`;
  }
  return null;
};

function parseValue(value: any) {
  if (isNumber(value)) {
    return value;
  }
  if (isString(value)) {
    try {
      let result;
      if (value.indexOf('.') === value.length - 2) {
        result = parseInt(value.replace('.', ''), 10);
      } else if (value.indexOf('.') === -1) {
        result = parseInt(`${value}00`, 10);
      } else {
        result = NaN;
      }
      if (isNaN(result)) {
        return null;
      }
      return result;
    } catch (e) {
      return null;
    }
  }
  return null;
}

const parseLiteral = (ast: any) =>
  ast.kind === Kind.STRING || ast.kind === Kind.INT ? parseValue(ast.value) : null;

const UsDollar = new GraphQLScalarType({
  parseLiteral,
  parseValue,
  serialize,
  name: 'UsDollar',
  description: 'An amount in US Dollars',
});

const resolver = {
  UsDollar,
};

export default resolver;
