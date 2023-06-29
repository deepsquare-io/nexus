import type { FC, ReactNode } from 'react';
import { configureAbly } from '@ably-labs/react-hooks';

type PubSubProviderProps = {
  children?: ReactNode;
};

const PubSubProvider: FC<PubSubProviderProps> = ({ children }) => {
  configureAbly({
    authUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/ably-auth`,
    authHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return <>{children}</>;
};

export default PubSubProvider;
