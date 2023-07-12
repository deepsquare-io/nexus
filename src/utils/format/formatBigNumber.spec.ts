// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { describe, expect, it } from '@jest/globals';
import type { FormatBigNumberOptions } from '@utils/format/formatBigNumber';
import formatBigNumber from '@utils/format/formatBigNumber';

describe('formatBigNumber', () => {
  it.each([
    ['123', { divide: 0 }, '123'],
    ['1234', { divide: 0 }, '1,234'],
    ['1234567', { divide: 0 }, '1,234,567'],
    ['123456789', { divide: 0 }, '123,456,789'],
    ['123456789', { divide: 3 }, '123,456.789'],
    ['123456789123456789', { divide: 9 }, '123,456,789.123456789'],
    [
      '123456789123456789123456789123456789',
      { divide: 2, precision: 1 },
      '1,234,567,891,234,567,891,234,567,891,234,567.9',
    ],
    ['123', { divide: 3, precision: 0 }, '0'],
    ['987', { divide: 3, precision: 0 }, '1'],
    ['123', { divide: 3, precision: 2 }, '0.12'],
    ['123', { divide: 5, precision: 4 }, '0.0012'],
    ['36638354067413355', { divide: 18, precision: 5 }, '0.03664'], // =0.036638354067413355
  ] as [string, FormatBigNumberOptions, string][])('should format %s (with %p decimals) to %p', (n, options, s) => {
    expect(formatBigNumber(BigInt(n), options)).toBe(s);
  });
});
