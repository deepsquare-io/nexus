import type { Address } from 'wagmi';
import { useContractRead, useNetwork } from 'wagmi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CreditAbi } from '@abi/Credit';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import { deepsquareChain } from '@lib/web3/constants/chains';
import { addressCredit } from '@lib/web3/constants/contracts';

interface UseCreditAllowanceOutput {
  allowance_wCredit: bigint;
}

export default function useCreditAllowance(spender: Address): UseCreditAllowanceOutput {
  const [allowance_wCredit, setAllowance_wCredit] = useState<bigint>(0n);
  const { authMethod } = useContext(authContext);
  const { chain } = useNetwork();
  const { data } = useContractRead({
    address: addressCredit,
    abi: CreditAbi,
    functionName: 'allowance',
    args: [isWeb3(authMethod) ? authMethod.address : '0x0', spender],
    enabled: isWeb3(authMethod),
  });

  const updateBalances = useCallback(() => {
    if (chain?.id !== deepsquareChain.id) return;

    if (data) {
      setAllowance_wCredit(data);
    }
  }, [chain, data]);

  useEffect(() => {
    updateBalances();
  });

  return {
    allowance_wCredit,
  };
}
