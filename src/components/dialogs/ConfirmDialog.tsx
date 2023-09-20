import type { FC, ReactNode } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialog extends Omit<DialogProps, 'open' | 'title'> {
  title: ReactNode;
  show?: boolean;
  loading?: boolean;
  onConfirmation: () => void;
  onClose?: () => void;
  isSubmitButton?: boolean;
}

const ConfirmDialog: FC<ConfirmDialog> = ({
  children,
  show = false,
  title,
  loading = false,
  onClose,
  onConfirmation,
  ...props
}) => (
  <Dialog open={show} onClose={onClose} onBackdropClick={onClose} {...props}>
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>{children}</DialogContent>

    <DialogActions>
      <LoadingButton
        onClick={() => {
          onClose?.();
        }}
        color="neutral"
      >
        Cancel
      </LoadingButton>
      <LoadingButton
        loading={loading}
        onClick={() => {
          onConfirmation();
          onClose?.();
        }}
      >
        Confirm
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
