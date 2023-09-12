'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useAuth } from 'reactfire';
import type { Address } from 'wagmi';
import { useAccount, useConnect } from 'wagmi';
import { useContext } from 'react';
import { useCreateUserMutation } from '@graphql/internal/client/generated/createUser.generated';
import { useLoginFromWeb2Mutation } from '@graphql/internal/client/generated/loginFromWeb2.generated';
import { useLoginFromWeb3Mutation } from '@graphql/internal/client/generated/loginFromWeb3.generated';
import useDialog from '@hooks/useDialog';
import verify from '@lib/auth/verify';
import { JWT_STORAGE_KEY } from '@lib/constants';
import { authContext } from '@lib/contexts/AuthContext';
import { deepsquareChain } from '@lib/web3/constants/chains';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import metamask from '@public/icons/metamask.svg';
import google from '@public/icons/social/google.svg';
import { setUser } from '@sentry/nextjs';
import { signMessage } from '@wagmi/core';

const ConnectDialog = () => {
  const { isOpen, close } = useDialog('connect');
  const { isConnected, address } = useAccount();
  const auth = useAuth();
  const { connectAsync, isLoading, connectors } = useConnect();
  const [loginFromWeb2] = useLoginFromWeb2Mutation();
  const [loginFromWeb3] = useLoginFromWeb3Mutation();
  const { setAuthMethod } = useContext(authContext);
  const [createUser] = useCreateUserMutation();

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: 'rounded-xl items-center' }}
    >
      <DialogTitle>Welcome back.</DialogTitle>
      <div className="flex flex-col max-w-xs mt-5 mb-10 space-y-4">
        <LoadingButton
          startIcon={<Image src={metamask} alt="Metamask logo" height={32} className="mr-2" />}
          variant="outlined"
          onClick={async () => {
            const fetchToken = async (address: Address) => {
              await loginFromWeb3({
                variables: {
                  address,
                  signature: await signMessage({ message: address }),
                },
              }).then(async (data) => {
                if (data.data?.loginFromWeb3) {
                  localStorage.setItem(JWT_STORAGE_KEY, data.data?.loginFromWeb3);
                  try {
                    const decodedToken = await verify(data.data?.loginFromWeb3);
                    setAuthMethod(decodedToken);
                    setUser({ id: decodedToken.sub });
                  } catch (e) {
                    console.error(e);
                  }
                }
              });
            };

            if (!isConnected || !address) {
              await connectAsync({ connector: connectors[0], chainId: deepsquareChain.id }).then(async (result) => {
                await fetchToken(result.account);
              });
            } else {
              await fetchToken(address);
            }

            close();
          }}
          color="primary"
          className="px-8 py-4"
          classes={{
            root: 'rounded-full',
          }}
          loading={isLoading}
          fullWidth
        >
          Connect with Metamask
        </LoadingButton>
        <LoadingButton
          startIcon={<Image src={google} alt="Google logo" height={32} className="mr-2" />}
          variant="outlined"
          onClick={async () => {
            const firebaseCredentials = await signInWithPopup(auth, new GoogleAuthProvider());
            const data = await loginFromWeb2({
              variables: { firebaseToken: await firebaseCredentials.user.getIdToken() },
            });
            if (data.data?.loginFromWeb2) {
              localStorage.setItem(JWT_STORAGE_KEY, data.data.loginFromWeb2);
              try {
                const decodedToken = await verify(data.data.loginFromWeb2);
                setAuthMethod(decodedToken);
                setUser({ id: decodedToken.sub });
                await createUser({ variables: { userId: firebaseCredentials.user.uid } });
              } catch (e) {
                console.error(e);
              }
            }
            close();
          }}
          color="primary"
          className="px-8 py-4"
          classes={{
            root: 'rounded-full',
          }}
          loading={isLoading}
          fullWidth
        >
          Connect with Google
        </LoadingButton>
      </div>
    </Dialog>
  );
};

export default ConnectDialog;
