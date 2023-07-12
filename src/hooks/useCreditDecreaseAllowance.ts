// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
