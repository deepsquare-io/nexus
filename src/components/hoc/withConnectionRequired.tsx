import type { NextPage } from 'next';
import type { ComponentType, FC } from 'react';
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
