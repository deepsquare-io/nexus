'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { lockContext } from '@lib/contexts/LockContext';

type LockProviderProps = {
  children?: ReactNode;
};

const LockProvider: FC<LockProviderProps> = ({ children }) => {
  const [map, setMap] = useState<Record<string, boolean>>({});

  const setterFactory = (key: string) => {
    return (value: boolean) => {
      setMap((prev) => {
        return { ...prev, [key]: value };
      });
    };
  };

  return <lockContext.Provider value={{ map, setterFactory }}>{children}</lockContext.Provider>;
};

export default LockProvider;
