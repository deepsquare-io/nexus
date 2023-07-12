'use client';

import { useUser } from 'reactfire';
import { useAccount } from 'wagmi';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useCreateUserMutation } from '@graphql/internal/client/generated/createUser.generated';
import { authContext } from '@lib/contexts/AuthContext';
import type { AuthMethod } from '@lib/types/AuthMethod';
import { setUser } from '@sentry/nextjs';

interface AuthContextProps {
  children?: ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);
  const { address, connector } = useAccount();
  const web2User = useUser();
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    if (address && connector) {
      setAuthMethod({ address, connector });
      setUser({ id: address });
    } else if (web2User.data) {
      setAuthMethod({ id: web2User.data.uid });
      setUser({ id: web2User.data.uid });
      void createUser({ variables: { userId: web2User.data.uid } });
    }
  }, [address, connector, createUser, setAuthMethod, web2User.data]);

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
