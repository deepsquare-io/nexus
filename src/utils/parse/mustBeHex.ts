import type { Hex } from 'viem';

export default function mustBeHex(value: string): Hex {
  if (!value.startsWith('0x')) {
    throw new Error(`"${value} is not a hex string"`);
  }

  return value as Hex;
}
