// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
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
