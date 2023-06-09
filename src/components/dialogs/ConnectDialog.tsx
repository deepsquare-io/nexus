'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useAuth } from 'reactfire';
import { useAccount, useConnect } from 'wagmi';
import useDialog from '@hooks/useDialog';
import { deepsquareChain } from '@lib/web3/constants/chains';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import metamask from '@public/icons/metamask.svg';
import google from '@public/icons/social/google.svg';

const ConnectDialog = () => {
  const { isOpen, close } = useDialog('connect');
  const { isConnected } = useAccount();
  const auth = useAuth();
  const { connectAsync, isLoading, connectors } = useConnect();

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
            if (!isConnected) await connectAsync({ connector: connectors[0], chainId: deepsquareChain.id });
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
            await signInWithPopup(auth, new GoogleAuthProvider());
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
