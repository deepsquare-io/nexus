// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0xee0348A91fe38AAb00096dd5728A0178a099D827',
  FaucetNative: '0x9A08B57BB533C86BcdCFfa038EDf7De0a74662af',
  MetaScheduler: '0x0c4a971b6A6184FD8fd88bAcCA9B97f802538240',
  ProviderManager: '0xBD8D8d3d449A9B3E3b01D2685ce56D64a16c892f',
  Tools: '0xc895E05c63Fb6a69ABB32C3c4D2a33Bb84eeD174',
  Constants: '0xdA0AA33EAd68A03c2D5c62135F4818490F2BA851',
  ProviderJobQueues: '0xD57b89c073F1A762De23f2E4a034CD6d8A4CDD10',
  JobRepository: '0xE32B680868C69c3AC2eba48Aa59e56F7B31Ee810',
};

type addressBook = typeof mainnet;

const addresses2: Record<ChainId, addressBook> = {
  [ChainId.DEEPSQUARE_MAINNET]: mainnet,
};

const current = addresses2[ChainId.DEEPSQUARE_MAINNET];

export const addressCredit = current.Credit;
export const addressFaucetCredit = current.FaucetCredit;
export const addressFaucetNative = current.FaucetNative;
export const addressProviderManager = current.ProviderManager;
export const addressMetaScheduler = current.MetaScheduler;

export const addressTools = current.Tools;

export const addressConstants = current.Constants;

export const addressProviderJobQueues = current.ProviderJobQueues;

export const addressJobRepository = current.JobRepository;
