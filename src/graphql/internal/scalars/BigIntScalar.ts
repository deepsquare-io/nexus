import { GraphQLScalarType, Kind } from 'graphql';

const BigIntScalar = new GraphQLScalarType({
  name: 'bigint',
  description: 'Representation of a native JS bigint.',
  serialize: (value: unknown) => {
    if (typeof value !== 'bigint') {
      throw new Error('bigint can only represent bigint instances');
    }

    return value.toString();
  },
  parseValue: (value: unknown) => {
    if (
      typeof value !== 'bigint' &&
      typeof value !== 'boolean' &&
      typeof value !== 'number' &&
      typeof value !== 'string'
    ) {
      throw new Error('BigNumber can only be parsed from string');
    }
    return BigInt(value);
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING && ast.kind !== Kind.BOOLEAN && ast.kind !== Kind.INT) {
      throw new Error('BigNumber can only be parsed from string');
    }

    return BigInt(ast.value);
  },
});

export default BigIntScalar;
