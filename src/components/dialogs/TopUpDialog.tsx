// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { toast } from 'react-toastify';
import type { Address } from 'wagmi';
import { useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import type { FC } from 'react';
import React, { useState } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import useCreditAllowance from '@hooks/useCreditAllowance';
import useCreditIncreaseAllowance from '@hooks/useCreditIncreaseAllowance';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import Button from '@mui/material/Button';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface TopUpDialogProps extends DialogProps {
  jobId: Address;

  onClose: () => void;
}

const TopUpDialog: FC<TopUpDialogProps> = ({ jobId, onClose, ...props }) => {
  const [topUpAmount, setTopUpAmount] = useState<bigint>(0n);

  const { allowance_wCredit } = useCreditAllowance(addressMetaScheduler);
  const missingAllowance = topUpAmount - allowance_wCredit;
  const { increaseAllowance, error: setAllowanceError } = useCreditIncreaseAllowance();

  const { config: topUpConfig, error: topUpError } = usePrepareContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'topUpJob',
    args: [jobId, topUpAmount],
  });
  const { writeAsync: topUp } = useContractWrite(topUpConfig);

  const publicClient = usePublicClient();

  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle>Top up job</DialogTitle>

      {jobId && <DialogContent>{`Top up job ${jobId.toString()}`}</DialogContent>}

      <TextField
        id="top-up-amount"
        label="Amount"
        value={topUpAmount}
        onChange={(event) => setTopUpAmount(BigInt(event.target.value))}
      />

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={async () => {
            try {
              if (missingAllowance > 0 && increaseAllowance && !setAllowanceError) {
                const increaseAllowanceTransaction = await toast.promise(increaseAllowance(missingAllowance), {
                  error: 'Transaction rejected',
                });

                await toast.promise(
                  publicClient.waitForTransactionReceipt({ hash: increaseAllowanceTransaction.hash }),
                  {
                    pending: 'Waiting for authorization confirmation',
                    success: 'Authorization confirmed',
                  },
                );
              }

              if (topUp && !topUpError) {
                const topUpTransaction = await toast.promise(topUp, {
                  error: 'Transaction rejected',
                });

                await toast.promise(publicClient.waitForTransactionReceipt({ hash: topUpTransaction.hash }), {
                  pending: 'Topping up new job...',
                  success: 'Job has been topped up successfully!',
                });
              }
            } finally {
              onClose();
            }
          }}
        >
          Top up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TopUpDialog;
