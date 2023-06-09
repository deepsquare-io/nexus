import { createContext } from 'react';

export const DialogContext = createContext<{
  map: Record<string, boolean>;
  setterFactory: (key: string) => (value: boolean) => void;
}>({
  map: {},
  setterFactory: () => () => void 0,
});
