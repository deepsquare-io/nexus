'use client';

import { useAccount, useConnect } from 'wagmi';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { authContext } from '@lib/contexts/AuthContext';
import type { AuthMethod } from '@lib/types/AuthMethod';
import { deepsquareChain } from '@lib/web3/constants/chains';
import { setUser } from '@sentry/nextjs';

interface AuthContextProps {
  children?: ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);
  const { isConnected, address, connector } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (address && connector) setAuthMethod({ address, connector });
    setUser({ id: address });
  }, [address, connector, setAuthMethod]);

  useEffect(() => {
    if (localStorage.getItem('reconnectWallet') === 'true' && !isConnected) {
      connect({ connector: connectors[0], chainId: deepsquareChain.id });
    }
  });

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
