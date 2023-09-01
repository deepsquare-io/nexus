'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useUser } from 'reactfire';
import { useAccount } from 'wagmi';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useCreateUserMutation } from '@graphql/internal/client/generated/createUser.generated';
import { useLoginFromWeb2Mutation } from '@graphql/internal/client/generated/loginFromWeb2.generated';
import { useLoginFromWeb3Mutation } from '@graphql/internal/client/generated/loginFromWeb3.generated';
import verify from '@lib/auth/verify';
import { JWT_STORAGE_KEY } from '@lib/constants';
import { authContext } from '@lib/contexts/AuthContext';
import type { AuthMethod } from '@lib/types/AuthMethod';
import { isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import { setUser } from '@sentry/nextjs';
import { signMessage } from '@wagmi/core';

interface AuthContextProps {
  children?: ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);
  const { address, connector } = useAccount();
  const web2User = useUser();
  const [createUser] = useCreateUserMutation();
  const [loginFromWeb2] = useLoginFromWeb2Mutation();
  const [loginFromWeb3] = useLoginFromWeb3Mutation();

  useEffect(() => {
    if (address && connector) {
      setAuthMethod({ address, connector });
      setUser({ id: address });
    } else if (web2User.data) {
      setAuthMethod({ id: web2User.data.uid });
      setUser({ id: web2User.data.uid });
      void createUser({ variables: { userId: web2User.data.uid } });
    }
  }, [address, connector, createUser, web2User.data]);

  const fetchToken = useCallback(async () => {
    const verifyToken = async (tokenSetter: () => Promise<void>) => {
      const currentToken = localStorage.getItem(JWT_STORAGE_KEY);
      if (!currentToken) {
        console.log('no token');
        await tokenSetter();
      } else {
        try {
          verify(currentToken);
        } catch (e) {
          console.error(e);
          await tokenSetter();
        }
      }
    };

    console.log(authMethod);

    if (isWeb3(authMethod)) {
      await verifyToken(async () => {
        const signature = await signMessage({ message: authMethod.address });
        const tokenResponse = await loginFromWeb3({ variables: { address, signature } });
        localStorage.setItem(JWT_STORAGE_KEY, tokenResponse.data!.loginFromWeb3);
      });
    } else if (isWeb2(authMethod)) {
      await verifyToken(async () => {
        const tokenResponse = await loginFromWeb2({ variables: { firebaseToken: await web2User.data!.getIdToken() } });
        localStorage.setItem(JWT_STORAGE_KEY, tokenResponse.data!.loginFromWeb2);
      });
    }
  }, [address, authMethod, loginFromWeb2, loginFromWeb3, web2User.data]);

  useEffect(() => {
    void fetchToken();
  }, [fetchToken]);

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
