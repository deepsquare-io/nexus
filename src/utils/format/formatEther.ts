export function formatEther(wei: bigint): bigint {
  return wei / 1000000000000000000n;
}
