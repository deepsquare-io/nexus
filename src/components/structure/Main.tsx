import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import ConnectDialog from '@components/dialogs/ConnectDialog';
import Header from '@components/structure/Header';
import Sidebar from '@components/structure/Sidebar';
import useDialog from '@hooks/useDialog';
import useWindowSize from '@hooks/useWindowSize';
import { styled } from '@mui/material/styles';

const MuiMain = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'mobile' && prop !== 'addPadding',
})<{
  open?: boolean;
  mobile?: boolean;
  addPadding?: boolean;
}>(({ theme, open, mobile, addPadding }) => ({
  flexGrow: 1,
  padding: theme.spacing(addPadding ? 3 : 0),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: mobile ? '0px' : '240px',
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Main({ children }: { children: ReactNode }) {
  const { width } = useWindowSize();
  const { isOpen: isDrawerOpen, open, close } = useDialog('drawer');
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if (!width) return;
    if (isLandingPage) {
      close();
      return;
    }
    if (width > 768) {
      open();
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, isLandingPage]);

  return (
    <>
      <Header />
      <Sidebar
        variant="persistent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      />
      <MuiMain
        className={isLandingPage ? '' : 'md:px-12'}
        open={isDrawerOpen}
        mobile={!!width && width < 768}
        addPadding={!isLandingPage}
      >
        <DrawerHeader />
        {children}
      </MuiMain>
      <ConnectDialog />
    </>
  );
}
