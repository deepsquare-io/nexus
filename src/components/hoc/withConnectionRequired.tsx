// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { NextPage } from 'next';
import type { ComponentType, FC, JSX } from 'react';
import { useContext } from 'react';
import ConnectButton from '@components/buttons/ConnectButton';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected } from '@lib/types/AuthMethod';

const withConnectionRequired = <T extends JSX.IntrinsicAttributes>(Page: NextPage<T>): ComponentType<T> => {
  function WithConnectionRequired(props: T): ReturnType<FC<T>> {
    const { authMethod } = useContext(authContext);
    return (
      <>
        <div className="relative">
          <div className={isDisconnected(authMethod) ? 'absolute inset-0 filter blur-md' : undefined}>
            <Page {...props} />
          </div>
          {isDisconnected(authMethod) && (
            <div className="absolute inset-0 flex flex-col h-screen items-center justify-center">
              <div className="flex items-center justify-center">
                <ConnectButton />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return WithConnectionRequired;
};
export default withConnectionRequired;
