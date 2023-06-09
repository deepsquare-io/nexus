export function parseBytes32String(hex: string): string {
  if (!hex.startsWith('0x')) throw Error('input is not an hex string');

  const content = hex.substring(2);

  let parsed = '';

  for (let i = 0; i < content.length; i += 2) {
    parsed += String.fromCharCode(parseInt(content.substring(i, i + 2), 16));
  }

  return parsed.trim();
}
