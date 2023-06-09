import type { Address } from 'wagmi';

export function formatBytes32String(raw: string): Address {
  let hex = '0x';
  for (let i = 0; i < raw.length; i++) {
    hex += raw.charCodeAt(i).toString(16);
  }
  return hex.padEnd(66, '0') as Address;
}
