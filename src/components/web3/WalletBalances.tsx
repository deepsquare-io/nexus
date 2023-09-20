// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import Image from 'next/image';
import { toast } from 'react-toastify';
import { usePublicClient } from 'wagmi';
import { useContext, useState } from 'react';
import BlinkingIcon from '@components/ui/animations/blinkingIcon';
import BlockChainExplorer from '@components/web3/BlockChainExplorer';
import useBalances from '@hooks/useBalances';
import useCreditAllowance from '@hooks/useCreditAllowance';
import useCreditDecreaseAllowance from '@hooks/useCreditDecreaseAllowance';
import useCreditIncreaseAllowance from '@hooks/useCreditIncreaseAllowance';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import Token from '@lib/web3/lib/Token';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiTextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import dollar from '@public/icons/dollar-circle.svg';
import dps from '@public/img/icon.png';
import formatAccount from '@utils/format/formatAccount';
import formatCredit from '@utils/format/formatCredit';
import formatSQUARE from '@utils/format/formatSQUARE';
import { formatWei } from '@utils/format/formatWei';

const WalletBalances = () => {
  const { authMethod } = useContext(authContext);
  const { balance_wSQUARE, balance_wCredit } = useBalances();
  const [amount, setAmount] = useState<bigint>(10000n);

  const { allowance_wCredit } = useCreditAllowance(addressMetaScheduler);
  const missing = formatWei(amount) - allowance_wCredit;
  const { increaseAllowance } = useCreditIncreaseAllowance();
  const { decreaseAllowance } = useCreditDecreaseAllowance();

  const publicClient = usePublicClient();

  const [open, setOpen] = useState<boolean>(false);

  if (!isWeb3(authMethod)) return null;

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-baseline lg:justify-between">
      <div className="flex items-center justify-end space-x-10 font-extrabold text-xs">
        <div
          className=" flex items-center gap-1.5 hover:cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Tooltip title="Your current credit balance" arrow>
            <div className="flex items-center gap-1.5 hover:cursor-pointer">
              <Image src={dollar} alt="Dollar Logo" width={20} height={20} layout="fixed" />
              <div className="text-[#33313E]">Balance: {formatCredit(balance_wCredit)}</div>
            </div>
          </Tooltip>
          <div className="relative flex items-center">
            <svg width={0} height={0}>
              <linearGradient id="gradientForIcons" x1={0} y1={1} x2={1} y2={1}>
                <stop offset={0} stopColor="#6753FF" />
                <stop offset={1} stopColor="#CD45FF" />
              </linearGradient>
            </svg>
            <Tooltip title="Increase your allowance" arrow>
              <div className="relative flex items-center">
                <BlinkingIcon />
              </div>
            </Tooltip>
          </div>
        </div>

        <Tooltip title="Gas is the fee paid to process a transaction on the blockchain" arrow>
          <div className="flex items-center gap-1.5">
            <Image src={dps} alt="Square Logo" width={13} height={18} layout="fixed" />
            <div className="text-[#33313E]">Gas:</div>
            <BlockChainExplorer
              address={authMethod.sub}
              token={Token.NATIVE}
              className="text-[#33313E] no-underline"
              data-test="Wallet--balance-native"
            >
              {formatSQUARE(balance_wSQUARE)}
            </BlockChainExplorer>
          </div>
        </Tooltip>
        <Tooltip title="Your connected account" arrow>
          <div>
            <BlockChainExplorer address={authMethod.sub} token={Token.NATIVE} className="text-[#33313E] no-underline">
              {formatAccount(authMethod.sub)}
            </BlockChainExplorer>
          </div>
        </Tooltip>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="p-8">
          <h2 className="text-2xl font-medium mb-4">Increase Allowance</h2>
          <p className="text-gray-600 mb-4">
            Want to make your experience smoother? Increase your credit allowance to skip manual transaction approvals.
            Don't worry about granting excessive permissions, the system will only use what it needs to function.
          </p>
          <p className="text-gray-600 mb-4">
            Available Credits: <span className="font-medium">{formatCredit(balance_wCredit)}</span>
          </p>
          <p className="text-gray-600 mb-8">
            Current Allowance: <span className="font-medium">{formatCredit(allowance_wCredit)}</span>
          </p>
          <div className="flex items-center justify-between mb-4">
            <MuiTextField
              type="number"
              label="Allowance value"
              value={amount}
              onChange={(event) => setAmount(BigInt(event.target.value))}
            />
            <div className="ml-4">
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  if (increaseAllowance && missing > 0) {
                    const increaseAllowanceTransaction = await toast.promise(increaseAllowance(missing), {
                      error: 'Transaction rejected',
                    });
                    await toast.promise(
                      publicClient.waitForTransactionReceipt({ hash: increaseAllowanceTransaction.hash }),
                      {
                        pending: 'Waiting for authorization confirmation',
                        success: 'Authorization confirmed',
                      },
                    );
                  } else if (decreaseAllowance && missing < 0) {
                    const decreaseAllowanceTransaction = await toast.promise(decreaseAllowance(-missing), {
                      error: 'Transaction rejected',
                    });

                    await toast.promise(
                      publicClient.waitForTransactionReceipt({ hash: decreaseAllowanceTransaction.hash }),
                      {
                        pending: 'Waiting for authorization confirmation',
                        success: 'Authorization confirmed',
                      },
                    );
                  }
                  setOpen(false);
                }}
              >
                Set
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletBalances;
