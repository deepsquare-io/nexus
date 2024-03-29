// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FC } from 'react';
import { JobStatus } from '@deepsquare/deepsquare-client';
import useWindowSize from '@hooks/useWindowSize';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import DoneAllSharp from '@mui/icons-material/DoneSharp';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

export interface JobStatusChipProps {
  status: JobStatus;
}

interface Props {
  status: string;
}

const Icon: FC<Props> = ({ status }) => {
  switch (status) {
    case 'PENDING':
      return <HourglassEmptyIcon />;
    case 'META_SCHEDULED':
      return <CalendarTodayIcon />;
    case 'SCHEDULED':
      return <EventAvailableIcon />;
    case 'RUNNING':
      return <CircularProgress />;
    case 'CANCELLED':
      return <CancelOutlined />;
    case 'FINISHED':
      return <DoneAllSharp />;
    case 'FAILED':
      return <ErrorOutlineIcon />;
    case 'OUT_OF_CREDITS':
    case 'PANICKED':
      return <AccountBalanceWalletIcon />;
    default:
      return null;
  }
};

const JobStatusChip: FC<JobStatusChipProps> = ({ status }) => {
  const { width } = useWindowSize();

  if (!!width && width < 768) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Icon status={JobStatus[status]} />
      </div>
    );
  } else {
    switch (status) {
      case JobStatus.FINISHED:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${JobStatus[status]}`}
            sx={{ color: '#14804A', backgroundColor: '#E1FCEF' }}
          />
        );
      case JobStatus.FAILED:
      case JobStatus.CANCELLED:
      case JobStatus.OUT_OF_CREDITS:
      case JobStatus.PANICKED:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${JobStatus[status]}`}
            sx={{ color: '#FF3838', backgroundColor: '#FFDEDE' }}
          />
        );
      case JobStatus.META_SCHEDULED:
      case JobStatus.SCHEDULED:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${JobStatus[status]}`}
            sx={{ color: '#663B8A', backgroundColor: '#FFEAFD' }}
          />
        );
      case JobStatus.PENDING:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${JobStatus[status]}`}
            sx={{ color: '#5A6376', backgroundColor: '#E9EDF5' }}
          />
        );
      case JobStatus.RUNNING:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${JobStatus[status]}`}
            sx={{ color: '#AA5B00', backgroundColor: '#FCF2E6' }}
          />
        );
    }
  }
};

export default JobStatusChip;
