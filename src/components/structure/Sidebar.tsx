'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { FC, JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import CustomLink from '@components/routing/Link';
import useDialog from '@hooks/useDialog';
import { AspectRatio } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import blender from '@public/icons/blender-white.svg';
import task from '@public/icons/task.svg';
import t2i from '@public/icons/text-to-image.svg';
import unity from '@public/icons/unity-white.svg';
import wallet from '@public/icons/wallet-minus.svg';
import logo from '@public/img/deepsquare-logo-neg.svg';

interface SidebarLinkProps {
  href: string;
  icon: StaticImageData | ReactNode;
  text: ReactNode;
}

function isStaticImageData(object: any): object is StaticImageData {
  return 'src' in object;
}

const SidebarLinkListItem: FC<SidebarLinkProps> = ({ href, icon, text }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCurrent = useMemo(() => pathname === href, [pathname, href]);

  return (
    <ListItem className={isCurrent ? 'bg-gradient-to-r from-[#6753FF] to-[#CD45FF] p-0' : 'p-0'} key={href}>
      <ListItemButton className="pl-8 py-2.5" onClick={() => router.push(href)}>
        <ListItemIcon sx={{ color: 'white' }}>
          {isStaticImageData(icon) ? <Image alt="home icon" src={icon} height={22} width={22} /> : icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            sx: { color: 'white', fontWeight: 500 },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const Sidebar: FC<Omit<DrawerProps, 'open'>> = (props) => {
  const { isOpen } = useDialog('drawer');
  const [appOpen, setAppOpen] = useState(false);
  const pathname = usePathname();

  const routes = {
    apps: {
      collapsed: {
        '/upscaling': {
          text: 'Upscale',
          icon: <AspectRatio height={22} width={22} />,
        },
        '/texttoimage': {
          text: 'Text to Image',
          icon: t2i,
        },
        '/unity': {
          text: 'Unity Streaming',
          icon: unity,
        },
        '/blender': {
          text: 'Blender',
          icon: blender,
        },
      },
      '/sandbox': {
        text: 'Dev',
        icon: <DataObjectIcon height={22} width={22} />,
      },
    },
    home: {
      '/stats': { icon: <QueryStatsIcon height={22} width={22} />, text: 'Stats' },
      '/status': { icon: task, text: 'Job Status' },
      '/credits': { icon: wallet, text: 'Credits' },
    },
  };
  const isApps = useMemo(
    () => Object.keys(routes.apps.collapsed).includes(pathname),
    [pathname, routes.apps.collapsed],
  );

  return (
    <Drawer
      classes={{ paper: 'bg-[#0B0140]' }}
      open={isOpen}
      anchor="left"
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed' }}
      {...props}
    >
      <CustomLink className="flex justify-center my-7" href="/">
        <Image src={logo} alt="DeepSquare Logo" width={120} height={120} />
      </CustomLink>
      <List className="pt-0" sx={{ flexGrow: 1, '& ul': { padding: 0 }, overflow: 'auto' }} subheader={<li />}>
        <List key="section-application">
          <ListItemButton className="pl-8 py-2.5" onClick={() => setAppOpen((prev) => !prev)}>
            <ListItemIcon sx={{ color: 'white' }}>
              <AppsIcon height={22} width={22} />
            </ListItemIcon>
            <ListItemText
              primary="Apps"
              primaryTypographyProps={{
                sx: { color: 'white', fontWeight: 500 },
              }}
            />
            {appOpen || isApps ? (
              <ExpandLessIcon sx={{ color: 'white' }} />
            ) : (
              <ExpandMoreIcon sx={{ color: 'white' }} />
            )}
          </ListItemButton>
          <Collapse in={appOpen} timeout="auto" unmountOnExit>
            <List>
              {Object.entries(routes.apps.collapsed).map(([href, route]) => (
                <SidebarLinkListItem key={href} href={href} icon={route.icon} text={route.text} />
              ))}
            </List>
          </Collapse>
          {Object.entries(routes.apps)
            .filter(([, route]) => {
              const properties = Object.keys(route);
              return properties.includes('icon') && properties.includes('text');
            })
            .map(([href, r]) => {
              const route = r as { icon: JSX.Element; text: string };
              return <SidebarLinkListItem key={href} href={href} icon={route.icon} text={route.text} />;
            })}
        </List>
        <Divider className="bg-white/50 mx-6 my-5"></Divider>
        <List key="section-home">
          {Object.entries(routes.home).map(([href, route]) => (
            <SidebarLinkListItem key={href} href={href} icon={route.icon} text={route.text} />
          ))}
        </List>
      </List>
    </Drawer>
  );
};

export default Sidebar;
