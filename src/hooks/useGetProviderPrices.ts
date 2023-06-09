import type { Address } from 'wagmi';
import { useContractRead } from 'wagmi';
import { ProviderManagerAbi } from '@abi/ProviderManager';
import { addressProviderManager } from '@lib/web3/constants/contracts';

export default function useGetProviderPrices(providerAddr: Address) {
  return useContractRead({
    address: addressProviderManager,
    abi: ProviderManagerAbi,
    functionName: 'getProviderPrices',
    args: [providerAddr],
  });
}
