// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import merge from 'lodash/merge';
import type { Address } from 'wagmi';
import type { ZodString } from 'zod';
import { z } from 'zod';
import ChainId from '@lib/web3/lib/ChainId';
import { isPlatformBrowser, isPlatformServer } from '@utils/platform';

const origin = isPlatformBrowser() ? window.origin : undefined;
const rawAppUrl = origin ?? process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
const APP_URL = rawAppUrl ? rawAppUrl.replace(/\/*$/, '') : '/';

/**
 * The raw environment, based on the original process.env and with the addition of the NEXT_PUBLIC variables.
 */
const raw = merge(isPlatformServer() ? process.env : {}, {
  // Application
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? 'production',
  NEXT_PUBLIC_APP_URL: APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_STATS_API_URL: process.env.NEXT_PUBLIC_STATS_API_URL,
  NEXT_PUBLIC_MAINTENANCE: process.env.NEXT_PUBLIC_MAINTENANCE ?? '0',

  // Logging
  NEXT_PUBLIC_LOGGER_URL: process.env.NEXT_PUBLIC_LOGGER_URL ?? 'http://localhost:3000',

  // Web3
  NEXT_PUBLIC_WEB3_CHAIN: process.env.NEXT_PUBLIC_WEB3_CHAIN ?? ChainId.DEEPSQUARE_MAINNET,

  NEXT_PUBLIC_JWT_PUBLIC_KEY: process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY,
});

type PublicVariables = Extract<keyof typeof raw, `NEXT_PUBLIC_${string}`>;
type PublicSchema = Record<PublicVariables, ZodString>;

const publicSchema = z.lazy(() => {
  const keys: PublicVariables[] = Object.keys(raw).filter<PublicVariables>(
    (k: string): k is PublicVariables => k.startsWith('NEXT_PUBLIC_') && k !== 'NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA',
  );

  return z.object(
    keys.reduce((schema, key) => {
      if (!(key in schema)) {
        schema[key] = z.string().min(1);
      }

      return schema;
    }, {} as PublicSchema),
  );
});

const privateSchema = z.intersection(
  publicSchema,
  z.object({
    // ECDSA keypair for user authentication
    JWT_PRIVATE_KEY: z.string().min(1),

    WEB3_PRIVATE_KEY: z.custom<Address>((val) => {
      return /^0x+[0-9a-fA-f]{64}$/.test(val as string);
    }),

    // Third parties
    FIREBASE_CONFIG: z.string().min(1),
    MONGODB_URI: z.string().min(1),
  }),
);

const schema = isPlatformBrowser() ? publicSchema : privateSchema;
const env = schema.parse(raw) as z.infer<typeof privateSchema>;
export default env;
