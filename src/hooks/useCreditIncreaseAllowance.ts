import { useContractWrite } from 'wagmi';
import { CreditAbi } from '@abi/Credit';
import { addressCredit, addressMetaScheduler } from '@lib/web3/constants/contracts';
import type { SendTransactionResult } from '@wagmi/core';

interface UseCreditIncreaseAllowanceOutput {
  increaseAllowance: ((amount: bigint) => Promise<SendTransactionResult>) | undefined;
  error: Error | null;
}

export default function useCreditIncreaseAllowance(): UseCreditIncreaseAllowanceOutput {
  const { writeAsync, error } = useContractWrite({
    address: addressCredit,
    abi: CreditAbi,
    functionName: 'increaseAllowance',
  });

  return {
    increaseAllowance: async (amount: bigint) => {
      return writeAsync({ args: [addressMetaScheduler, amount] });
    },
    error,
  };
}
