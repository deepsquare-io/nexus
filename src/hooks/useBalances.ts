import { useBalance } from 'wagmi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import { addressCredit } from '@lib/web3/constants/contracts';

interface UseBalancesOutput {
  balance_wCredit: bigint;
  balance_wSQUARE: bigint;
}

export default function useBalances(): UseBalancesOutput {
  const [balance_wCredit, setBalance_wCredit] = useState<bigint>(0n);
  const [balance_wSQUARE, setBalance_wSQUARE] = useState<bigint>(0n);

  const { authMethod } = useContext(authContext);
  const { data: squareBalance } = useBalance({
    address: isWeb3(authMethod) ? authMethod.address : '0x0',
    enabled: isWeb3(authMethod),
  });
  const { data: creditBalance } = useBalance({
    address: isWeb3(authMethod) ? authMethod.address : '0x0',
    token: addressCredit,
    enabled: isWeb3(authMethod),
  });

  const updateBalances = useCallback(() => {
    if (squareBalance) {
      setBalance_wSQUARE(squareBalance.value);
    }

    if (creditBalance) {
      setBalance_wCredit(creditBalance.value);
    }
  }, [creditBalance, squareBalance]);

  useEffect(() => {
    updateBalances();
  });

  return {
    balance_wCredit,
    balance_wSQUARE,
  };
}
