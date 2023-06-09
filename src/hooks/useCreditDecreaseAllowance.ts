import { useContractWrite } from 'wagmi';
import { CreditAbi } from '@abi/Credit';
import { addressCredit, addressMetaScheduler } from '@lib/web3/constants/contracts';
import type { SendTransactionResult } from '@wagmi/core';

interface UseCreditDecreaseAllowanceOutput {
  decreaseAllowance: ((amount: bigint) => Promise<SendTransactionResult>) | undefined;
  error: Error | null;
}

export default function useCreditDecreaseAllowance(): UseCreditDecreaseAllowanceOutput {
  const { writeAsync, error } = useContractWrite({
    address: addressCredit,
    abi: CreditAbi,
    functionName: 'decreaseAllowance',
  });

  return {
    decreaseAllowance: async (amount: bigint) => {
      return writeAsync({ args: [addressMetaScheduler, amount] });
    },
    error,
  };
}
