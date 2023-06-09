'use client';

import type { NextPage } from 'next';
import { toast } from 'react-toastify';
import { useContractRead, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { useContext, useEffect, useState } from 'react';
import { FaucetCreditAbi } from '@abi/FaucetCredit';
import withConnectionRequired from '@components/hoc/withConnectionRequired';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import { addressFaucetCredit } from '@lib/web3/constants/contracts';
import { Credit } from '@lib/web3/constants/tokens';
import Button from '@mui/material/Button';
import formatCredit from '@utils/format/formatCredit';

const CreditsPage: NextPage = withConnectionRequired(() => {
  const { authMethod } = useContext(authContext);
  const [formCreated, setFormCreated] = useState<boolean>(false);

  const [userCredits, setUserCredits] = useState<bigint>(0n);

  useContractRead({
    address: addressFaucetCredit,
    abi: FaucetCreditAbi,
    functionName: 'addressToUserCredit',
    args: [isWeb3(authMethod) ? authMethod.address : '0x0'],
    enabled: isWeb3(authMethod),
    onSuccess: (data) => setUserCredits(data),
  });

  const { config: claimConfig, error: claimError } = usePrepareContractWrite({
    address: addressFaucetCredit,
    abi: FaucetCreditAbi,
    functionName: 'claim',
    enabled: userCredits !== 0n,
  });

  const { writeAsync: claim } = useContractWrite(claimConfig);

  const publicClient = usePublicClient();

  useEffect(() => {
    if (typeof window.hbspt !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window.hbspt.forms.create({
        region: 'eu1',
        portalId: '24969330',
        formId: 'f2586d40-134d-4d55-9545-70a6eedfbcdc',
        target: '#hubspot-form',
      });
      setFormCreated(true);
    }
  }, [setFormCreated]);

  if (!isWeb3(authMethod)) return null;

  return (
    <div>
      <h2>Claim unused credits</h2>
      <Button
        disabled={userCredits === 0n}
        onClick={async () => {
          if (!claim || claimError) return;
          const claimTransaction = await toast.promise(claim, {
            error: 'Transaction rejected',
          });

          await toast.promise(publicClient.waitForTransactionReceipt({ hash: claimTransaction.hash }), {
            pending: 'Claiming your tokens...',
            success: ' Tokens successfully claimed',
          });
        }}
      >
        {userCredits === 0n ? 'No claimable credit' : `Claim ${formatCredit(userCredits)} credits`}
      </Button>
      <div className="pt-8">
        <Button
          onClick={async () => {
            await authMethod.connector.watchAsset?.(Credit);
          }}
        >
          Add credits to wallet
        </Button>
      </div>
      {formCreated && (
        <>
          <h2>Request credits</h2>
          <div id="hubspot-form" />
        </>
      )}
    </div>
  );
});

export default CreditsPage;
