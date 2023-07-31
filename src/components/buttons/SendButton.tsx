// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
