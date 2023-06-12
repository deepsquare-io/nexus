'use client';

import Image from 'next/image';
import { useAuth } from 'reactfire';
import { useDisconnect } from 'wagmi';
import { useContext } from 'react';
import ConnectButton from '@components/buttons/ConnectButton';
import CustomLink from '@components/routing/Link';
import WalletBalances from '@components/web3/WalletBalances';
import useDialog from '@hooks/useDialog';
import { authContext } from '@lib/contexts/AuthContext';
import { isDisconnected, isWeb2, isWeb3 } from '@lib/types/AuthMethod';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import menu from '@public/icons/menu.svg';
import { setUser } from '@sentry/nextjs';

interface HeaderProps extends MuiAppBarProps {}

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 240px)`,
    marginLeft: `240px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * Main layout's header.
 */
const Header = ({ className, ...props }: HeaderProps) => {
  const { authMethod, setAuthMethod } = useContext(authContext);
  const { isOpen: isDrawerOpen, toggle: toggleDrawer } = useDialog('drawer');
  const { disconnectAsync } = useDisconnect();
  const auth = useAuth();

  return (
    <AppBar position="fixed" open={isDrawerOpen} elevation={0} {...props}>
      <div className="h-[70px] flex px-4 py-2 justify-between items-center bg-[#FFFFFF]">
        <IconButton onClick={toggleDrawer}>
          <Image alt="toggle drawer" src={menu} />
        </IconButton>

        {isWeb3(authMethod) && (
          <div className="flex flex-grow justify-center items-center p-3">
            <div className={'md:flex gap-6' + (!isDrawerOpen ? '' : 'hidden')}>
              <WalletBalances />
            </div>
          </div>
        )}
        <div className="flex justify-center items-center space-x-6 p-6">
          {isDisconnected(authMethod) && <ConnectButton />}
          {!isDisconnected(authMethod) && (
            <Button
              onClick={async () => {
                if (isWeb3(authMethod)) {
                  localStorage.setItem('reconnectWallet', 'false');
                  await disconnectAsync();
                } else if (isWeb2(authMethod)) {
                  await auth.signOut();
                }
                setUser(null);
                setAuthMethod(undefined);
              }}
            >
              Log out
            </Button>
          )}
          <CustomLink
            href="https://discord.gg/UwaHJcNvq9"
            className="font-bold no-underline hover:underline"
            target="_blank"
          >
            Discord
          </CustomLink>
          <CustomLink
            href="https://docs.deepsquare.run/"
            className="font-bold no-underline hover:underline"
            target="_blank"
          >
            Docs
          </CustomLink>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
