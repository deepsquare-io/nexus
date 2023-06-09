'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { DialogContext } from '@lib/contexts/DialogContext';

type DialogProviderProps = {
  children?: ReactNode;
};

const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [map, setMap] = useState<Record<string, boolean>>({});

  const setterFactory = (key: string) => {
    return (value: boolean) => {
      setMap((prev) => {
        return { ...prev, [key]: value };
      });
    };
  };

  return <DialogContext.Provider value={{ map, setterFactory }}>{children}</DialogContext.Provider>;
};

export default DialogProvider;
