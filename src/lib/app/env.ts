import merge from 'lodash/merge';
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

const env = publicSchema.parse(raw);

export default env;
