/**
 * @returns {boolean} If we are on a server (serverless function or SSR).
 */
export function isPlatformServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * @returns {boolean} If we are in a browser (`window` and `document` are accessible).
 */
export function isPlatformBrowser(): boolean {
  return typeof window !== 'undefined';
}
