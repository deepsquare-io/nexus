'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
