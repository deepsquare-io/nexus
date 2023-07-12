// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql/type';
import type { Hex } from 'viem';
import { isHex } from 'viem';

const HexScalar = new GraphQLScalarType({
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

export default HexScalar;
