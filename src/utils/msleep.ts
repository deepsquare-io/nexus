export default function msleep(timeoutMs: number): Promise<void> {
  return new Promise<void>((resolve) => {
    const t = setTimeout(() => {
      clearTimeout(t);
      resolve();
    }, timeoutMs);
  });
}
