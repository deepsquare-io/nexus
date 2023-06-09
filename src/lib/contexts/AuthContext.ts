import { createContext } from 'react';
import type { AuthMethod } from '@lib/types/AuthMethod';

export interface AuthContextType {
  authMethod: AuthMethod;
  setAuthMethod: (authMethod: AuthMethod) => void;
}

export const authContext = createContext<AuthContextType>({
  authMethod: undefined,
  setAuthMethod: () => {
    // Initial empty setter
  },
});
