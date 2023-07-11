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
    WEB3_PRIVATE_KEY: z.custom<Address>((val) => {
      return /^0x+[0-9a-fA-f]{64}$/.test(val as string);
    }),

    // Third parties
    MONGODB_URI: z.string().min(1),
  }),
);

const schema = isPlatformBrowser() ? publicSchema : privateSchema;
const env = schema.parse(raw) as z.infer<typeof privateSchema>;
export default env;
