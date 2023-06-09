export default function formatAccount(account: string, length = 4) {
  if (!account.startsWith('0x')) {
    account = `0x${account}`;
  }

  return `${account.slice(0, 2 + length)}...${account.slice(account.length - length)}`;
}
