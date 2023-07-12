// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
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
