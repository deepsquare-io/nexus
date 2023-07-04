import type { FC } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { JobStatus } from '@lib/types/enums/JobStatus';
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
        <Icon status={status.toString()} />
      </div>
    );
  } else {
    switch (status) {
      case JobStatus.FINISHED:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#14804A', backgroundColor: '#E1FCEF' }}
          />
        );
      case JobStatus.FAILED:
      case JobStatus.CANCELLED:
      case JobStatus.OUT_OF_CREDITS:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#FF3838', backgroundColor: '#FFDEDE' }}
          />
        );
      case JobStatus.META_SCHEDULED:
      case JobStatus.SCHEDULED:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#663B8A', backgroundColor: '#FFEAFD' }}
          />
        );
      case JobStatus.PENDING:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#5A6376', backgroundColor: '#E9EDF5' }}
          />
        );
      case JobStatus.RUNNING:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#AA5B00', backgroundColor: '#FCF2E6' }}
          />
        );
      default:
        return (
          <Chip
            className="font-bold"
            label={`\u2022 ${status}`}
            sx={{ color: '#FF3838', backgroundColor: '#FFDEDE' }}
          />
        );
    }
  }
};

export default JobStatusChip;
