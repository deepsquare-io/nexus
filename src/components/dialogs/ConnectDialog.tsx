'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from 'reactfire';
import { useAccount, useConnect } from 'wagmi';
import useDialog from '@hooks/useDialog';
import { deepsquareChain } from '@lib/web3/constants/chains';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';

const ConnectDialog = () => {
  const { isOpen, close } = useDialog('connect');
  const { isConnected } = useAccount();
  const auth = useAuth();
  const { connectAsync, isLoading, connectors } = useConnect();

  return (
    <Dialog open={isOpen} onClose={() => close()}>
      <LoadingButton
        variant="contained"
        onClick={async () => {
          if (!isConnected) await connectAsync({ connector: connectors[0], chainId: deepsquareChain.id });
          localStorage.setItem('reconnectWallet', 'true');
          close();
        }}
        color="primary"
        className="px-8 py-4 rounded-lg"
        loading={isLoading}
      >
        Connect with Metamask
      </LoadingButton>
      <LoadingButton
        variant="contained"
        onClick={async () => {
          await signInWithPopup(auth, new GoogleAuthProvider());
          close();
        }}
        color="primary"
        className="px-8 py-4 rounded-lg"
        loading={isLoading}
      >
        Connect with Google
      </LoadingButton>
    </Dialog>
  );
};

export default ConnectDialog;
