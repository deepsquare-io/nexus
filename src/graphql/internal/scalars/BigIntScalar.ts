import { GraphQLScalarType, Kind } from 'graphql';

export const BigIntScalar = new GraphQLScalarType({
  name: 'bigint',
  description: 'Representation of a native JS bigint.',
  parseValue: (value: unknown) => {
    if (
      typeof value !== 'bigint' &&
      typeof value !== 'boolean' &&
      typeof value !== 'number' &&
      typeof value !== 'string'
    ) {
      throw new Error('BigNumber can only be parsed from string or number');
    }
    return BigInt(value);
  },
  serialize: (value: unknown) => {
    if (typeof value !== 'bigint') {
      throw new Error('bigint can only represent bigint instances');
    }

    return value.toString();
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING && ast.kind !== Kind.BOOLEAN && ast.kind !== Kind.INT) {
      throw new Error('BigNumber can only be parsed from string');
    }

    return BigInt(ast.value);
  },
  extensions: {
    codegenScalarType: 'bigint',
    jsonSchema: {
      type: 'integer',
      format: 'int64',
    },
  },
});
