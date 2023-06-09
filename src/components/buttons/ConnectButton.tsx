import useDialog from '@hooks/useDialog';
import Button from '@mui/material/Button';

const ConnectButton = () => {
  const { open } = useDialog('connect');

  return <Button onClick={open}>Connect</Button>;
};

export default ConnectButton;
