import formatBigNumber from '@utils/format/formatBigNumber';

export default function formatSQUARE(dps: bigint) {
  return formatBigNumber(dps, { divide: 18, precision: 2 });
}
