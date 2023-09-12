// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
    address: isWeb3(authMethod) ? authMethod.sub : '0x0',
    enabled: isWeb3(authMethod),
  });
  const { data: creditBalance } = useBalance({
    address: isWeb3(authMethod) ? authMethod.sub : '0x0',
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
