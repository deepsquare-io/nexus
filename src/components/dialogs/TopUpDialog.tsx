// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { toast } from 'react-toastify';
import { useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { useTopUpMutation } from '@graphql/internal/client/generated/topUp.generated';
import type { FullJobSummary } from '@graphql/internal/queries/ListJobsQuery';
import useCreditAllowance from '@hooks/useCreditAllowance';
import useCreditIncreaseAllowance from '@hooks/useCreditIncreaseAllowance';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';
import Button from '@mui/material/Button';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import formatDuration from '@utils/format/formatTime';
import { formatWei } from '@utils/format/formatWei';
import { computeCostPerMin } from '@utils/job/computeCostPerMin';
import { parseBytes32String } from '@utils/parse/parseBytes32String';

interface TopUpDialogProps extends DialogProps {
  job: FullJobSummary;

  onClose: () => void;
}

const TopUpDialog: FC<TopUpDialogProps> = ({ job, onClose, ...props }) => {
  const { authMethod } = useContext(authContext);
  const [topUpAmount, setTopUpAmount] = useState<bigint>(0n);

  const { allowance_wCredit } = useCreditAllowance(addressMetaScheduler);
  const missingAllowance = topUpAmount - allowance_wCredit;
  const { increaseAllowance, error: setAllowanceError } = useCreditIncreaseAllowance();

  const { config: topUpConfig, error: topUpError } = usePrepareContractWrite({
    address: addressMetaScheduler,
    abi: MetaSchedulerAbi,
    functionName: 'topUpJob',
    args: [job.jobId, formatWei(topUpAmount)],
  });
  const { writeAsync: topUpWeb3 } = useContractWrite(topUpConfig);

  const publicClient = usePublicClient();

  const [topUpWeb2] = useTopUpMutation();

  return (
    <Dialog onClose={onClose} PaperProps={{ className: 'rounded-xl items-center' }} {...props}>
      <DialogTitle>Top up job</DialogTitle>

      <DialogContent>
        {`Top up ${parseBytes32String(job.jobName)}`}
        <TextField
          id="top-up-amount"
          className="mt-4"
          label="Amount"
          value={topUpAmount.toString()}
          onChange={(event) => setTopUpAmount(BigInt(event.target.value))}
        />

        <div>
          Estimated time added : {formatDuration(Number((formatWei(topUpAmount) * 60n) / computeCostPerMin(job)))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={async () => {
            if (isWeb2(authMethod)) {
              await topUpWeb2({ variables: { jobId: job.jobId, amount: formatWei(topUpAmount).toString() } });
            } else if (isWeb3(authMethod)) {
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

                if (topUpWeb3 && !topUpError) {
                  const topUpTransaction = await toast.promise(topUpWeb3, {
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
