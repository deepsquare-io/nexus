'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import dynamic from 'next/dynamic';
import { IconContext } from 'react-icons';
import type { ToastContainerProps } from 'react-toastify';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import DialogProvider from '@components/providers/DialogProvider';
import FirebaseProvider from '@components/providers/FirebaseProvider';
import LockProvider from '@components/providers/LockProvider';
import client from '@graphql/client';
import { deepsquareChain } from '@lib/web3/constants/chains';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import initialTheme from '@styles/theme';
import { InjectedConnector } from '@wagmi/connectors/injected';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import AuthProvider from './providers/AuthProvider';

type RuntimeProps = {
  children?: ReactNode;
};

const ToastContainer = dynamic<ToastContainerProps>(() => import('react-toastify').then((mod) => mod.ToastContainer), {
  ssr: false,
});

const Runtime: FC<RuntimeProps> = ({ children }) => {
  const wagmiConfig = useMemo(() => {
    const { chains, publicClient, webSocketPublicClient } = configureChains([deepsquareChain], [publicProvider()]);

    return createConfig({
      publicClient,
      webSocketPublicClient,
      connectors: [new InjectedConnector({ chains }), new MetaMaskConnector({ chains })],
      autoConnect: true,
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={initialTheme}>
        <StyledEngineProvider injectFirst>
          <WagmiConfig config={wagmiConfig}>
            <FirebaseProvider>
              <ApolloProvider client={client}>
                <AuthProvider>
                  <LockProvider>
                    <DialogProvider>
                      <IconContext.Provider value={{ style: { display: 'inline', verticalAlign: 'middle' } }}>
                        <ToastContainer position="top-left" pauseOnFocusLoss={false} />
                        <CssBaseline />
                        {children}
                      </IconContext.Provider>
                    </DialogProvider>
                  </LockProvider>
                </AuthProvider>
              </ApolloProvider>
            </FirebaseProvider>
          </WagmiConfig>
        </StyledEngineProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default Runtime;
