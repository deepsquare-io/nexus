import { useContractRead } from 'wagmi';
import { ConstantsAbi } from '@abi/Constants';
import { addressConstants } from '@lib/web3/constants/contracts';

export default function useGetMinimumAmount() {
  return useContractRead({
    address: addressConstants,
    abi: ConstantsAbi,
    functionName: 'minimumAmount',
  });
}
