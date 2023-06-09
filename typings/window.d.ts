/**
 * Custom window objects.
 */

interface Window {
  /**
   * Ethereum Provider JavaScript API provider.
   * @see EIP-1193: Ethereum Provider JavaScript API: https://eips.ethereum.org/EIPS/eip-1193
   */
  ethereum?: any;

  /**
   * Hubspot scripts
   */
  hbspt?: any;

  /**
   * Google Tag Manager DataLayer
   * @see https://developers.google.com/tag-platform/tag-manager/web
   */
  dataLayer?: { [key: string]: string | number | boolean }[];
}
