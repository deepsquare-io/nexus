import type { ReactNode } from 'react';
import { useContext } from 'react';
import CustomLink from '@components/routing/Link';
import useDialog from '@hooks/useDialog';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected } from '@lib/types/AuthMethod';
import { ArrowForwardIos } from '@mui/icons-material';
import Button from '@mui/material/Button';

const SendButton = ({ children }: { children: ReactNode }) => {
  const { authMethod } = useContext(authContext);
  const { open } = useDialog('connect');
  return (
    <div className="flex flew-row items-center space-x-4">
      <Button
        className="p-5"
        type={isDisconnected(authMethod) ? 'button' : 'submit'}
        onClick={() => {
          if (isDisconnected(authMethod)) {
            open();
            return;
          }
        }}
      >
        {children}
        <ArrowForwardIos className="ml-2" />
      </Button>
      <div>
        Click on <CustomLink href="/status">Job Status</CustomLink> in the left panel to view status and download media
      </div>
    </div>
  );
};

export default SendButton;
