// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
export interface FormatBigNumberOptions {
  divide?: number;
  precision?: number;
}

/**
 * Intermediate function to split a big number with comma every 3 digits.
 * @param {string} raw The number to split as an string.
 * @returns {string}
 * @example 12345678 => 12,345,678
 */
const addIntegerPartSeparator = (raw: string) => {
  if (raw.length <= 3) return raw;

  const chunks = raw.length % 3 === 0 ? [] : [raw.substring(0, raw.length % 3)];

  for (let i = raw.length % 3; i < raw.length; i += 3) {
    chunks.push(raw.substring(i, i + 3));
  }

  return chunks.join(',');
};

const incr = (raw: string, preserveLeadingZeros = false) => {
  const result = (BigInt(raw) + 1n).toString();

  if (!preserveLeadingZeros) {
    return result;
  }

  // Preserve leading zeros
  return '0'.repeat(raw.match(/^0+/)?.[0]?.length ?? 0) + result;
};

/**
 * Format a big number by adding a comma every three digits.
 * @param {bigint} n The big number to format.
 * @param {number} divide If the big number needs to be divided.
 * @param {number} round If the big number needs to be rounded.
 * @returns {string}
 */
export default function formatBigNumber(
  n: bigint,
  { divide = 0, precision = Infinity }: FormatBigNumberOptions = {},
): string {
  const raw = n.toString(); // Base 10
  let integerPart = raw.length > divide ? raw.slice(0, raw.length - divide) : '0';

  const decimalPart =
    raw.length > divide ? raw.slice(raw.length - divide, raw.length) : '0'.repeat(divide - raw.length) + raw;

  if (precision === 0 || divide === 0) {
    integerPart = parseInt(decimalPart.charAt(0)) >= 5 ? incr(integerPart) : integerPart;
    return addIntegerPartSeparator(integerPart);
  }

  let roundedPart = decimalPart.substring(0, precision);

  roundedPart = parseInt(decimalPart.charAt(precision)) >= 5 ? incr(roundedPart, true) : roundedPart;

  if (roundedPart.length > precision) {
    integerPart = incr(integerPart);
    roundedPart = roundedPart.slice(roundedPart.length - precision);
  }

  roundedPart = roundedPart.replace(/0+$/, ''); // Trim zeros

  return `${addIntegerPartSeparator(integerPart)}${roundedPart.length > 0 ? '.' : ''}${roundedPart}`;
}
