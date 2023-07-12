// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
export function parseBytes32String(hex: string): string {
  if (!hex.startsWith('0x')) throw Error('input is not an hex string');

  const content = hex.substring(2);

  let parsed = '';

  for (let i = 0; i < content.length; i += 2) {
    parsed += String.fromCharCode(parseInt(content.substring(i, i + 2), 16));
  }

  return parsed.trim();
}
