// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
