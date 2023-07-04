// formatUnits format a wei value into a human-readable value.
//
// Function inspired from viem.
export function formatUnits(value: bigint, decimals: number) {
  let display = value.toString();

  const negative = display.startsWith('-');
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, '0');

  const integer = display.slice(0, display.length - decimals);
  let fraction = display.slice(display.length - decimals);
  fraction = fraction.replace(/(0+)$/, '');
  return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''}`;
}

export function formatEther(wei: bigint): string {
  return formatUnits(wei, 18);
}

/**
 * formatEtherLossy returns a value in ether with the number type, but with a limited number of decimals so it can be converted to a number.
 */
export function formatEtherLossy(wei: bigint, precision = 100000): number {
  return Number((wei * BigInt(precision)) / 1000000000000000000n) / precision;
}
