import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql/type';
import type { Hex } from 'viem';
import { isHex } from 'viem';

export class HexClass {}

export const HexScalar = new GraphQLScalarType({
  name: 'Hex',
  description: 'Hexadecimal string scalar type',
  serialize(value: unknown): string {
    if (!isHex(value)) {
      throw new Error('HexScalar can only serialize hexadecimal values');
    }
    return value;
  },
  parseValue(value: unknown): Hex {
    // check the type of received value
    if (!isHex(value)) {
      throw new Error('HexScalar can only parse string values');
    }
    return value; // value from the client input variables
  },
  parseLiteral(ast): Hex {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values');
    }
    if (!isHex(ast.value)) {
      throw new Error('Received value is not hexadecimal');
    }
    return ast.value; // value from the client query
  },
});
