/**
 * This function converts the given duration from seconds into a format of '(Y[y]) (D[d]) (H[h]) (m[m]) (s[s])'.
 *
 * @param duration - The duration in seconds to be formatted.
 * @returns Returns a string representing the duration in the format of 'Y[y] D[d] H[h] m[m] s[s]'.
 *                      For example, if the input duration is 3661 seconds, the output would be "1h 1m 1s".
 *
 * @example
 *   formatDuration(3661); // "1h 1m 1s"
 *   formatDuration(31536000);  // "1y"
 *   formatDuration(34135200);  // "1y 30d 2h"
 */
export default function formatDuration(duration: number): string {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / (60 * 60)) % 24);
  const days = Math.floor((duration / (60 * 60 * 24)) % 365);
  const years = Math.floor(duration / (60 * 60 * 24 * 365));

  const parts = [];
  if (years > 0) parts.push(`${years}y`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}
