export function formatWei(ether: bigint): bigint {
  return ether * 1000000000000000000n;
}
