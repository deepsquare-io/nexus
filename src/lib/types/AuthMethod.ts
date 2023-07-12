// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Web2Connection } from '@lib/types/Web2Connection';
import type { Web3Connection } from '@lib/types/Web3Connection';

export type AuthMethod = Web2Connection | Web3Connection | undefined;

export function isWeb2(method: AuthMethod): method is Web2Connection {
  return method !== undefined && (method as Web2Connection).id !== undefined;
}

export function isWeb3(method: AuthMethod): method is Web3Connection {
  return method !== undefined && (method as Web3Connection).address !== undefined;
}

export function isDisconnected(method: AuthMethod): method is undefined {
  return method === undefined;
}
