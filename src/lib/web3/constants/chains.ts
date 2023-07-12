// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
export const deepsquareChain = {
  id: 179188,
  name: 'DeepSquare Mainnet C-Chain',
  network: 'deepsquare testnet',
  nativeCurrency: {
    name: 'Square',
    symbol: 'SQUARE',
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ['https://testnet.deepsquare.run/rpc'] },
    default: { http: ['https://testnet.deepsquare.run/rpc'] },
  },
  blockExplorers: {
    default: { name: 'DeepTrace', url: 'https://https://deeptrace.deepsquare.run/' },
  },
  contracts: {
    multicall3: {
      address: '0xad25E3e89e005EE6b1d9a4723DE82b2D591779d2',
      blockCreated: 38009,
    },
  },
} as const;
