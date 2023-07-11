'use client';

import { useAccount } from 'wagmi';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { authContext } from '@lib/contexts/AuthContext';
import type { AuthMethod } from '@lib/types/AuthMethod';
import { setUser } from '@sentry/nextjs';

interface AuthContextProps {
  children?: ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);
  const { address, connector } = useAccount();

  useEffect(() => {
    if (address && connector) setAuthMethod({ address, connector });
    setUser({ id: address });
  }, [address, connector, setAuthMethod]);

  return (
    <authContext.Provider
      value={{
        authMethod,
        setAuthMethod,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
