'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useCreateUserMutation } from '@graphql/internal/client/generated/createUser.generated';
import verify from '@lib/auth/verify';
import { JWT_STORAGE_KEY } from '@lib/constants';
import { authContext } from '@lib/contexts/AuthContext';
import type { AuthMethod } from '@lib/types/AuthMethod';
import { isWeb2 } from '@lib/types/AuthMethod';
import { setUser } from '@sentry/nextjs';

interface AuthContextProps {
  children?: ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(undefined);
  const [createUser] = useCreateUserMutation();

  const verifyToken = useCallback(async () => {
    const currentToken = localStorage.getItem(JWT_STORAGE_KEY);
    if (!currentToken) {
      setAuthMethod(undefined);
      setUser({ id: undefined });
      return;
    }
    try {
      const decodedToken = await verify(currentToken);
      setAuthMethod(decodedToken);
      setUser({ id: decodedToken.sub });
      if (isWeb2(decodedToken)) {
        void createUser({ variables: { userId: decodedToken.sub } });
      }
    } catch (e) {
      console.error(e);
    }
  }, [createUser]);

  useEffect(() => {
    void verifyToken();
  }, [verifyToken]);

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
