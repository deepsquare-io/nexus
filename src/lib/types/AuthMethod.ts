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
