// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { JWTPayload } from 'jose';
import type { Address } from 'wagmi';

export type AuthMethod = (JWTPayload & { type: 'web2' | 'web3' }) | undefined;

export function isWeb2(token: AuthMethod): token is Omit<JWTPayload, 'sub'> & { sub: string; type: 'web2' } {
  return typeof token !== 'undefined' && token.type === 'web2';
}

export function isWeb3(token: AuthMethod): token is Omit<JWTPayload, 'sub'> & { sub: Address; type: 'web3' } {
  return typeof token !== 'undefined' && token.type === 'web3';
}

export function isDisconnected(token: AuthMethod): token is undefined {
  return token === undefined;
}
